
import {
  MinutesAmountInput,
  FormContainer,
  TaskInput,
} from './styles'
import { useContext } from 'react'
import { CyclesContext } from '..'
import { useFormContext } from 'react-hook-form'


export function NewCycleForm() {
  const { register } = useFormContext()
  const {activeCycle} = useContext(CyclesContext) //contexto

 

  return(
    <FormContainer> 
    <label htmlFor="task">Vou trabalhar em</label>
    <TaskInput
      id='task'
      list="task-suggestions"
      placeholder="Digite o nome do seu projeto"
      
      disabled={!!activeCycle}
      {...register('task')}
    />

    <datalist id='task-suggestions'>
      <option value="estudos"></option>
      <option value="trabalho"></option>
      <option value="projetos"></option>
      <option value="lazer"></option>
    </datalist>  

    <label htmlFor="minutesAmount">durante</label>
    <MinutesAmountInput
      type="number"
      id="minutesAmount"
      placeholder="00"
      step={5}
      min={1}
      max={60}
      disabled={!!activeCycle}

      {...register('minutesAmount', { valueAsNumber: true })}
    />
    <span>minutos.</span>
  </FormContainer>
  )
}

