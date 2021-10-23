import { useState } from 'react'
import LazyImage from "../../common/components/LazyImage/LazyImage";
import Banner from "../components/Banner";
import NavBar from "../../common/components/NavBar"
import CButton from '../../common/components/CButton';

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
      <Banner />
      <button onClick={() => setIsLogin(!isLogin)} > switch</button>
     <Banner />
     <LazyImage 
        src="https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ"
        lazy="https://via.placeholder.com/56x37.png"
      />
    </>
  );
};

export default HomePage;
