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
            <Box>Thêm</Box>
            <Box>
              <IconAdd />
            </Box>
          </button>
        </Box>
        <DropdownComponent title="Chi tiết sản phẩm">
          <Box className={classes.detailPro}>
            <Box className={classes.itemProduct}>
              <Typography className={classes.titleItem}>
                Loại sản phẩm
              </Typography>
              <Typography>
                {defaultCategory.value ? defaultCategory.description : ""}
              </Typography>
            </Box>
            <Box className={classes.itemProduct}>
              <Typography className={classes.titleItem}>Thương hiệu</Typography>
              <Typography>
                {defaultBrand.id ? defaultBrand.name : ""}
              </Typography>
            </Box>
            <Box className={classes.itemProduct}>
              <Typography className={classes.titleItem}>
                Tên sản phẩm
              </Typography>
              <Typography>{defaultList.id ? defaultList.name : ""}</Typography>
            </Box>
          </Box>
        </DropdownComponent>

        <DropdownComponent title="Thông tin sản phẩm">
          <Grid container spacing={2} className={classes.blTab}>
            <Grid item lg={6} md={6} xs={12}>
              <Input
                name="loanAmount"
                type="number"
                fullWidth
                placeholder="Giá sản phẩm"
                label="Giá sản phẩm"
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
                <ErrorMessage>Vui lòng điền giá sản phẩm</ErrorMessage>
              )}
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <Input
                name="color"
                type="text"
                fullWidth
                placeholder="Màu sản phẩm"
                label="Màu sản phẩm"
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
                <ErrorMessage>Vui lòng chọn màu sản phẩm</ErrorMessage>
              )}
            </Grid>
          </Grid>
        </DropdownComponent>

        <DropdownComponent title="Thông tin bổ sung">
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
                <ErrorMessage>Vui lòng điền IMEI</ErrorMessage>
              )}
            </Grid>
            {/* <Grid item lg={6} md={6} xs={12}>
              <Input
                name="status"
                type="select"
                fullWidth
                placeholder="Tình trạng sản phẩm"
                label="Tình trạng sản phẩm"
                validate={register({
                  required: false,
                })}
                options={[
                  { id: "new", name: "Mới" },
                  { id: "old", name: "Cũ" },
                ]}
                error={errors.status}
                value={detailProduct.status}
                changeHandler={(e) => onChange({ e: e, key: "status" })}
              />
              {errors.status && errors.status.type === "required" && (
                <ErrorMessage>Vui lòng chọn trạng thái sản phẩm</ErrorMessage>
              )}
            </Grid> */}
          </Grid>
        </DropdownComponent>
        <Box className={clsx(classes.alignCenter, classes.mrTop20)}>
          <ButtonFooter
            // type="submit"
            title="Tiếp tục"
            disabled={!isCheckSubmit}
            onClick={submit}
          />
        </Box>
      </form>
    </Box>
  );
};

export default connect(mapStateToProps)(Screen1);
