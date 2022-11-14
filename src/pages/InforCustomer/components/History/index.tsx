import React from "react";
import { Box, Typography } from "@material-ui/core";
import styles from "./styles";

import Images from "constants/image";

const History = () => {
  const classes = styles();

  return (
    <Box className={classes.root}>
      <Box className={classes.listHistory}>
        <Box className={classes.itemHistory}>
          <Box className={classes.itemHistory_left}>
            <Box className={classes.item}>
              <img src={Images.ic_user} alt="" />
              <Box>MAFC_122131231</Box>
            </Box>
            <Box className={classes.item}>
              <img src={Images.ic_market} alt="" />
              <Box>Iphone 11 </Box>
            </Box>
            <Box className={classes.item}>
              <img src={Images.ic_market} alt="" />
              <Box>6 month</Box>
            </Box>
            <Box className={classes.item}>
              <img src={Images.ic_calendar_new} alt="" />
              <Box>6/9/2022</Box>
            </Box>
            <Box className={classes.item}>
              <img src={Images.ic_calendar} alt="" />
              <Box>20/9/2022</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default History;
