import { PropsWithChildren } from "react";

interface NavBarProps extends PropsWithChildren {
  className?: string;
}

const NavBar = ({ children, className }: NavBarProps) => {
  return (
    <nav className={`flex flex-wrap justify-between items-center ${className}`}>
      {children}
    </nav>
  )
}

export default NavBar;