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
import Image from "constants/image";
import { UserReducer } from "redux/reducers/auth";
import { InfoCustomerConvertReducer } from "redux/reducers/customer";
import { LOGOUT } from "redux/reducers/auth/actionTypes";

interface HomePageProps {
  dispatch: Dispatch;
  current_user: UserReducer;
  inforCustomer: InfoCustomerConvertReducer;
}

const mapStateToProps = (state: reducerType) => {
  return {
    current_user: state.auth.current_user,
    inforCustomer: state.customer.inforCustomer
  };
};

const Home = (props: HomePageProps) => {
  const { dispatch, inforCustomer } = props;
  const classes = styles();

  const openUrl = (url: string) => {
    dispatch(push(url));
  };

  const checkOcr = () => {
    if (inforCustomer.identityNumber) {
      openUrl("infor-customer");
    } else {
      openUrl("ocr");
    }
  };

  const logout = () => {
    dispatch({
      type: LOGOUT
    });
  };

  return (
    <Box>
      <HeaderBarSub openUrl={openUrl} name="Home" isGoBack={false} />
      <Box className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4} lg={4}>
            <Box className={classes.blItem} onClick={() => openUrl("my-app")}>
              <img src={Image.ic_user} alt="" />
              <Typography className={classes.titleItem}>App của tôi</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={4} lg={4}>
            <Box className={classes.blItem} onClick={checkOcr}>
              <img src={Image.icon_spm} alt="" />
              <Typography className={classes.titleItem}>
                Thông tin khách hàng
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={4} lg={4}>
            <Box className={classes.blItem} onClick={() => openUrl("ocr")}>
              <img src={Image.icon_commission} alt="" />
              <Typography className={classes.titleItem}>OCR</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className={clsx(classes.flexCenter, classes.mrTop10)}>
        <Button className={classes.btnLogout} onClick={logout}>
          Logout 3P
        </Button>
      </Box>
    </Box>
  );
};

export default connect(mapStateToProps)(Home);
