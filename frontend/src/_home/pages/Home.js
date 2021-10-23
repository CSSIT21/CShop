import { useState } from 'react'
import Banner from "../components/Banner";
import NavBar from "../../common/components/NavBar"
import CButton from '../../common/components/CButton';

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <NavBar isLogin={isLogin} />
      <Banner />
      <button onClick={() => setIsLogin(!isLogin)} > switch</button>
    </>
  );
};

export default HomePage;
