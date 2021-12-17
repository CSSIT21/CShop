import NavBar from "../components/NavBar";
import { useRecoilState } from "recoil";
import authState from "../store/authState";
import { useMiddleware } from "../hooks";

const MainLayout = (props) => {
  const [auth] = useRecoilState(authState);
  useMiddleware();
  return (
    <div>
      <NavBar isLogin={auth.isLoggedIn} />
      {props.children}
    </div>
  );
};

export default MainLayout;
