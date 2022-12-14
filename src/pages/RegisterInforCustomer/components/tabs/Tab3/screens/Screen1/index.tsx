import React, { useEffect, useState } from "react";
import clsx from "clsx";

import IconAdd from "@material-ui/icons/Add";
import DropdownComponent from "components/DropdownComponent";
import { Typography, Box, Grid } from "@material-ui/core";

import ButtonFooter from "pages/RegisterInforCustomer/components/ButtonFooter";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { reducerType } from "redux/reducers";

import useForm from "react-hook-form";
import ErrorMessage from "components/ErrorMessage";
import Input from "components/Input";
import { ProductRegisterInfoReducer } from "redux/reducers/customer";

import styles from "../../styles";
import { DetailProductInfoReducer } from "redux/reducers/customer";
import { UPDATE_DETAIL_PRODUCT } from "redux/reducers/customer/actionTypes";

import { SET_LOADING } from "redux/reducers/init/actionTypes";

import { formatNumber } from "common/helpers/parse";

export interface Screen1Props {
  onChangeScreen?: (index: number) => void;
  dispatch: Dispatch;
  productRegisterInfo: ProductRegisterInfoReducer;
  detailProductInfo: DetailProductInfoReducer;
}

const mapStateToProps = (state: reducerType) => {
  return {
    productRegisterInfo: state.customer.productRegisterInfo,
    detailProductInfo: state.customer.detailProductInfo
  };
};

const Screen1 = (props: Screen1Props) => {
  const {
    onChangeScreen,
    dispatch,
    productRegisterInfo,
    detailProductInfo
  } = props;
  const classes = styles();
  const defaultCategory = productRegisterInfo.type_product;
  const defaultBrand = productRegisterInfo.brand_product;
  const defaultList = productRegisterInfo.list_product;

  const [isCheckSubmit, setIsCheckSubmit] = useState(false);
  const [detailProduct, setDetailProduct] = useState(detailProductInfo);

  const { register, errors, handleSubmit } = useForm({
    defaultValues: detailProduct
  });

  useEffect(() => {
    let isCheckSubmit = Object.values(detailProduct).every(v => v !== "");
    setIsCheckSubmit(isCheckSubmit);
  }, [detailProduct]);

  const onChange = (data: any) => {
    const { e, key } = data;
    if (key === "loanAmount") {
      const text = e.replace(/[^0-9]+/g, "");
      const numSalary = text.replaceAll(".", "");
      setDetailProduct({
        ...detailProduct,
        [key]: numSalary
      });
    } else {
      setDetailProduct({
        ...detailProduct,
        [key]: e
      });
    }
  };

  const submit = () => {
    const params = {
      ...detailProduct,
      loanAmount: Number(detailProduct.loanAmount)
    };
    dispatch({
      type: UPDATE_DETAIL_PRODUCT,
      detailProductInfo: params
    });
    onChangeScreen(2);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(submit)}>
        <Box>
          <button className={classes.blBtn}>
            <Box>Th??m</Box>
            <Box>
              <IconAdd />
            </Box>
          </button>
        </Box>
        <DropdownComponent title="Chi ti???t s???n ph???m">
          <Box className={classes.detailPro}>
            <Box className={classes.itemProduct}>
              <Typography className={classes.titleItem}>
                Lo???i s???n ph???m
              </Typography>
              <Typography>
                {defaultCategory.value ? defaultCategory.description : ""}
              </Typography>
            </Box>
            <Box className={classes.itemProduct}>
              <Typography className={classes.titleItem}>Th????ng hi???u</Typography>
              <Typography>
                {defaultBrand.id ? defaultBrand.name : ""}
              </Typography>
            </Box>
            <Box className={classes.itemProduct}>
              <Typography className={classes.titleItem}>
                T??n s???n ph???m
              </Typography>
              <Typography>{defaultList.id ? defaultList.name : ""}</Typography>
            </Box>
          </Box>
        </DropdownComponent>

        <DropdownComponent title="Th??ng tin s???n ph???m">
          <Grid container spacing={2} className={classes.blTab}>
            <Grid item lg={6} md={6} xs={12}>
              <Input
                name="loanAmount"
                type="number"
                fullWidth
                placeholder="Gi?? s???n ph???m"
                label="Gi?? s???n ph???m"
                validate={register({
                  required: false
                })}
                error={errors.loanAmount}
                value={detailProduct.loanAmount}
                keyMoney={true}
                changeHandler={e =>
                  onChange({ e: e.target.value, key: "loanAmount" })
                }
              />
              {errors.loanAmount && errors.loanAmount.type === "required" && (
                <ErrorMessage>Vui l??ng ??i???n gi?? s???n ph???m</ErrorMessage>
              )}
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <Input
                name="color"
                type="text"
                fullWidth
                placeholder="M??u s???n ph???m"
                label="M??u s???n ph???m"
                validate={register({
                  required: false
                })}
                value={detailProduct.color}
                error={errors.color}
                changeHandler={e =>
                  onChange({ e: e.target.value, key: "color" })
                }
              />
              {errors.color && errors.color.type === "required" && (
                <ErrorMessage>Vui l??ng ch???n m??u s???n ph???m</ErrorMessage>
              )}
            </Grid>
          </Grid>
        </DropdownComponent>

        <DropdownComponent title="Th??ng tin b??? sung">
          <Grid container spacing={2} className={classes.blTab}>
            <Grid item lg={6} md={6} xs={12}>
              <Input
                name="imei"
                type="text"
                fullWidth
                placeholder="IMEI"
                label="IMEI"
                validate={register({
                  required: false
                })}
                error={errors.imei}
                value={detailProduct.imei}
                changeHandler={e =>
                  onChange({ e: e.target.value, key: "imei" })
                }
              />
              {errors.imei && errors.imei.type === "required" && (
                <ErrorMessage>Vui l??ng ??i???n IMEI</ErrorMessage>
              )}
            </Grid>
            {/* <Grid item lg={6} md={6} xs={12}>
              <Input
                name="status"
                type="select"
                fullWidth
                placeholder="T??nh tr???ng s???n ph???m"
                label="T??nh tr???ng s???n ph???m"
                validate={register({
                  required: false,
                })}
                options={[
                  { id: "new", name: "M???i" },
                  { id: "old", name: "C??" },
                ]}
                error={errors.status}
                value={detailProduct.status}
                changeHandler={(e) => onChange({ e: e, key: "status" })}
              />
              {errors.status && errors.status.type === "required" && (
                <ErrorMessage>Vui l??ng ch???n tr???ng th??i s???n ph???m</ErrorMessage>
              )}
            </Grid> */}
          </Grid>
        </DropdownComponent>
        <Box className={clsx(classes.alignCenter, classes.mrTop20)}>
          <ButtonFooter
            // type="submit"
            title="Ti???p t???c"
            disabled={!isCheckSubmit}
            onClick={submit}
          />
        </Box>
      </form>
    </Box>
  );
};

export default connect(mapStateToProps)(Screen1);
