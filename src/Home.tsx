import { createContext, useContext, useState } from "react"

const CycleContext = createContext({} as any)

function NewCycleForm(){
  const { activeCycle, setActiveCycle } = useContext(CycleContext)

  return <h1>new cycle: {activeCycle}
  <button onClick={() => {
      setActiveCycle(activeCycle + 1)
    }}
     >alterar ciclo atico
     </button>
    </h1>
}

function Countdown(){
  const { activeCycle } = useContext(CycleContext)

  return(
    <h1>countdown: {activeCycle}
     </h1>
  

  )}



export function Home(){

  const [activeCycle, setActiveCycle] = useState(0)

  return (
   <CycleContext.Provider value={{activeCycle, setActiveCycle}}>
    <div>
      <NewCycleForm />
      <Countdown />
    </div>
    </CycleContext.Provider>
  )
}