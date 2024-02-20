import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;



  nav{
    display: flex;
    gap: 1rem;

    a  {
      display: flex;
      justify-content: center;
      align-items: center;

      color: ${props => props.theme.purple400};

      border-top: 3px solid transparent ;
      border-bottom: 3px solid transparent ;

      &:hover{
        border-bottom: 3px solid ${(props => props.theme.purple500)}
      }

      &:active{
        color: ${(props => props.theme.purple700)};
        border-bottom: 3px solid ${(props => props.theme.purple700)}
      }

      &:before {
        border-bottom: 3px solid ${(props => props.theme.purple700)}

      }
    }
    

  }
  

`