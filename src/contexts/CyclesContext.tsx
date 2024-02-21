import { createContext, useState } from "react";


interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

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
  markCurrentCycleAsFinish: () => void,
  setSecondsPassed: (seconds: number) => void,
  createNewCycle: (data: CreateCycleData) => void,
  interruptCurrentCycle: () => void,
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclexContextProvider() {
  const [ cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [ amountSecondsPassed, setAmountSecondsPassed] = useState(0)

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

  function createNewCycle(data: CreateCycleData) {
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
    
   // reset()
  }

  function interruptCurrentCycle() {
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

 
  return (
    
    <CyclesContext.Provider
    value={{
      markCurrentCycleAsFinish,
      interruptCurrentCycle,
      amountSecondsPassed,
      setSecondsPassed,
      createNewCycle,
      activeCycleId,
      activeCycle,
    }}
    >

    </CyclesContext.Provider>
  
  )
}
