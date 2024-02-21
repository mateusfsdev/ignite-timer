import { ReactNode, createContext, useState, useReducer } from "react";
import { NewCycleForm } from './../pages/Home/NewCycleForm/index';


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
  cycles: Cycle[],
  activeCycle: Cycle | undefined,
  activeCycleId: string | null,
  amountSecondsPassed: number,
  interruptCurrentCycle: () => void,
  markCurrentCycleAsFinish: () => void,
  setSecondsPassed: (seconds: number) => void,
  createNewCycle: (data: CreateCycleData) => void,
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclexContextProvider({
  children,
}: CyclesContextProviderProps) {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ cycles, dispatch] = useReducer((state: Cycle[], action: any) => {

    if(action.type === 'ADD_NEW_CYCLE') {
      return [...state, action.payload.newCycle]
    }
    
    return state
  }, [])



  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [ amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

   
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinish(){

    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId,
      }
    })
  //  setCycles(state => state.map((cycle) => {
  //    if (cycle.id === activeCycleId) {
  //    return { ...cycle, finishedDate: new Date()}
  //    } else {
  //      return cycle
  //    }
  //  }
  //))
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())
    
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      }
    })
    
   // setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

  }

  function interruptCurrentCycle() {

    dispatch({
      type: 'INTERRUPT_CYCLE',
      payload: {
        activeCycleId,
      }
    })
    //setCycles(state => 
    //  state.map((cycle) => {
    //  if (cycle.id === activeCycleId) {
    //    return { ...cycle, interruptedDate: new Date() }
    // } else {
    //    return cycle
    //  }
    //})
    //)
    
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
      cycles,
    }}
    >
      {children}
    </CyclesContext.Provider>
  
  )
}
