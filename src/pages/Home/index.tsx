
import { HandPalm, Play } from "phosphor-react"
import { createContext, useEffect, useState } from "react"
import { differenceInSeconds } from 'date-fns'

import { 
  StartCoundownButton,
  HomeContainer,
  StopCoundownButton
} from "./styles"
import { NewCycleForm } from './NewCycleForm'
import { Countdown } from './Countdown'



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
}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {

  const [ cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  
  

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
 


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
  
  

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  const task = watch('task')
  const isSubmitDisabled = !task


  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

      <CyclesContext.Provider value={{activeCycle}}>
        <NewCycleForm />
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