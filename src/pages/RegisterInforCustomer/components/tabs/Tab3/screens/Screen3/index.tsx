import React, { useEffect, useState } from "react";
import { Box, Typography, Switch } from "@material-ui/core";

import clsx from "clsx";
import styles from "../../styles";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { reducerType } from "redux/reducers";

import ButtonFooter from "pages/RegisterInforCustomer/components/ButtonFooter";

import {
  InsuranceReducer,
  BillingInfoReducer,
  LoanProductsInforReducer,
  DetailProductInfoReducer,
  ProductRegisterInfoReducer
} from "redux/reducers/customer";
import { InitDataReducer } from "redux/reducers/init";

import { RateInformationReducer } from "redux/reducers/products";
import {
  UPDATE_INSURRANCE,
  CHECK_CUSTOMER
} from "redux/reducers/customer/actionTypes";

import { formatNumber } from "common/helpers/parse";
import { changeStringToDate } from "common/helpers/date";

import { checkCustomer } from "api/customer";

export interface Screen3Props {
  dispatch: Dispatch;
  moveTab?: () => void;
  onChangeScreen?: (index: number) => void;
  rateInformation: RateInformationReducer;
  loanProductsInfor: LoanProductsInforReducer;
  productRegisterInfo: ProductRegisterInfoReducer;
  detailProductInfo: DetailProductInfoReducer;
  billingInfo: BillingInfoReducer;
  insurrance: InsuranceReducer;
  init_data: InitDataReducer;
}

const mapStateToProps = (state: reducerType) => {
  return {
    insurrance: state.customer.insurrance,
    billingInfo: state.customer.billingInfo,
    rateInformation: state.products.rateInformation,
    loanProductsInfor: state.customer.loanProductsInfor,
    detailProductInfo: state.customer.detailProductInfo,
    productRegisterInfo: state.customer.productRegisterInfo,
    //init data
    init_data: state.init.init_data
  };
};

const Screen3 = (props: Screen3Props) => {
  const classes = styles();
  const {
    moveTab,
    dispatch,
    insurrance,
    billingInfo,
    onChangeScreen,
    rateInformation,
    detailProductInfo,
    loanProductsInfor,
    productRegisterInfo,
    //init
    init_data
  } = props;

  const [loanAmount, setLoanAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [checked, setChecked] = useState(
    insurrance.hadUseInsurance === 0 ? false : true
  );

  useEffect(() => {
    if (checked) {
      let moneyLoan =
        (detailProductInfo.loanAmount * rateInformation.insurance_RATE) / 100;
      setLoanAmount(moneyLoan);
      setTotalAmount(moneyLoan + detailProductInfo.loanAmount);
    }
  }, [checked]);

  const chooseInsurane = (e: any) => {
    setChecked(e.target.checked);
  };

  const onSubmit = async () => {
    dispatch({
      type: UPDATE_INSURRANCE,
      insurrance: { hadUseInsurance: checked ? 1 : 0 }
    });

    const data_check_customer = {
      ...loanProductsInfor,
      ...detailProductInfo,
      ...billingInfo,
      productName: productRegisterInfo.list_product.name,
      productId: productRegisterInfo.list_product.orderNumber,
      productCategory: productRegisterInfo.type_product.value,
      productBrand: productRegisterInfo.brand_product.id
        ? productRegisterInfo.brand_product.name
        : null,
      assetCost: detailProductInfo.loanAmount,
      firstEmi: changeStringToDate(billingInfo.firstEmi),
      insuranceRate: rateInformation.insurance_RATE,
      insuranceId: rateInformation.insurance_ID,
      hadUseInsurance: checked ? 1 : 0,
      loanId: init_data.loanId
    };

    const res = await checkCustomer(data_check_customer);
    if (res) {
      moveTab();
    }
  };

  return (
    <Box>
      <Typography variant="h5" className={classes.title}>
        Bảo hiểm
      </Typography>
      <Box>
        <Box className={classes.checkSwitch}>
          <Typography>Chọn bảo hiểm</Typography>
          <Switch
            checked={checked}
            onChange={chooseInsurane}
            disabled={rateInformation.insurance_ID ? false : true}
          />
        </Box>
        <Box
          className={clsx(classes.insurance, classes.mrTop15)}
          display={`${rateInformation.insurance_ID && checked ? "" : "none"}`}
        >
          <Typography className={classes.titleInsurance}>
            {rateInformation.insurance_INSURANCE_COMPANY}
          </Typography>
          <Box className={clsx(classes.flexBox, classes.mrTop15)}>
            <Typography className={classes.fontBold}>% Tỉ lệ</Typography>
            <Typography>
              {Math.round(rateInformation.insurance_RATE * 1000) / 1000}%
            </Typography>
          </Box>

          <Box className={clsx(classes.flexBox, classes.mrTop15)}>
            <Typography className={classes.fontBold}>
              Số tiền bảo hiểm tối đa
            </Typography>
            <Typography>
              {formatNumber(rateInformation.insurance_MAXIMUM_AMOUNT)}đ
            </Typography>
          </Box>

          <Box className={clsx(classes.flexBox, classes.mrTop15)}>
            <Typography className={classes.fontBold}>
              Số tiền bảo hiểm tối thiểu
            </Typography>
            <Typography>
              {formatNumber(rateInformation.insurance_MINIMUM_AMOUNT)}đ
            </Typography>
          </Box>

          <Box className={clsx(classes.flexBox, classes.mrTop15)}>
            <Typography className={classes.fontBold}>
              Số tiền bảo hiểm
            </Typography>
            <Typography>{formatNumber(loanAmount)} đ</Typography>
          </Box>

          <Box className={clsx(classes.flexBox, classes.mrTop15)}>
            <Typography className={classes.titleInsurance}>
              Tổng số tiền
            </Typography>
            <Typography className={classes.titleInsurance}>
              {formatNumber(totalAmount)} đ
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className={clsx(classes.flexCenter, classes.mrTop20)}>
        <Box>
          <ButtonFooter onClick={onSubmit} />
        </Box>
      </Box>
    </Box>
  );
};

export default connect(mapStateToProps)(Screen3);
