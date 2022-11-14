import React, { lazy, useState } from "react";

import { LOGIN } from "redux/reducers/auth/actionTypes";
import { push } from "connected-react-router";

import { reducerType } from "redux/reducers";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Box, Typography } from "@material-ui/core";

import HeaderBarSub from "components/HeaderBarSub";
import SubmitButton from "components/Button";
import KeyboardTabIcon from "@material-ui/icons/KeyboardTab";
// import Loading from "components/Loading";
import useForm from "react-hook-form";
import ErrorMessage from "components/ErrorMessage";
import Input from "components/Input";

import styles from "./styles";

const GridFullHeight = lazy(() => import("components/GridFullHeight"));

interface AuthPageProps {
  dispatch: Dispatch;
}

const mapStateToProps = (state: reducerType) => {
  return {};
};

const AuthPage = React.memo((props: AuthPageProps) => {
  const { dispatch } = props;
  const classes = styles();

  const { register, errors, handleSubmit } = useForm();

  const submit = (data: any, e: any) => {
    e.preventDefault();
    login(data);
  };

  const login = form => {
    dispatch({
      type: LOGIN,
      current_user: form
    });
  };

  const openUrl = url => {
    dispatch(push(url));
  };

  return (
    <GridFullHeight container className={classes.root}>
      <GridFullHeight container>
        <HeaderBarSub openUrl={openUrl} name="Login" isGoBack={false} />
        <Box className={classes.blForm}>
          <form className={classes.form} onSubmit={handleSubmit(submit)}>
            <Box>
              <Typography variant="h5" className={classes.title}>
                Đăng nhập
              </Typography>
              <Typography className={classes.contentTitle}>
                Chào mừng bạn đến với CDL 3P
              </Typography>
            </Box>
            <Box>
              <Box>
                <Input
                  type="text"
                  name="username"
                  label="Username"
                  fullWidth
                  placeholder="Username"
                  error={errors.username}
                  validate={register({
                    required: true
                  })}
                />
                {errors.username && errors.username.type === "required" && (
                  <ErrorMessage>Vui lòng điền username</ErrorMessage>
                )}
              </Box>

              <Box className={classes.mrTop15}>
                <Input
                  name="password"
                  type="password"
                  label="Mật khẩu"
                  fullWidth
                  placeholder="Nhập mật khẩu"
                  error={errors.password}
                  validate={register({
                    required: true
                  })}
                />
                {errors.password && errors.password.type === "required" && (
                  <ErrorMessage>Vui lòng nhập mật khẩu</ErrorMessage>
                )}
              </Box>
            </Box>
            <SubmitButton type="submit" className={classes.btnLogin}>
              <Typography className={classes.mrRight10}>Đăng nhập</Typography>
              <KeyboardTabIcon />
            </SubmitButton>
          </form>
        </Box>
      </GridFullHeight>
    </GridFullHeight>
  );
});

export default connect(mapStateToProps)(AuthPage);
