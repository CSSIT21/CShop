import LazyImage from "../../common/components/LazyImage/LazyImage";
import Banner from "../components/Banner";
import { useRecoilState } from 'recoil';
import authState from './../../common/store/authState';

const HomePage = () => {
  const [auth, setAuth] = useRecoilState(authState);

  const switchAuth = () => {
    setAuth({
      isLoggedIn: !auth.isLoggedIn,
      user: auth.user
    });
  };

  return (
    <>
      <h1>{auth.user.first_name} {auth.user.last_name}</h1>
      <Banner />
      <button onClick={switchAuth}> switch</button>
     <Banner />
     <LazyImage 
        src="https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ"
        lazy="https://via.placeholder.com/56x37.png"
      />
    </>
  );
};

export default HomePage;
