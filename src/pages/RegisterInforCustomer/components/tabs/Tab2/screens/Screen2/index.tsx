import React, { useState, useEffect } from "react";

import clsx from "clsx";

import { Box, Typography, Grid, Checkbox } from "@material-ui/core";

import useForm from "react-hook-form";
import ErrorMessage from "components/ErrorMessage";
import Input from "components/Input";
import styles from "../../styles";

import IconAdd from "@material-ui/icons/Add";
import IconSearch from "@material-ui/icons/Search";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { reducerType } from "redux/reducers";

import DropdownComponent from "components/DropdownComponent";
import Button from "components/Button";
import ButtonFooter from "pages/RegisterInforCustomer/components/ButtonFooter";

import { UPDATE_PRODUCT_REGISTER_INFO } from "redux/reducers/customer/actionTypes";

import { getCategoryProduct, getBrandProduct, findProduct } from "api/products";
import { ProductRegisterInfoReducer } from "redux/reducers/customer";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

import { SET_LOADING } from "redux/reducers/init/actionTypes";

export interface Screen2Props {
  dispatch: Dispatch;
  moveTab?: () => void;
  onChangeScreen?: (index: number) => void;
  productRegisterInfo: ProductRegisterInfoReducer;
}

const ItemProduct = ({ item, itemCheck, handleChecked }) => {
  const classes = styles();
  return (
    <Box className={classes.itemProduct}>
      <Typography className={classes.nameCheck}>{item.name}</Typography>
      <div className={classes.blCheck}>
        <Checkbox
          onChange={() => handleChecked(item)}
          checked={item.id === itemCheck.id ? true : false}
        />
      </div>
    </Box>
  );
};

const mapStateToProps = (state: reducerType) => {
  return {
    productRegisterInfo: state.customer.productRegisterInfo
  };
};

const initProductRegisterInfo = {
  type_product: {
    value: ""
  },
  brand_product: {
    id: ""
  },
  list_product: {
    id: ""
  }
};

const Screen2 = (props: Screen2Props) => {
  const classes = styles();
  const { onChangeScreen, moveTab, productRegisterInfo, dispatch } = props;
  const [loading, setLoading] = useState(false);

  const [keySearch, setKeySearch] = useState("");
  const [itemCheck, setItemCheck] = useState("");
  const [listCategory, setCategory] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [listProduct, setListProduct] = useState([]);

  const [dataProductReg, setDataProductReg] = useState({
    type_product: productRegisterInfo.type_product.value,
    brand_product: productRegisterInfo.brand_product.id
  });

  // const [dataProductReg, setDataProductReg] = useState({
  //   type_product: "",
  //   brand_product: "",
  // });

  const { register, errors, handleSubmit } = useForm({
    defaultValues: dataProductReg
  });

  useEffect(() => {
    if (listCategory.length === 0) {
      getListCategory();
    }
    if (Object.values(productRegisterInfo.type_product.value)) {
      getListBrand(productRegisterInfo.type_product.value);
    }
    if (
      Object.values(productRegisterInfo.type_product.value) ||
      Object.values(productRegisterInfo.brand_product.id)
    ) {
      getListProduct({
        type_product: productRegisterInfo.type_product.value,
        brand_product: Object.values(productRegisterInfo.brand_product.id)
          ? productRegisterInfo.brand_product.id
          : ""
      });
      const itemCheck: any = productRegisterInfo.list_product;
      setItemCheck(itemCheck);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = (e: any) => {
    setKeySearch(e.target.value);
  };

  const searchProduct = () => {
    getListProduct();
  };

  const onChange = (data: any) => {
    const { e, key } = data;
    if (key === "type_product") {
      setListProduct([]);
      setItemCheck("");
      setDataProductReg({
        ...dataProductReg,
        brand_product: "",
        [key]: e
      });
      getListBrand(e);
    }
    if (key === "brand_product") {
      setListProduct([]);
      setItemCheck("");
      setDataProductReg({
        ...dataProductReg,
        [key]: e
      });
    }
  };

  const handleChecked = item => {
    setItemCheck(item);
  };

  const getListCategory = async () => {
    dispatch({ type: SET_LOADING, loading: true });
    const res = await getCategoryProduct();
    dispatch({ type: SET_LOADING, loading: false });
    setCategory(res.data);
  };

  const getListBrand = async type => {
    let params = {
      categoryId: type,
      keyword: keySearch
    };
    dispatch({ type: SET_LOADING, loading: true });
    const res = await getBrandProduct(params);
    dispatch({ type: SET_LOADING, loading: false });
    setListBrand(res.data);
  };

  const getListProduct = async (data?: any) => {
    let params = {};
    if (data) {
      params = {
        categoryId: data.type_product,
        brandId: data.brand_product
      };
    } else {
      params = {
        categoryId: dataProductReg.type_product,
        brandId: dataProductReg.brand_product,
        keyword: keySearch
      };
    }
    dispatch({ type: SET_LOADING, loading: true });
    const res = await findProduct(params);
    setListProduct(res.data);
    dispatch({ type: SET_LOADING, loading: false });
  };

  const submit = () => {
    setLoading(true);
    const cateProduct = listCategory.find(
      obj => obj.value === dataProductReg.type_product
    );
    const brandProduct = listBrand.find(
      obj => obj.id === dataProductReg.brand_product
    );
    dispatch({
      type: UPDATE_PRODUCT_REGISTER_INFO,
      productRegisterInfo: {
        type_product: cateProduct
          ? cateProduct
          : initProductRegisterInfo.type_product,
        brand_product: brandProduct
          ? brandProduct
          : initProductRegisterInfo.brand_product,
        list_product: itemCheck
      }
    });
    moveTab();
  };

  return (
    <Grid container>
      <form
        name="product"
        onSubmit={handleSubmit(submit)}
        className={classes.form}
      >
        <DropdownComponent title="Tìm kiếm">
          <Grid container spacing={2} className={classes.blTab}>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="keySearch"
                type="text"
                fullWidth
                placeholder="Tìm kiếm"
                label="Tìm kiếm"
                value={keySearch}
                changeHandler={e => onSearch(e)}
              />
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="type_product"
                type="selectcustom"
                fullWidth
                placeholder="Loại sản phẩm"
                label="Loại sản phẩm"
                validate={register({
                  required: false
                })}
                options={[
                  {
                    value: "",
                    description: "-- Vui lòng chọn loại sản phẩm --"
                  },
                  ...listCategory
                ]}
                keyOption="value"
                nameOption="description"
                // error={errors.type_product}
                value={dataProductReg.type_product}
                changeHandler={e => onChange({ e: e, key: "type_product" })}
              />
              {/* {errors.type_product &&
                errors.type_product.type === "required" && (
                  <ErrorMessage>Vui lòng chọn loại sản phẩm</ErrorMessage>
                )} */}
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="brand_product"
                type="select"
                fullWidth
                placeholder="Nhãn hiệu"
                label="Nhãn hiệu"
                validate={register({
                  required: false
                })}
                options={[
                  {
                    id: "",
                    name: "-- Vui lòng chọn nhãn hiệu --"
                  },
                  ...listBrand
                ]}
                // error={errors.brand_product}
                value={dataProductReg.brand_product}
                disabled={dataProductReg.type_product ? false : true}
                changeHandler={e => onChange({ e: e, key: "brand_product" })}
              />
              {/* {errors.brand_product &&
                errors.brand_product.type === "required" && (
                  <ErrorMessage>Vui lòng chọn loại nhãn hiệu</ErrorMessage>
                )} */}
            </Grid>
          </Grid>
        </DropdownComponent>

        <DropdownComponent title="Tìm kiếm">
          <Box className={clsx(classes.blBtn, classes.mrTop20)}>
            <button className={classes.btnAdd}>
              <Box>Thêm</Box>
              <IconAdd />
            </button>
            <Button
              className={classes.btnSearch}
              onClick={searchProduct}
              disabled={dataProductReg.type_product ? false : true}
            >
              <Box>Tìm kiếm</Box>
              <IconSearch />
            </Button>
          </Box>

          <Grid container spacing={2} className={classes.blTab}>
            <Grid item lg={12} md={12} xs={12}>
              <Box className={classes.listProduct}>
                {listProduct &&
                  listProduct.map(item => {
                    return (
                      <ItemProduct
                        item={item}
                        key={item.id}
                        itemCheck={itemCheck}
                        handleChecked={handleChecked}
                      />
                    );
                  })}
              </Box>
            </Grid>
          </Grid>
        </DropdownComponent>

        <Box className={clsx(classes.flexCenter, classes.mrTop20)}>
          <ButtonFooter onClick={submit} disabled={itemCheck ? false : true} />
        </Box>
      </form>
    </Grid>
  );
};

export default connect(mapStateToProps)(Screen2);
