import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import config from "~/common/constants";
import LoadingButton from "@mui/lab/LoadingButton";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useRecoilValue } from "recoil";
import authState from "~/common/store/authState";

const FollowButton = ({ ...rest }) => {
  const [state, setstate] = useState(false);
  const auth = useRecoilValue(authState);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    axios
      .get(
        `${config.SERVER_URL}/sellershop/follow/${rest.shop_id}?customer_id=${rest.customer_id}`
      )
      .then(({ data }) => {
        setstate(data.result);
      });
  }, []);
  const handleClick = () => {
    if (auth.isLoggedIn) {
      setloading(true);
      let userId = 0;
      if (auth.isLoggedIn) {
        console.log("login");
        userId = auth.user.id;
      }
      axios
        .post(`${config.SERVER_URL}/sellershop/follow/${rest.shop_id}`, {
          customer_id: rest.customer_id,
        })
        .then(() => {
          setstate(!state);
          setloading(false);
        });
    } else {
      Swal.fire({
        text: "Please login to follow a shop!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <>
      {state ? (
        <LoadingButton
          loading={loading}
          variant="outlined"
          onClick={handleClick}
          {...rest}
        >
          Following
        </LoadingButton>
      ) : (
        <LoadingButton
          loading={loading}
          variant="contained"
          onClick={handleClick}
          {...rest}
        >
          <AddIcon style={{ marginRight: "5px" }} />
          Follow
        </LoadingButton>
      )}
    </>
  );
};

export default FollowButton;
