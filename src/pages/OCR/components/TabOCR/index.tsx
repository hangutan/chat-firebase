import { Box } from "@material-ui/core";
import React from "react";
import clsx from "clsx";

import styles from "./styles";

const TabOCR = () => {
  const classes = styles();
  return (
    <Box className={classes.tab}>
      <Box className={clsx(classes.btnTab, classes.borderTab)}>Online</Box>
      <Box className={classes.btnTab}>Offline</Box>
    </Box>
  );
};

export default TabOCR;
