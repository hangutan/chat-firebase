import React, { useState, useEffect } from "react";
import { Box, Grid } from "@material-ui/core";
import clsx from "clsx";

import ButtonFooter from "pages/RegisterInforCustomer/components/ButtonFooter";
import DropdownComponent from "components/DropdownComponent";

import { RELATIONSHIP } from "common/utils";

import { Dispatch } from "redux";
import { connect } from "react-redux";

import { reducerType } from "redux/reducers";
import { InitDataReducer } from "redux/reducers/init";
import { SET_LOADING } from "redux/reducers/init/actionTypes";
import { UPDATE_RELATIONSHIP } from "redux/reducers/customer/actionTypes";
import { RelationshipReducer, LogOCRReducer } from "redux/reducers/customer";

import Input from "components/Input";

import { updateCustomerRefference } from "api/customer";

import styles from "../../styles";

const mapStateToProps = (state: reducerType) => {
  return {
    listRelationships: state.customer.listRelationship,
    logOcr: state.customer.logOcr,
    init_data: state.init.init_data
  };
};

export interface Screen2Props {
  dispatch: Dispatch;
  onChangeScreen?: (index: number) => void;
  moveTab?: () => void;
  listRelationships: RelationshipReducer;
  logOcr: LogOCRReducer;
  init_data: InitDataReducer;
}

const Screen2 = (props: Screen2Props) => {
  const {
    logOcr,
    moveTab,
    dispatch,
    init_data,
    onChangeScreen,
    listRelationships
  } = props;
  const classes = styles();
  const [isCheckSubmit, setIsCheckSubmit] = useState(false);

  const [listRelationship, setListRelationship] = useState(listRelationships);

  useEffect(() => {
    let isCheckSubmit = Object.values(listRelationship).every(v => v !== "");
    setIsCheckSubmit(isCheckSubmit);
  }, [listRelationship]);

  // const addRelation = () => {
  //   setListRelationship([...listRelationship, initDefaultValues]);
  // };

  const onSubmitSuccess = async () => {
    dispatch({ type: SET_LOADING, loading: true });
    const params = {
      ...listRelationship,
      refContact: Number(listRelationship.refContact),
      refContact2: Number(listRelationship.refContact2)
    };
    const res = await updateCustomerRefference({
      ...params,
      customerId: init_data.customerId
    });
    dispatch({ type: SET_LOADING, loading: false });
    if (res) {
      dispatch({
        type: UPDATE_RELATIONSHIP,
        listRelationship: params
      });
      moveTab();
    }
  };

  const onChangeRelationship = (data: any) => {
    const { e, key } = data;
    setListRelationship({
      ...listRelationship,
      [key]: e
    });
  };

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <DropdownComponent title={`Mối quan hệ 1`}>
            <Grid container spacing={2} className={classes.blTab}>
              <Grid item lg={4} md={4} xs={12}>
                <Input
                  name="refName"
                  type="text"
                  fullWidth
                  placeholder="Họ và tên"
                  label="Họ và tên"
                  value={listRelationship.refName}
                  changeHandler={e =>
                    onChangeRelationship({ e: e.target.value, key: "refName" })
                  }
                />
              </Grid>

              <Grid item lg={4} md={4} xs={12}>
                <Input
                  name="refRelationship"
                  type="select"
                  fullWidth
                  placeholder="Mối quan hệ"
                  label="Mối quan hệ"
                  options={RELATIONSHIP}
                  value={listRelationship.refRelationship}
                  changeHandler={e =>
                    onChangeRelationship({ e: e, key: "refRelationship" })
                  }
                />
              </Grid>
              <Grid item lg={4} md={4} xs={12}>
                <Input
                  name="refContact"
                  type="phonenumber"
                  fullWidth
                  placeholder="Số điện thoại"
                  label="Số điện thoại"
                  value={listRelationship.refContact}
                  changeHandler={e =>
                    onChangeRelationship({
                      e: e.target.value,
                      key: "refContact"
                    })
                  }
                />
              </Grid>
              <Grid item lg={4} md={4} xs={12}>
                <Input
                  name="address"
                  type="text"
                  fullWidth
                  placeholder="Địa chỉ"
                  label="Địa chỉ"
                  value={listRelationship.address}
                  changeHandler={e =>
                    onChangeRelationship({ e: e.target.value, key: "address" })
                  }
                />
              </Grid>
            </Grid>
          </DropdownComponent>

          <DropdownComponent title={`Mối quan hệ 2`}>
            <Grid container spacing={2} className={classes.blTab}>
              <Grid item lg={4} md={4} xs={12}>
                <Input
                  name="refName2"
                  type="text"
                  fullWidth
                  placeholder="Họ và tên"
                  label="Họ và tên"
                  value={listRelationship.refName2}
                  changeHandler={e =>
                    onChangeRelationship({ e: e.target.value, key: "refName2" })
                  }
                />
              </Grid>

              <Grid item lg={4} md={4} xs={12}>
                <Input
                  name="refRelationship2"
                  type="select"
                  fullWidth
                  placeholder="Mối quan hệ"
                  label="Mối quan hệ"
                  options={RELATIONSHIP}
                  value={listRelationship.refRelationship2}
                  changeHandler={e =>
                    onChangeRelationship({
                      e: e,
                      key: "refRelationship2"
                    })
                  }
                />
              </Grid>
              <Grid item lg={4} md={4} xs={12}>
                <Input
                  name="refContact2"
                  type="number"
                  fullWidth
                  placeholder="Số điện thoại"
                  label="Số điện thoại"
                  value={listRelationship.refContact2}
                  changeHandler={e =>
                    onChangeRelationship({
                      e: e.target.value,
                      key: "refContact2"
                    })
                  }
                />
              </Grid>
              <Grid item lg={4} md={4} xs={12}>
                <Input
                  name="address2"
                  type="text"
                  fullWidth
                  placeholder="Địa chỉ"
                  label="Địa chỉ"
                  value={listRelationship.address2}
                  changeHandler={e =>
                    onChangeRelationship({ e: e.target.value, key: "address2" })
                  }
                />
              </Grid>
            </Grid>
          </DropdownComponent>
        </Grid>
      </Grid>
      {/* <Box className={classes.addRelationship} onClick={addRelation}>
        <Box>Thêm quan hệ</Box>
        <Box className={clsx(classes.iconRelationShip, classes.flexCenter)}>
          <AddCircleOutlineIcon />
        </Box>
      </Box> */}
      <Box className={clsx(classes.flexCenter)}>
        <ButtonFooter
          title="Tiếp tục"
          // loading={loading}
          disabled={!isCheckSubmit}
          onClick={onSubmitSuccess}
        />
      </Box>
    </Box>
  );
};

export default connect(mapStateToProps)(Screen2);
