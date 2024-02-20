import { NavLink } from "react-router-dom";
import { HeaderContainer } from "./styles";


import { Scroll, Timer, RedditLogo } from "phosphor-react";

export function Header() {
  return (
    <HeaderContainer>
      <NavLink    to="https://mateusfdev.github.io/portfolio" title='creator app page' target="_blank">
        <RedditLogo size='3rem'color="#8257e5"/>
      </NavLink>
        
      <nav>
        <NavLink   to="/" title='timer'>
          <Timer size={32} />
        </NavLink >
        <NavLink   to="/history" title='historico'> 
          <Scroll  size={32}/>
        </NavLink >
      </nav>

    </HeaderContainer>
  )
    
  
}