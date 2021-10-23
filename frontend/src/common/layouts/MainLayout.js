import NavBar from "../components/NavBar";

const MainLayout = (props) => {
    return <div>
        <NavBar/>
        {props.children}
    </div>;
}

export default MainLayout;