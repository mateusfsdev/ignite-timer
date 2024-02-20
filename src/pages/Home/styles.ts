import styled from "styled-components";

export const HomeContainer = styled.main`
 flex:1;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;

 form{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;
 }
`

export const BaseCoundownButton = styled.button`
  width: 100%;
  border: none;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  

  gap: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  color: ${props => props.theme.gray100};


  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartCoundownButton = styled(BaseCoundownButton)`
  background: ${props => props.theme.purple600};
  
  &:not(:disabled):hover {
    background: ${props => props.theme.purple800};
  }
`

export const StopCoundownButton = styled(BaseCoundownButton)`
  background: ${props => props.theme.red700};
  
  &:not(:disabled):hover {
    background: ${props => props.theme.red500};
  }
`

