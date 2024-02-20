import { styled } from "styled-components"

export const CountdownContainer = styled.div`

 font-family: 'Roboto Mono', monospace;
 font-size: 12rem;
 line-height: 10rem;
 color: ${props => props.theme.gray100};

 display: flex;
 gap: 1rem;

 span {
  background: ${props => props.theme.gray700};
  padding: 2rem 1rem;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.purple500};
 }

`

export const Separator = styled.div`
  padding: 1.75rem 0;
  color: ${props => props.theme.gray200};
  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;`