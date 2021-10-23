import NavBar from "../components/NavBar";
import { useRecoilState } from 'recoil';
import authState from "../store/authState";

const MainLayout = (props) => {
    const [auth] = useRecoilState(authState);

    return <div>
        <NavBar isLogin={auth.isLoggedIn}/>
        {props.children}
    </div>;
}

export default MainLayout;