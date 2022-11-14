import React, { useState, useRef } from "react";

import clsx from "clsx";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import PublishIcon from "@material-ui/icons/Publish";
import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";
import HeaderBarSub from "components/HeaderBarSub";

import useForm from "react-hook-form";
import styles from "./styles";

import SubmitButton from "components/Button";
import TabOCA from "./components/TabOCR";

import { push } from "connected-react-router";

import { reducerType } from "redux/reducers";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import imgLoading from "asset/img/loading.gif";

import {
  UPDATE_INFORMATION_OCR,
  CLEAR_CUSTOMER
} from "redux/reducers/customer/actionTypes";
import { CLEAR_PRODUCT } from "redux/reducers/products/actionTypes";
import { ocrCardId } from "api/customer";

const KEY = {
  FRONT_IMG: "FRONT_IMG",
  BACK_IMG: "BACK_IMG",
  PORTAIN_IMG: "PORTAIN_IMG"
};

const mapStateToProps = (state: reducerType) => {
  return {};
};

export interface Screen1Props {
  onChangeScreen?: (index: number) => void;
  dispatch: Dispatch;
}

export interface FileImage {
  image?: string | any;
  file?: any;
}

const OCR = (props: Screen1Props) => {
  const classes = styles();
  const { onChangeScreen, dispatch } = props;

  const [dataFrontImg, setDataFrontImg] = useState<null | FileImage>();
  const [dataBackImg, setDataBackImg] = useState<null | FileImage>();

  const cardIdFrontRef = useRef<HTMLInputElement | null>(null);
  const cardIdBackRef = useRef<HTMLInputElement | null>(null);
  const portrainRef = useRef<HTMLInputElement | null>(null);

  const { register, errors, handleSubmit } = useForm();

  const [errorLogin, setErrorLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const oPenFile = (key: string) => {
    if (key === KEY.FRONT_IMG) {
      cardIdFrontRef.current.click();
    }
    if (key === KEY.BACK_IMG) {
      cardIdBackRef.current.click();
    }
    if (key === KEY.PORTAIN_IMG) {
      portrainRef.current.click();
    }
  };

  const onChangeFile = (event: any, key: string) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onload = e => {
        if (key === KEY.FRONT_IMG) {
          setDataFrontImg({ image: reader.result, file: file });
        } else if (key === KEY.BACK_IMG) {
          setDataBackImg({ image: reader.result, file: file });
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const openUrl = url => {
    dispatch(push(url));
  };

  const submit = async (data: any, e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrorLogin(false);

    const formData = new FormData();
    if (dataFrontImg && dataFrontImg.file) {
      formData.append("frontImage", dataFrontImg.file);
    }
    if (dataBackImg && dataBackImg.file) {
      formData.append("backImage", dataBackImg.file);
    }

    const res = await ocrCardId(formData);
    if (res && res.data) {
      dispatch({
        type: CLEAR_CUSTOMER
      });
      dispatch({
        type: CLEAR_PRODUCT
      });
      dispatch({
        type: UPDATE_INFORMATION_OCR,
        info: res
      });
      openUrl("infor-customer");
    }
    setLoading(false);
  };

  return (
    <Box>
      <HeaderBarSub openUrl={openUrl} name="CMND/CCCD" isGoBack={true} />
      <Box className={classes.tabOCA}>
        <TabOCA />
      </Box>
      <form
        name="login"
        onSubmit={handleSubmit(submit)}
        className={classes.form}
      >
        <Box className={classes.tab}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
              <Box className={`${classes.fileUpload} ${classes.mTop10}`}>
                {dataFrontImg && (
                  <img
                    className={classes.imgUpload}
                    src={dataFrontImg.image}
                    alt=""
                  />
                )}
                <Box className={classes.contentFile}>
                  <IconButton
                    className={classes.iconFileload}
                    onClick={() => oPenFile(KEY.FRONT_IMG)}
                  >
                    <PublishIcon />
                  </IconButton>
                  <Typography>Front Image</Typography>
                </Box>
              </Box>
              <Box className={classes.displayNone}>
                <input
                  type="file"
                  ref={cardIdFrontRef}
                  onChange={e => onChangeFile(e, KEY.FRONT_IMG)}
                />
                {/* <input
                    ref={cardIdFrontRef}
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    capture="environment"
                  /> */}
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Box className={clsx(classes.fileUpload, classes.mTop10)}>
                {dataBackImg && (
                  <img
                    className={classes.imgUpload}
                    src={dataBackImg.image}
                    alt=""
                  />
                )}
                <Box className={classes.contentFile}>
                  <IconButton
                    className={classes.iconFileload}
                    onClick={() => oPenFile(KEY.BACK_IMG)}
                  >
                    <PublishIcon />
                  </IconButton>
                  <Typography>Back Image</Typography>
                </Box>
              </Box>
              <Box className={classes.displayNone}>
                <input
                  type="file"
                  ref={cardIdBackRef}
                  onChange={e => onChangeFile(e, KEY.BACK_IMG)}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box className={clsx(classes.mrTop20, classes.textCenter)}>
          <SubmitButton type="submit" disabled={loading}>
            {loading && <img alt="loading" src={imgLoading} width="30px" />}
            <Box className={classes.textBtn}>Check</Box>
            <TrendingFlatIcon />
          </SubmitButton>
        </Box>
      </form>
    </Box>
  );
};

export default connect(mapStateToProps)(OCR);
