import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import config from "~/common/constants";
import LoadingButton from "@mui/lab/LoadingButton";

const FollowButton = ({ follow = false, ...rest }) => {
  const [state, setstate] = useState(follow);
  const [loading, setloading] = useState(false);
  const handleClick = () => {
    setloading(true);
    axios
      .post(`${config.SERVER_URL}/sellershop/follow/${rest.shop_id}`, {
        customer_id: rest.customer_id,
      })
      .then(() => {
        setstate(!state);
        setloading(false);
      });
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
          <AddIcon />
          Follow
        </LoadingButton>
      )}
    </>
  );
};

export default FollowButton;
