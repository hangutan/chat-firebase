import React from "react";
import styles from "./styles";
import clsx from "clsx";

import { push } from "connected-react-router";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { reducerType } from "redux/reducers";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import HeaderBarSub from "components/HeaderBarSub";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

import ItemApp from "./components/ItemApp";

interface MyAppPageProps {
  dispatch: Dispatch;
}

const MyApp = (props: MyAppPageProps) => {
  const { dispatch } = props;
  const classes = styles();
  const openUrl = (url: string) => {
    dispatch(push(url));
  };

  return (
    <Box>
      <HeaderBarSub openUrl={openUrl} name="App của tôi" isGoBack={true} />
      <Box className={classes.root}>
        <Grid container spacing={1}>
          <ItemApp />
          <ItemApp />
          <ItemApp />
          <ItemApp />
          <ItemApp />
          <ItemApp />
        </Grid>
        <Box className={clsx(classes.tabItem, classes.mrTop15)}>
          <Box className={classes.textItem}>Tất cả</Box>
          <Box className={classes.textItem}>Online</Box>
          <Box className={classes.textItem}>Offline</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MyApp;
