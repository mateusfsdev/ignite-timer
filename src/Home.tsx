import { createContext, useContext } from "react"

const CycleContext = createContext({
  activeCycle: 6,
})

function NewCycleForm(){
  const { activeCycle } = useContext(CycleContext)

  return <h1>new cycle: {activeCycle}</h1>
}

function Countdown(){
  const { activeCycle } = useContext(CycleContext)

  return <h1>countdown: {activeCycle}</h1>
}



export function Home(){
  return (
    <div>
      <NewCycleForm />
      <Countdown />
    </div>
  )
}