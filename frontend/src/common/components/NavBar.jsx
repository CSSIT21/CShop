import React from 'react';
import TopBar from "./NavBarBase/TopBar";
import NavbarContents from "./NavBarBase/NavbarContents";

const NavBar = ({ isLogin = true }) => {
  return (
    <>
      <TopBar />
      <NavbarContents isLogin={isLogin} />
    </>
  )
}

export default NavBar;
