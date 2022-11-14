import React from "react";
import { Box, Typography } from "@material-ui/core";
import styles from "./styles";
import clsx from "clsx";
import { InfoCustomerConvertReducer } from "redux/reducers/customer";
import { InitDataReducer } from "redux/reducers/init";

interface InformationProps {
  inforCustomer: InfoCustomerConvertReducer;
  init_data: InitDataReducer;
}

const Information = (props: InformationProps) => {
  const { inforCustomer, init_data } = props;
  const classes = styles();
  return (
    <Box>
      <Typography className={clsx(classes.title, classes.mrTop10)} variant="h5">
        Thông tin Khách hàng
      </Typography>
      <Box className={clsx(classes.root, classes.mrTop10)}>
        <Box className={classes.blItem}>
          <Typography className={clsx(classes.item, classes.itemTitle)}>
            PCB code
          </Typography>
          <Typography className={classes.item}>
            {init_data.customerId}
          </Typography>
        </Box>
        <Box className={classes.blItem}>
          <Typography className={clsx(classes.item, classes.itemTitle)}>
            Họ và tên
          </Typography>
          <Typography className={classes.item}>
            {inforCustomer.fullName}
          </Typography>
        </Box>
        <Box className={classes.blItem}>
          <Typography className={clsx(classes.item, classes.itemTitle)}>
            Ngày sinh
          </Typography>
          <Typography className={classes.item}>{inforCustomer.dob}</Typography>
        </Box>
        <Box className={classes.blItem}>
          <Typography className={clsx(classes.item, classes.itemTitle)}>
            Giới tính
          </Typography>
          <Typography className={classes.item}>
            {inforCustomer.gender === 0 ? "Nam" : "Nữ"}
          </Typography>
        </Box>
        <Box className={classes.blItem}>
          <Typography className={clsx(classes.item, classes.itemTitle)}>
            Số điện thoại
          </Typography>
          <Typography className={classes.item}>
            {inforCustomer.phoneNumber}
          </Typography>
        </Box>
        <Box className={classes.blItem}>
          <Typography className={clsx(classes.item, classes.itemTitle)}>
            Số CMND/CCCD
          </Typography>
          <Typography className={classes.item}>
            {inforCustomer.identityNumber}
          </Typography>
        </Box>
        <Box className={classes.blItem}>
          <Typography className={clsx(classes.item, classes.itemTitle)}>
            Địa chỉ hiện tại
          </Typography>
          <Typography className={classes.item}>
            {inforCustomer.perStreet}
          </Typography>
        </Box>
        {/* <Box className={classes.blItem}>
          <Typography className={clsx(classes.item, classes.itemTitle)}>
            Permanent Add
          </Typography>
          <Typography className={classes.item}>null</Typography>
        </Box> */}
        <Box className={classes.blItem}>
          <Typography className={clsx(classes.item, classes.itemTitle)}>
            Nơi làm việc
          </Typography>
          <Typography className={classes.item}></Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Information;
