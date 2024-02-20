import { HistoryContainer, HistoryList, Status } from "./styles";


export function History() {
  return (
    <HistoryContainer>
      <h1>meu histórico</h1>


      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>tarefa</td>
              <td>20 minutos</td>
              <td>há 2 dias</td>
              <td><Status statusColor="yellow">Alert</Status></td>  
            </tr>
            <tr>
              <td>tarefa</td>
              <td>25 minutos</td>
              <td>há 5 dias</td>
              <td><Status statusColor="green">Concluido</Status></td>  
            </tr>
            <tr>
              <td>tarefa</td>
              <td>20 minutos</td>
              <td>há 1 mês</td>
              <td><Status statusColor="red">Not finish</Status></td>  
            </tr>
            <tr>
              <td>tarefa</td>
              <td>20 minutos</td>
              <td>há dois meses</td>
              <td><Status statusColor="red">Not finish</Status></td>  
            </tr>
            <tr>
              <td>tarefa</td>
              <td>20 minutos</td>
              <td>há dois meses</td>
              <td><Status statusColor="green">Concluido</Status></td>  
            </tr>
            <tr>
              <td>tarefa</td>
              <td>20 minutos</td>
              <td>há tres meses</td>
              <td><Status statusColor="green">Concluido</Status></td>  
            </tr>
            
          </tbody>
        </table>
      </HistoryList>
      
    </HistoryContainer>
  )
}