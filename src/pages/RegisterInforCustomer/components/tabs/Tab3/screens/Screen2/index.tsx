import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import clsx from "clsx";

import styles from "../../styles";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { reducerType } from "redux/reducers";

import useForm from "react-hook-form";
import ErrorMessage from "components/ErrorMessage";
import Input from "components/Input";

import ButtonFooter from "pages/RegisterInforCustomer/components/ButtonFooter";
import { RateInformationReducer } from "redux/reducers/products";

import { UPDATE_BILLING_INFORMATION } from "redux/reducers/customer/actionTypes";

import {
  ProductRegisterInfoReducer,
  DetailProductInfoReducer,
  BillingInfoReducer
} from "redux/reducers/customer";

import { formatNumber } from "common/helpers/parse";
import { changeDayToString, getDayOfTime } from "common/helpers/date";
import { createArray } from "common/helpers/parse";

export interface Screen2Props {
  onChangeScreen?: (index: number) => void;
  rateInformation: RateInformationReducer;
  productRegisterInfo: ProductRegisterInfoReducer;
  detailProductInfo: DetailProductInfoReducer;
  billingInfo: BillingInfoReducer;
  dispatch: Dispatch;
}

const mapStateToProps = (state: reducerType) => {
  return {
    rateInformation: state.products.rateInformation,
    productRegisterInfo: state.customer.productRegisterInfo,
    detailProductInfo: state.customer.detailProductInfo,
    billingInfo: state.customer.billingInfo
  };
};

const Screen2 = (props: Screen2Props) => {
  const classes = styles();
  const {
    onChangeScreen,
    rateInformation,
    productRegisterInfo,
    detailProductInfo,
    billingInfo,
    dispatch
  } = props;
  const [billingInformation, setBillingInfo] = useState(billingInfo);
  const [isCheckSubmit, setIsCheckSubmit] = useState(false);

  const { register, errors, handleSubmit } = useForm({
    defaultValues: billingInformation
  });

  useEffect(() => {
    let isCheckSubmit = Object.values({
      ...billingInformation
    }).every(v => v !== "" && v !== null);
    setIsCheckSubmit(isCheckSubmit);
  }, [billingInformation]);

  const arrTenure: any = createArray(
    rateInformation.scheme_MIN_TENURE,
    rateInformation.scheme_MAX_TENURE
  );

  const onChangePrepaid = (data: any) => {
    const { e, key } = data;
    let new_prepay = null;
    let new_prepay_percent = null;
    if (key === "downPayment") {
      const text = e.replace(/[^0-9]+/g, "");
      const numSalary = text.replaceAll(".", "");
      new_prepay = numSalary;
      new_prepay_percent = (
        (Number(numSalary) / Number(detailProductInfo.loanAmount)) *
        100
      ).toFixed(2);
    } else {
      new_prepay_percent = e;
      new_prepay = (
        (Number(e) / 100) *
        Number(detailProductInfo.loanAmount)
      ).toFixed(2);
    }
    setBillingInfo({
      ...billingInformation,
      downPayment: new_prepay,
      prepaidPer: new_prepay_percent
    });
  };

  const onChange = (data: any) => {
    const { e, key } = data;
    if (key === "dueDate") {
      let today = new Date();
      let newDate = new Date();
      today.setDate(30);
      newDate.setDate(e);
      newDate.setMonth(newDate.getMonth() + 2);
      const diffDate = getDayOfTime(newDate, today);

      if (diffDate >= 40) {
        newDate.setMonth(newDate.getMonth() - 1);
      }
      setBillingInfo({
        ...billingInformation,
        [key]: e,
        firstEmi: changeDayToString(newDate)
      });
    } else {
      setBillingInfo({
        ...billingInformation,
        [key]: e
      });
    }
  };

  const submit = () => {
    const params = {
      downPayment: Number(billingInformation.downPayment),
      prepaidPer: Number(billingInformation.prepaidPer),
      tenure: Number(billingInformation.tenure),
      dueDate: Number(billingInformation.dueDate),
      firstEmi: billingInformation.firstEmi
    };
    dispatch({
      type: UPDATE_BILLING_INFORMATION,
      billingInfo: params
    });
    onChangeScreen(3);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(submit)}>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} xs={12}>
            <Box className={classes.itemPro}>
              <Box>
                <Typography className={classes.titlePro}>
                  {productRegisterInfo.list_product &&
                    productRegisterInfo.list_product.name}
                </Typography>
                <Box className={classes.totalPro}>
                  <Typography>Màu sản phẩm: Black</Typography>
                  <Typography>
                    {formatNumber(detailProductInfo.loanAmount)} đ
                  </Typography>
                </Box>
              </Box>
              <Box className={classes.iconCheck}>
                <CheckIcon />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box className={clsx(classes.totalPrice, classes.mrTop15)}>
          <Typography className={classes.titlePro}>Tổng tiền</Typography>
          <Typography>
            {formatNumber(detailProductInfo.loanAmount)} đ
          </Typography>
        </Box>
        <Box>
          <Box className={clsx(classes.mrTop15, classes.flexBox)}>
            <Typography className={classes.titlePro}>
              % Trả trước tối thiểu:
            </Typography>
            <Typography>{rateInformation.dp_MIN_DOWN_PAYMENT}%</Typography>
          </Box>
          <Box className={clsx(classes.mrTop15, classes.flexBox)}>
            <Typography className={classes.titlePro}>
              % Trả trước tối đa:
            </Typography>
            <Typography>{rateInformation.dp_MAX_DOWN_PAYMENT}%</Typography>
          </Box>
          <Box className={clsx(classes.flexBox)}>
            <Typography className={classes.titlePro}>
              Trả trước tối thiểu:
            </Typography>
            <Box className={classes.w50}>
              <Input
                name="downPayment"
                type="number"
                keyMoney={true}
                fullWidth
                placeholder="Giá sản phẩm"
                validate={register({
                  required: false
                })}
                error={errors.downPayment}
                value={billingInformation.downPayment}
                changeHandler={e =>
                  onChangePrepaid({ e: e.target.value, key: "downPayment" })
                }
              />
              {errors.downPayment && errors.downPayment.type === "required" && (
                <ErrorMessage>Vui lòng điền số tiền trả trước</ErrorMessage>
              )}
            </Box>
          </Box>
          <Box className={clsx(classes.flexBox)}>
            <Typography className={classes.titlePro}>% Trả trước:</Typography>
            <Box className={classes.w50}>
              <Input
                name="prepaidPer"
                type="number"
                fullWidth
                placeholder="% trả trước"
                validate={register({
                  required: false
                })}
                error={errors.prepaidPer}
                value={billingInformation.prepaidPer}
                changeHandler={e =>
                  onChangePrepaid({ e: e.target.value, key: "prepaidPer" })
                }
              />
              {errors.prepaidPer && errors.prepaidPer.type === "required" && (
                <ErrorMessage>Vui lòng điền số tiền trả trước</ErrorMessage>
              )}
            </Box>
          </Box>
          <Box className={clsx(classes.flexBox)}>
            <Typography className={classes.titlePro}>Kì hạn:</Typography>
            <Box className={classes.w50}>
              <Input
                name="tenure"
                type="select"
                fullWidth
                placeholder="Kì hạn"
                validate={register({
                  required: false
                })}
                error={errors.tenure}
                value={billingInformation.tenure}
                options={[
                  { id: "", name: "Vui lòng chọn kì hạn" },
                  ...arrTenure
                ]}
                changeHandler={e => onChange({ e: e, key: "tenure" })}
              />
              {errors.tenure && errors.tenure.type === "required" && (
                <ErrorMessage>Vui lòng chọn kì hạn</ErrorMessage>
              )}
            </Box>
          </Box>
          <Box className={clsx(classes.mrTop10, classes.flexBox)}>
            <Typography className={classes.titlePro}>
              Ngày thanh toán:
            </Typography>
            <Box className={classes.w50}>
              <Input
                name="dueDate"
                type="select"
                fullWidth
                placeholder="Ngày thanh toán"
                validate={register({
                  required: false
                })}
                error={errors.dueDate}
                value={billingInformation.dueDate}
                options={[
                  { id: "", name: "Vui lòng chọn ngày thanh toán" },
                  { id: 1, name: "1" },
                  { id: 5, name: "5" },
                  { id: 10, name: "10" },
                  { id: 15, name: "15" },
                  { id: 20, name: "20" },
                  { id: 25, name: "25" },
                  { id: 30, name: "30" }
                ]}
                changeHandler={e => onChange({ e: e, key: "dueDate" })}
              />
              {errors.dueDate && errors.dueDate.type === "required" && (
                <ErrorMessage>Vui lòng chọn kì hạn</ErrorMessage>
              )}
            </Box>
          </Box>
          <Box
            className={clsx(classes.mrTop15, classes.flexBox, classes.firstDay)}
          >
            <Typography className={classes.titlePro}>
              Ngày thanh toán đầu tiên
            </Typography>
            <Typography>{billingInformation.firstEmi}</Typography>
          </Box>
        </Box>

        <Box className={clsx(classes.flexCenter, classes.mrTop20)}>
          <Box>
            <ButtonFooter disabled={!isCheckSubmit} onClick={submit} />
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default connect(mapStateToProps)(Screen2);
