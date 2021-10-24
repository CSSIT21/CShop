import TopBar from "./NavBarBase/TopBar";
import NavbarContent from "./NavBarBase/NavBarContent";

const NavBar = ({ isLogin }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        paddingTop: "15px",
      }}
    >
      <TopBar />
      <NavbarContent isLogin={isLogin} />
    </div>
  );
};

export default NavBar;
