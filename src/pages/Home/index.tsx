
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

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
      
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  
  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown/>


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