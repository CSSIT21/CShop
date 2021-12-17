import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { useRecoilState, useResetRecoilState } from "recoil";
import registerState from "../../common/store/registerState";
import { assign } from "~/common/utils/";
import config from "../../common/constants";
import Swal from "sweetalert2/dist/sweetalert2.js";
import LoadingButton from "@mui/lab/LoadingButton";

const RegisterAddress = ({
  activeStep,
  handleBack = () => {},
  handleRegister = () => {},
}) => {
  const [addressData, setAddressData] = useState([]);
  const [userInfo, setUserInfo] = useRecoilState(registerState);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [subDistrict, setSubDistrict] = useState([]);
  const [postalCode, setPostalCode] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const resetRegisterState = useResetRecoilState(registerState);
  const classes = useStyles();

  const back = () => {
    setUserInfo({ ...userInfo, province: "" });
    setUserInfo({ ...userInfo, district: "" });
    setUserInfo({ ...userInfo, subDistrict: "" });
    setUserInfo({ ...userInfo, postalCode: "" });
    handleBack();
  };

  const register = () => {
    if (userInfo.addressLine == "") {
      setaddressLineError("This field is required");
    }
    if (userInfo.province == "") {
      setprovinceError("This field is required");
    }
    if (userInfo.district == "") {
      setdistrictError("This field is required");
    }
    if (userInfo.subDistrict == "") {
      setsubDistrictError("This field is required");
    }
    if (userInfo.postalCode == "") {
      setpostalCodeError("This field is required");
    }
    if (
      userInfo.addressLine != "" &&
      userInfo.province != "" &&
      userInfo.district != "" &&
      userInfo.subDistrict != "" &&
      userInfo.postalCode != ""
    ) {
      console.log(userInfo);
      setIsLoading(true);
      axios
        .post(config.SERVER_URL + "/auth/register", userInfo, {
          validateStatus: (status) => {
            return true; // I'm always returning true, you may want to do it depending on the status received
          },
        })
        .then(({ data }) => {
          if (data.success) {
            handleRegister();
            resetRegisterState();
          } else {
            Swal.fire("Register Error!", data.message, "error");
          }
          setIsLoading(false);
        });
    }
  };

  const getData = async () => {
    const fetchedData = await axios.get(
      "https://cshop-mock.mixkoap.com/thailand.json"
    );
    setAddressData(fetchedData.data);
    setProvince([...new Set(fetchedData.data.map((el) => el.province))].sort());
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setDistrict(
      [
        ...new Set(
          addressData
            .filter((el) => el.province === userInfo.province)
            .map((el) => el.district)
        ),
      ].sort()
    );
    setUserInfo({ ...userInfo, district: "", subDistrict: "", postalCode: "" });
  }, [userInfo.province]);

  useEffect(() => {
    setSubDistrict(
      [
        ...new Set(
          addressData
            .filter((el) => el.district === userInfo.district)
            .map((el) => el.subDistrict)
        ),
      ].sort()
    );
    setUserInfo({ ...userInfo, subDistrict: "", postalCode: "" });
  }, [userInfo.district]);

  useEffect(() => {
    setPostalCode(
      [
        ...new Set(
          addressData
            .filter((el) => el.subDistrict === userInfo.subDistrict)
            .map((el) => el.Zipcode)
        ),
      ].sort()
    );
  }, [userInfo.subDistrict]);

  const [addressLineError, setaddressLineError] = useState("");
  const [provinceError, setprovinceError] = useState("");
  const [districtError, setdistrictError] = useState("");
  const [subDistrictError, setsubDistrictError] = useState("");
  const [postalCodeError, setpostalCodeError] = useState("");

  return (
    <Box>
      <Box className={classes.header}>Address</Box>
      <Box className={classes.context}>
        <Box className={classes.address}>
          <Box className={classes.contextHeader}>Address</Box>
          <Box className={classes.textFieldBox}>
            <TextField
              id="addressLine"
              variant="outlined"
              placeholder="Address"
              fullWidth
              multiline
              rows={5}
              value={userInfo.addressLine}
              onChange={(e) => {
                setUserInfo({ ...userInfo, addressLine: e.target.value });
              }}
            />
          </Box>
          <Box className={classes.rowSelect}>
            <Box className={classes.textFieldBox} style={{ width: "45%" }}>
              <TextField
                id="province"
                variant="outlined"
                sx={{ borderRadius: "10px" }}
                fullWidth
                select
                label="Select Province"
                value={userInfo.province}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, province: e.target.value });
                }}
              >
                {province.map((data, idx) => {
                  return (
                    <MenuItem key={idx} value={data}>
                      {data}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Box>
            <Box className={classes.textFieldBox} style={{ width: "45%" }}>
              <TextField
                id="district"
                variant="outlined"
                sx={{ borderRadius: "10px" }}
                fullWidth
                select
                label="Select District"
                value={userInfo.district}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, district: e.target.value });
                }}
              >
                {district.map((data, idx) => (
                  <MenuItem key={idx} value={data}>
                    {data}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
          <Box className={classes.rowSelect}>
            <Box className={classes.textFieldBox} style={{ width: "45%" }}>
              <TextField
                id="subDistrict"
                variant="outlined"
                sx={{ borderRadius: "10px" }}
                fullWidth
                select
                label="Select Sub District"
                value={userInfo.subDistrict}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, subDistrict: e.target.value });
                }}
              >
                {subDistrict.map((data, idx) => (
                  <MenuItem key={idx} value={data}>
                    {data}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box className={classes.textFieldBox} style={{ width: "45%" }}>
              <TextField
                id="postalCode"
                variant="outlined"
                sx={{ borderRadius: "10px" }}
                fullWidth
                select
                label="Select Postal Code"
                value={userInfo.postalCode}
                onChange={(e) => {
                  setUserInfo((user) =>
                    assign({ ...user }, { postalCode: e.target.value })
                  );
                }}
              >
                {postalCode.map((data, idx) => (
                  <MenuItem key={idx} value={data}>
                    {data}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={classes.button}>
        <Button
          disabled={activeStep === 0}
          onClick={back}
          sx={{
            backgroundColor: "#ffffff",
            boxShadow: "none",
            border: "1px solid #FD6637",
            borderRadius: "12px",
            width: "300px",
            height: "55px",
            color: "#FD6637",
            textTransform: "capitalize",
          }}
        >
          Back
        </Button>

        <CButton
          title="Register"
          onClick={handleRegister}
          width="300px"
          height="55px"
        />

        {!isLoading ? (
          <Button
            variant="contained"
            onClick={register}
            sx={{
              width: "300px",
              height: "55px",
              textTransform: "capitalize",
            }}
          >
            Register
          </Button>
        ) : (
          <LoadingButton
            loading
            variant="contained"
            sx={{
              width: "300px",
              textTransform: "capitalize",
              height: "55px",
            }}
          >
            Register
          </LoadingButton>
        )}

      </Box>
    </Box>
  );
};
const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "center",
    fontSize: "32px",
    fontWeight: 600,
    margin: "5% 0%",
  },
  context: {
    padding: "0 12%",
  },
  contextHeader: {
    fontSize: "24px",
    marginBottom: "40px",
  },
  textFieldBox: {
    marginBottom: "35px",
    backgroundColor: "white",
    borderRadius: "10px",
    width: "100%",
    [`& fieldset`]: {
      borderRadius: "10px",
    },
  },
  rowSelect: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: "70px 0 180px 0",
    padding: "0 12%",
  },
});
export default RegisterAddress;
