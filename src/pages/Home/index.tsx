
import { HandPalm, Play } from "phosphor-react"
import { FormProvider, useForm } from "react-hook-form"
import { createContext, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from 'zod'

import { NewCycleForm } from './NewCycleForm'
import { Countdown } from './Countdown'

import { 
  StartCoundownButton,
  HomeContainer,
  StopCoundownButton
} from "./styles"


interface Cycle {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  interruptedDate?: Date,
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined,
  activeCycleId: string | null,
  amountSecondsPassed: number,
  setSecondsPassed: (seconds: number) => void,
  markCurrentCycleAsFinish: () => void,
}

export const CyclesContext = createContext({} as CyclesContextType)

const newCycleFormValidationSchema = zod.object({
  task: zod
    .string().min(1, 'Informe a tarefa campeão!'),

  minutesAmount: zod
    .number()
    .min(5, 'ciclo minimo de 5min')
    .max(60, 'max 60min')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const [ cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [ amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
      
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinish(){
    setCycles(state => state.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, finishedDate: new Date()}
      } else {
        return cycle
      }
    }
  ))
  }
 
  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())
    
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }
    
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    
    reset()
  }

  function handleInterruptCycle() {
    setCycles(state => 
      state.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, interruptedDate: new Date() }
      } else {
        return cycle
      }
    })
    )
    
    setActiveCycleId(null)
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

      <CyclesContext.Provider
        value={{
          markCurrentCycleAsFinish,
          amountSecondsPassed,
          setSecondsPassed,
          activeCycleId,
          activeCycle,
        }}
        >
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown/>
      </CyclesContext.Provider>

        { activeCycle ? (
          <StopCoundownButton onClick={handleInterruptCycle} type="button">
          <HandPalm size={24}/>
          Interromper Countdown
        </StopCoundownButton>
        ):(
          <StartCoundownButton disabled={isSubmitDisabled}  type="submit">
          <Play size={24}/>
          Start
        </StartCoundownButton>
        )
       }
      </form>
    </HomeContainer>
  )
}