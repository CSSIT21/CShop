import LazyImage from "../../common/components/LazyImage/LazyImage";
import Banner from "../components/Banner";

const HomePage = (props) => {
  

  return (
    <>
     <Banner />
     <LazyImage 
        src="https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ"
        lazy="https://via.placeholder.com/56x37.png"
      />
    </>
  );
};

export default HomePage;
