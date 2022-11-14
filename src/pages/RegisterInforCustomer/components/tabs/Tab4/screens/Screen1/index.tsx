import React from "react";
import clsx from "clsx";

import IconAdd from "@material-ui/icons/Add";
import DropdownComponent from "components/DropdownComponent";
import { Typography, Box, Grid } from "@material-ui/core";

import useForm from "react-hook-form";
import ErrorMessage from "components/ErrorMessage";
import Input from "components/Input";

import ButtonFooter from "pages/RegisterInforCustomer/components/ButtonFooter";

import styles from "../../styles";

export interface Screen1Props {
  onChangeScreen?: (index: number) => void;
}

const Screen1 = (props: Screen1Props) => {
  const { onChangeScreen } = props;
  const classes = styles();

  const { register, errors, handleSubmit } = useForm();

  const onChange = (e: any) => {};

  const submit = (data: any, e: any) => {
    e.preventDefault();
    onChangeScreen(2);
  };
  return (
    <Box>
      <Box className={classes.totalPrice}>
        <Typography className={classes.fontBold}>Tổng tiền sản phẩm</Typography>
        <Typography>19.000.000đ</Typography>
      </Box>
      <Box>
        <Box className={clsx(classes.mrTop15, classes.flexBox)}>
          <Typography className={classes.fontBold}>Số tiền vay</Typography>
          <Box className={clsx(classes.blLoan, classes.w50)}>
            <Typography className={classes.textLoan}>4.000.000đ</Typography>
          </Box>
        </Box>
        <Box className={clsx(classes.mrTop15, classes.flexBox)}>
          <Typography className={classes.fontBold}>
            Số tiền trả trước
          </Typography>
          <Box className={classes.w50}>
            <Input
              name="firstPrice"
              type="text"
              fullWidth
              placeholder="Giá sản phẩm"
              validate={register({
                required: true,
              })}
              error={errors.firstPrice}
              // value={dealer.podName}
              changeHandler={(e) => onChange(e)}
            />
            {errors.firstPrice && errors.firstPrice.type === "required" && (
              <ErrorMessage>Vui lòng điền số tiền trả trước</ErrorMessage>
            )}
          </Box>
        </Box>
        <Box className={clsx(classes.mrTop15, classes.flexBox)}>
          <Typography className={classes.fontBold}>Kì hạn</Typography>
          <Box className={classes.w50}>
            <Input
              name="tenor"
              type="select"
              fullWidth
              placeholder="Kì hạn"
              validate={register({
                required: true,
              })}
              error={errors.tenor}
              // value={dealer.podName}
              options={[{ label: "1 tháng" }, { label: "1 năm" }]}
              changeHandler={(e) => onChange(e)}
            />
            {errors.tenor && errors.tenor.type === "required" && (
              <ErrorMessage>Vui lòng chọn kì hạn</ErrorMessage>
            )}
          </Box>
        </Box>
        <Box className={clsx(classes.mrTop15, classes.flexBox)}>
          <Typography className={classes.fontBold}>Ngày thanh toán</Typography>
          <Box className={classes.w50}>
            <Input
              name="dateOfPayment"
              type="select"
              fullWidth
              placeholder="Ngày thanh toán"
              validate={register({
                required: true,
              })}
              error={errors.dateOfPayment}
              // value={dealer.podName}
              options={[{ label: "1 tháng" }, { label: "1 năm" }]}
              changeHandler={(e) => onChange(e)}
            />
            {errors.dateOfPayment &&
              errors.dateOfPayment.type === "required" && (
                <ErrorMessage>Vui lòng chọn kì hạn</ErrorMessage>
              )}
          </Box>
        </Box>

        <Box className={clsx(classes.totalPrice, classes.mrTop15)}>
          <Typography className={classes.fontBold}>
            Ngày thanh toán đầu tiên
          </Typography>
          <Typography>15/10/2022</Typography>
        </Box>

        <Box className={clsx(classes.totalPrice, classes.mrTop15)}>
          <Typography className={classes.titleInsurance}>
            Tổng tiền vay
          </Typography>
          <Typography className={classes.titleInsurance}>
            15.000.000đ
          </Typography>
        </Box>

        <Box>
          <Typography className={clsx(classes.fontBold, classes.mrTop15)}>
            Mô tả khung lãi xuất tín dụng
          </Typography>
          <Box className={classes.blTable}>
            <table>
              <tr>
                <th></th>
                <th>Khung</th>
                <th>Tín dụng</th>
                <th>Kết quả</th>
              </tr>
              <tr>
                <td>Khoản vay tối thiểu</td>
                <td>2.000.000đ</td>
                <td>2.000.000đ</td>
                <td>2.000.000đ</td>
              </tr>
              <tr>
                <td>Khoản vay tối đa</td>
                <td>2.000.000đ</td>
                <td>2.000.000đ</td>
                <td>2.000.000đ</td>
              </tr>
              <tr>
                <td>Kì hạn tối thiểu</td>
                <td>3 tháng</td>
                <td>3 tháng</td>
                <td>3 tháng</td>
              </tr>
              <tr>
                <td>Kì hạn tối đa</td>
                <td>3 tháng</td>
                <td>3 tháng</td>
                <td>3 tháng</td>
              </tr>
            </table>
          </Box>
        </Box>
      </Box>

      <Box className={clsx(classes.alignCenter, classes.mrTop20)}>
        <ButtonFooter
          // type="submit"
          title="Tiếp tục"
          onClick={() => onChangeScreen(2)}
        />
      </Box>
    </Box>
  );
};

export default Screen1;
