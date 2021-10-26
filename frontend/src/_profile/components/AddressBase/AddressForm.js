import React from "react";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { Typography, TextField, MenuItem } from "@mui/material";
import { For } from "~/common/utils";

const AddressForm = ({ title, select = false, data, readOnly = false }) => {
  return (
    <Box sx={{ marginBottom: "24px" }}>
      <Grid container>
        <Grid item xs={4}>
          <Typography
            color="primary"
            sx={{
              fontSize: "24px",
              fontWeight: 500,
            }}
          >
            {title}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          {select ? (
            <TextField sx={textField} variant="outlined" select>
              <For each={data}>
                {(item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                )}
              </For>
            </TextField>
          ) : readOnly ? (
            <TextField
              autoComplete="Hidden"
              sx={textField}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          ) : (
            <TextField
              autoComplete="Hidden"
              sx={textField}
              variant="outlined"
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddressForm;

const textField = {
  width: "60%",
};
