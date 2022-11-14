import React, { useState, useEffect } from "react";

import clsx from "clsx";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import useForm from "react-hook-form";
import ErrorMessage from "components/ErrorMessage";
import Input from "components/Input";
import styles from "../../styles";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { reducerType } from "redux/reducers";

import ButtonFooter from "pages/RegisterInforCustomer/components/ButtonFooter";
import DropdownComponent from "components/DropdownComponent";

import { LoanProductsInforReducer } from "redux/reducers/customer";
import { UPDATE_LOAN_PRODUCTS_INFOR } from "redux/reducers/customer/actionTypes";
import { UPDATE_RATE_INFORMATION } from "redux/reducers/products/actionTypes";
import { getShopPos, getSupplyByPos, getSchemeByPos } from "api/products";

import { SET_LOADING } from "redux/reducers/init/actionTypes";

export interface Screen1Props {
  dispatch: Dispatch;
  onChangeScreen?: (index: number) => void;
  loanProductsInfor: LoanProductsInforReducer;
  listProvince: any[];
}

const mapStateToProps = (state: reducerType) => {
  return {
    loanProductsInfor: state.customer.loanProductsInfor,
    listProvince: state.province.listProvince
  };
};

const Screen1 = (props: Screen1Props) => {
  const { onChangeScreen, loanProductsInfor, dispatch, listProvince } = props;
  const classes = styles();

  const [dataLoanProducts, setDataLoanProducts] = useState(loanProductsInfor);
  const [isCheckSubmit, setIsCheckSubmit] = useState(false);
  const [posList, setPosList] = useState([]);
  const [listSupply, setListSupply] = useState([]);
  const [schemaGroup, setSchemaGroup] = useState([]);
  const [listSchema, setListChema] = useState([]);
  const [listSchemaFilter, setListSchemaFilter] = useState([]);

  const { register, errors, handleSubmit } = useForm({
    defaultValues: dataLoanProducts
  });

  useEffect(() => {
    let isCheckSubmit = Object.values(dataLoanProducts).every(
      v => v !== "" && v !== null
    );
    setIsCheckSubmit(isCheckSubmit);
  }, [dataLoanProducts]);

  useEffect(() => {
    if (dataLoanProducts.regionId) {
      getListShop(dataLoanProducts.regionId);
    }
    if (dataLoanProducts.supplierId) {
      getSupplyPos(dataLoanProducts.supplierId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (data: any) => {
    const { e, key } = data;
    if (key === "regionId" && e) {
      getListShop(e);
      let newLoanProduct = {
        ...dataLoanProducts,
        [key]: e,
        supplierId: "",
        posId: "",
        schemeGroupId: "",
        schemeId: ""
      };
      setDataLoanProducts(newLoanProduct);
    } else if (key === "supplierId" && e) {
      setDataLoanProducts({
        ...dataLoanProducts,
        [key]: e,
        schemeGroupId: "",
        schemeId: ""
      });
      getSupplyPos(e);
    } else if (key === "schemeGroupId") {
      const arrSchemaFilter = listSchema.filter(
        item => item.schemeGroup_ID === Number(e)
      );
      setListSchemaFilter(arrSchemaFilter);
      setDataLoanProducts({
        ...dataLoanProducts,
        [key]: e,
        schemeId: ""
      });
    } else {
      setDataLoanProducts({
        ...dataLoanProducts,
        [key]: e
      });
    }
  };

  const getListShop = async code => {
    dispatch({ type: SET_LOADING, loading: true });
    let data = {
      province: code,
      partner: "MWG"
    };
    const res = await getShopPos(data);
    dispatch({ type: SET_LOADING, loading: false });
    setPosList(res.data);
  };

  const getSupplyPos = async code => {
    dispatch({ type: SET_LOADING, loading: true });
    const res = await getSupplyByPos(code);
    const res1 = await getSchemeByPos(code);
    dispatch({ type: SET_LOADING, loading: false });

    if (res) {
      setListSupply(res.data);
    }
    if (res1) {
      setListChema(res1.data);
      if (loanProductsInfor.schemeGroupId) {
        const arrSchemaFilter = res1.data.filter(
          item => item.schemeGroup_ID == loanProductsInfor.schemeGroupId
        );
        setListSchemaFilter(arrSchemaFilter);
      } else {
        setListSchemaFilter(res1.data);
      }
      const arr = Object.keys(res1.schemeGroup).map(item => {
        return {
          id: res1.schemeGroup[item],
          name: item
        };
      });
      setSchemaGroup(arr);
    }
  };

  const submit = () => {
    const newData = {
      supplierId: Number(dataLoanProducts.supplierId),
      regionId: Number(dataLoanProducts.regionId),
      posId: Number(dataLoanProducts.posId),
      schemeGroupId: Number(dataLoanProducts.schemeGroupId),
      schemeId: Number(dataLoanProducts.schemeId)
    };
    dispatch({
      type: UPDATE_LOAN_PRODUCTS_INFOR,
      loanProductsInfor: newData
    });
    const rateInfo = listSchema.find(
      item => item.scheme_ID == dataLoanProducts.schemeId
    );
    dispatch({
      type: UPDATE_RATE_INFORMATION,
      rateInformation: rateInfo
    });
    onChangeScreen(2);
  };

  return (
    <Grid container>
      <form
        name="product"
        onSubmit={handleSubmit(submit)}
        className={classes.form}
      >
        <DropdownComponent title="Sản phẩm vay">
          <Grid container spacing={2} className={classes.blTab}>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="regionId"
                type="select"
                fullWidth
                placeholder="Khu vực"
                label="Khu vực"
                validate={register({
                  required: false
                })}
                error={errors.regionId}
                value={dataLoanProducts.regionId}
                options={[
                  { id: "", name: "-- Vui lòng chọn tỉnh thành phố --" },
                  ...listProvince
                ]}
                changeHandler={e => onChange({ e: e, key: "regionId" })}
              />
              {errors.regionId && errors.regionId.type === "required" && (
                <ErrorMessage>Vui lòng chọn khu vực</ErrorMessage>
              )}
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="supplierId"
                type="selectcustom"
                fullWidth
                placeholder="Cửa hàng"
                label="Cửa hàng"
                validate={register({
                  required: false
                })}
                disabled={dataLoanProducts.regionId ? false : true}
                value={dataLoanProducts.supplierId}
                error={errors.supplierId}
                nameOption="pos_NAME"
                keyOption="pos_ID"
                options={[
                  { pos_ID: "", pos_NAME: "-- Vui lòng chọn cửa hàng --" },
                  ...posList
                ]}
                changeHandler={e => onChange({ e: e, key: "supplierId" })}
              />
              {errors.supplierId && errors.supplierId.type === "required" && (
                <ErrorMessage>Vui lòng chọn cửa hàng</ErrorMessage>
              )}
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="posId"
                type="selectcustom"
                fullWidth
                placeholder="Đối tác"
                label="Đối tác"
                validate={register({
                  required: false
                })}
                error={errors.posId}
                options={[
                  {
                    supplier_ID: "",
                    supplier_NAME: "-- Vui lòng chọn đối tác --"
                  },
                  ...listSupply
                ]}
                nameOption="supplier_NAME"
                keyOption="supplier_ID"
                value={dataLoanProducts.posId}
                changeHandler={e => onChange({ e: e, key: "posId" })}
              />
              {errors.posId && errors.posId.type === "required" && (
                <ErrorMessage>Vui lòng điền đối tác</ErrorMessage>
              )}
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="schemeGroupId"
                type="select"
                fullWidth
                placeholder="Nhóm sản phẩm vay"
                label="Nhóm sản phẩm vay"
                validate={register({
                  required: false
                })}
                options={[
                  { id: "", name: "-- Vui lòng chọn nhóm sản phẩm cho vay --" },
                  ...schemaGroup
                ]}
                disabled={
                  dataLoanProducts.regionId && dataLoanProducts.supplierId
                    ? false
                    : true
                }
                error={errors.schemeGroupId}
                value={dataLoanProducts.schemeGroupId}
                changeHandler={e => onChange({ e: e, key: "schemeGroupId" })}
              />
              {errors.schemeGroupId &&
                errors.schemeGroupId.type === "required" && (
                  <ErrorMessage>Vui lòng chọn nhóm sản phẩm vay</ErrorMessage>
                )}
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="schemeId"
                type="selectcustom"
                fullWidth
                placeholder="Khung lãi xuất"
                label="Khung lãi xuất"
                validate={register({
                  required: false
                })}
                options={[
                  {
                    scheme_ID: "",
                    scheme_NAME: "-- Vui lòng chọn khung lãi xuất --"
                  },
                  ...listSchemaFilter
                ]}
                disabled={
                  dataLoanProducts.regionId && dataLoanProducts.supplierId
                    ? false
                    : true
                }
                nameOption="scheme_NAME"
                keyOption="scheme_ID"
                error={errors.schemeId}
                value={dataLoanProducts.schemeId}
                changeHandler={e => onChange({ e: e, key: "schemeId" })}
              />
              {errors.schemeId && errors.schemeId.type === "required" && (
                <ErrorMessage>Vui lòng chọn khung lãi xuất</ErrorMessage>
              )}
            </Grid>
          </Grid>
        </DropdownComponent>
        <Box className={clsx(classes.mrTop20, classes.alignCenter)}>
          <ButtonFooter onClick={submit} disabled={!isCheckSubmit} />
        </Box>
      </form>
    </Grid>
  );
};

export default connect(mapStateToProps)(Screen1);
