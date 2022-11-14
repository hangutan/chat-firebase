import React from "react";

import styles from "./styles";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

const ItemApp = () => {
  const classes = styles();
  return (
    <Grid item xs={4} md={4} lg={4}>
      <Box className={classes.blItem}>
        <Box className={classes.iconArrow}>
          <ArrowRightAltIcon />
        </Box>
        <Box className={classes.blContent}>
          <Typography variant="h5" className={classes.title}>
            1
          </Typography>
          <Typography className={classes.content}>Mới</Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default ItemApp;
