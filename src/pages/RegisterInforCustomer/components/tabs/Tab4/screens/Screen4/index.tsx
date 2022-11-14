import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import clsx from "clsx";

import styles from "../../styles";

import useForm from "react-hook-form";
import ErrorMessage from "components/ErrorMessage";
import Input from "components/Input";

import DropdownComponent from "components/DropdownComponent";

export interface Screen4Props {
  onChangeScreen?: (index: number) => void;
  moveTab?: () => void;
}

const Screen4 = (props: Screen4Props) => {
  const classes = styles();
  const { onChangeScreen, moveTab } = props;

  const { register, errors, handleSubmit } = useForm();

  const onChange = (e: any) => {};

  const submit = (data: any, e: any) => {
    e.preventDefault();
    onChangeScreen(2);
  };
  return (
    <Box>
      <DropdownComponent title="CMND/CCCD">
        <Box className={clsx(classes.blImg, classes.mrTop15)}>
          <Box className={classes.blImgLeft}>
            <Box className={classes.iconCheckImg}>
              <CheckIcon />
            </Box>
            <Typography className={classes.textImg}>Mặt trước</Typography>
          </Box>
          <Box className={classes.blImgRight}>
            <img src="" alt="" />
          </Box>
        </Box>

        <Box className={clsx(classes.blImg, classes.mrTop10)}>
          <Box className={classes.blImgLeft}>
            <Box className={classes.iconCheckImg}>
              <CheckIcon />
            </Box>
            <Typography className={classes.textImg}>Mặt sau</Typography>
          </Box>
          <Box className={classes.blImgRight}>
            <img src="" alt="" />
          </Box>
        </Box>
      </DropdownComponent>

      <DropdownComponent title="Sổ hộ khẩu">
        <Box className={clsx(classes.blImg, classes.mrTop15)}>
          <Box className={classes.blImgLeft}>
            <Box className={classes.iconCheckImg}>
              <CheckIcon />
            </Box>
            <Typography className={classes.textImg}>
              Chụp tối thiểu 5 ảnh
            </Typography>
          </Box>
          <Box className={classes.blImgRight}>
            <img src="" alt="" />
          </Box>
        </Box>
      </DropdownComponent>

      <DropdownComponent title="Bằng lái xe">
        <Box className={clsx(classes.blImg, classes.mrTop15)}>
          <Box className={classes.blImgLeft}>
            <Box className={classes.iconCheckImg}>
              <CheckIcon />
            </Box>
            <Typography className={classes.textImg}>Mặt trước</Typography>
          </Box>
          <Box className={classes.blImgRight}>
            <img src="" alt="" />
          </Box>
        </Box>

        <Box className={clsx(classes.blImg, classes.mrTop10)}>
          <Box className={classes.blImgLeft}>
            <Box className={classes.iconCheckImg}>
              <CheckIcon />
            </Box>
            <Typography className={classes.textImg}>Mặt sau</Typography>
          </Box>
          <Box className={classes.blImgRight}>
            <img src="" alt="" />
          </Box>
        </Box>
      </DropdownComponent>

      <DropdownComponent title="Giấy tờ khác">
        <Box className={clsx(classes.blImg, classes.mrTop15)}>
          <Box className={classes.blImgLeft}>
            <Box className={classes.iconCheckImg}>
              <CheckIcon />
            </Box>
            <Typography className={classes.textImg}>
              Chụp tối thiểu 5 ảnh
            </Typography>
          </Box>
          <Box className={classes.blImgRight}>
            <img src="" alt="" />
          </Box>
        </Box>
      </DropdownComponent>

      <DropdownComponent title="Ảnh chân dung">
        <Box className={clsx(classes.blImg, classes.mrTop15)}>
          <Box className={classes.blImgLeft}>
            <Box className={classes.iconCheckImg}>
              <CheckIcon />
            </Box>
            <Typography className={classes.textImg}>
              Chụp tối thiểu 5 ảnh
            </Typography>
          </Box>
          <Box className={classes.blImgRight}>
            <img src="" alt="" />
          </Box>
        </Box>
      </DropdownComponent>

      <DropdownComponent title="Ghi chú">
        {/* <Box className={clsx(classes.blImg, classes.mrTop15)}>
          <Input type="area" placeholder="Nhập ghi chú" />
        </Box> */}
      </DropdownComponent>
    </Box>
  );
};

export default Screen4;
