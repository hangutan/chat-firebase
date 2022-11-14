import React, { useState, useEffect } from "react";

import { Grid, Box, Switch } from "@material-ui/core";
import ButtonFooter from "pages/RegisterInforCustomer/components/ButtonFooter";

import DropdownComponent from "components/DropdownComponent";

import useForm from "react-hook-form";
import ErrorMessage from "components/ErrorMessage";
import Input from "components/Input";

import styles from "../../styles";
import clsx from "clsx";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { reducerType } from "redux/reducers";

import {
  InfoCustomerConvertReducer,
  CheckAddressReducer
} from "redux/reducers/customer";
import { InitDataReducer } from "redux/reducers/init";
import { getDistrict, getWard } from "api/province";

import {
  UPDATE_INFORMATION,
  CHECK_ADDRESS
} from "redux/reducers/customer/actionTypes";
import { updateCustomerOverral } from "api/customer";
import { SET_LOADING } from "redux/reducers/init/actionTypes";

import { changeDayToString, changeStringToDate } from "common/helpers/date";

export interface Screen1Props {
  dispatch: Dispatch;
  inforCustomer: InfoCustomerConvertReducer;
  onChangeScreen?: (index: number) => void;
  listProvince: any[];
  init_data: InitDataReducer;
  checkAddress: CheckAddressReducer;
}

const mapStateToProps = (state: reducerType) => {
  return {
    inforCustomer: state.customer.inforCustomer,
    listProvince: state.province.listProvince,
    init_data: state.init.init_data,
    checkAddress: state.customer.checkAddress
  };
};

const arrGender = [
  {
    value: 1,
    label: "Nam"
  },
  {
    value: 2,
    label: "Nữ"
  }
];

const Screen1 = (props: Screen1Props) => {
  const {
    onChangeScreen,
    inforCustomer,
    listProvince,
    init_data,
    checkAddress,
    dispatch
  } = props;
  const classes = styles();

  const [isCheckSubmit, setIsCheckSubmit] = useState(false);

  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);

  const [listDistrictTem, setListDistrictTem] = useState([]);
  const [listWardTem, setListWardTem] = useState([]);

  const [dataInfor, setDataInfor] = useState(inforCustomer);
  const [sampleAddress, setSampleAddress] = useState(checkAddress.isCheck);

  const { register, errors, handleSubmit } = useForm({
    defaultValues: dataInfor
  });

  const today = new Date();

  useEffect(() => {
    let isCheckSubmit = Object.values(dataInfor).every(
      v => v !== "" && v !== null
    );
    setIsCheckSubmit(isCheckSubmit);
  }, [dataInfor]);

  useEffect(() => {
    if (dataInfor.perProvinceId) {
      getListDistrict({
        e: dataInfor.perProvinceId,
        key: "permanent"
      });
    }
    if (dataInfor.perDistrictId) {
      getListWard({
        e: dataInfor.perDistrictId,
        key: "permanent"
      });
    }
    if (dataInfor.currProvinceId) {
      getListDistrict({
        e: dataInfor.currProvinceId,
        key: "temporary"
      });
    }
    if (dataInfor.currDistrictId) {
      getListWard({
        e: dataInfor.currDistrictId,
        key: "temporary"
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeDay = (data: any) => {
    const date = data.e;
    let newdate = changeDayToString(date);
    if (newdate) {
      setDataInfor({ ...dataInfor, [data.key]: newdate });
    }
  };

  const onChange = (data: any) => {
    if (data.key === "identityType") {
      const { e, key } = data;
      setDataInfor({
        ...dataInfor,
        [key]: e
      });
    } else if (data.key === "jobSalary") {
      const { e, key } = data;
      const text = e.target.value.replace(/[^0-9]+/g, "");
      const numSalary = text.replaceAll(".", "");
      setDataInfor({
        ...dataInfor,
        [key]: numSalary
      });
    } else {
      const { e, key } = data;
      setDataInfor({
        ...dataInfor,
        [key]: e.target.value
      });
    }
  };

  const onChangeNumber = (data: any) => {
    const { e, key } = data;
    setDataInfor({
      ...dataInfor,
      [key]: Number(e.target.value)
    });
  };

  const onChangeProvince = async (data: any) => {
    if (data.key === "permanent") {
      setDataInfor({
        ...dataInfor,
        perProvinceId: data.e,
        perDistrictId: null,
        perWardId: null
      });
      setListWard([]);
      getListDistrict(data);
    } else {
      setDataInfor({
        ...dataInfor,
        currProvinceId: data.e,
        currDistrictId: null,
        currWardId: null
      });
      setListWardTem([]);
      getListDistrict(data);
    }
  };

  const onChangeDistrict = async (data: any) => {
    if (data.key === "permanent") {
      setDataInfor({
        ...dataInfor,
        perDistrictId: data.e,
        perWardId: null
      });
      getListWard(data);
    } else {
      setDataInfor({
        ...dataInfor,
        currDistrictId: data.e,
        currWardId: null
      });
      getListWard(data);
    }
  };

  const onChangeWard = async (data: any) => {
    if (data.key === "permanent") {
      setDataInfor({
        ...dataInfor,
        perWardId: data.e
      });
    } else {
      setDataInfor({
        ...dataInfor,
        currWardId: data.e
      });
    }
  };

  const getListDistrict = async (data: any) => {
    dispatch({ type: SET_LOADING, loading: true });
    const res = await getDistrict(data.e);
    if (res && res.length > 0) {
      if (data.key === "permanent") {
        setListDistrict(res);
      } else {
        setListDistrictTem(res);
      }
    }
    dispatch({ type: SET_LOADING, loading: false });
  };

  const getListWard = async (data: any) => {
    dispatch({ type: SET_LOADING, loading: true });
    const res = await getWard(data.e);
    if (res) {
      if (data.key === "permanent") {
        setListWard(res);
      } else {
        setListWardTem(res);
      }
    }
    dispatch({ type: SET_LOADING, loading: false });
  };

  const changeAddressTem = (event: any) => {
    setSampleAddress(event.target.checked);
    if (event.target.checked) {
      setListDistrictTem(listDistrict);
      setListWardTem(listWard);
      setDataInfor({
        ...dataInfor,
        currProvinceId: dataInfor.perProvinceId,
        currDistrictId: dataInfor.perDistrictId,
        currWardId: dataInfor.perWardId,
        currStreet: dataInfor.perStreet
      });
    }
  };

  const submit = async () => {
    const newData = {
      ...dataInfor,
      jobSalary: Number(dataInfor.jobSalary),
      phoneNumber: Number(dataInfor.phoneNumber),
      currProvinceId: Number(dataInfor.currProvinceId),
      currDistrictId: Number(dataInfor.currDistrictId),
      currWardId: Number(dataInfor.currWardId),
      perProvinceId: Number(dataInfor.perProvinceId),
      perDistrictId: Number(dataInfor.perDistrictId),
      perWardId: Number(dataInfor.perWardId)
    };
    dispatch({ type: SET_LOADING, loading: true });
    const res = await updateCustomerOverral({
      ...newData,
      customerId: init_data.customerId,
      dob: changeStringToDate(newData.dob),
      identityIssueDate: changeStringToDate(newData.identityIssueDate)
    });
    dispatch({ type: SET_LOADING, loading: false });
    if (res) {
      dispatch({
        type: UPDATE_INFORMATION,
        inforCustomer: newData
      });
      dispatch({
        type: CHECK_ADDRESS,
        checkAddress: {
          isCheck: sampleAddress
        }
      });
      onChangeScreen(2);
    }
  };

  return (
    <Grid container>
      <form
        name="login"
        // onSubmit={handleSubmit(submit)}
        className={classes.form}
      >
        <DropdownComponent title="Thông tin cá nhân">
          <Grid container spacing={2} className={classes.blTab}>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="gender"
                type="radio"
                fullWidth
                placeholder="Giới tính"
                label="Giới tính"
                validate={register({
                  required: false
                })}
                options={arrGender}
                error={errors.gender}
                value={dataInfor.gender}
                changeHandler={e => onChangeNumber({ e: e, key: "gender" })}
              />
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="identityType"
                type="select"
                fullWidth
                placeholder="Loại giấy tờ"
                label="Loại giấy tờ"
                validate={register({
                  required: false
                })}
                options={[{ id: 1, name: "CMND" }, { id: 2, name: "CCCD" }]}
                error={errors.identityType}
                value={dataInfor.identityType}
                changeHandler={e => onChange({ e: e, key: "identityType" })}
              />
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="identityIssuePlace"
                type="text"
                fullWidth
                placeholder="Nơi cấp"
                label="Nơi cấp"
                validate={register({
                  required: false
                })}
                error={errors.identityIssuePlace}
                value={dataInfor.identityIssuePlace}
                changeHandler={e =>
                  onChange({ e: e, key: "identityIssuePlace" })
                }
              />
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="identityNumber"
                type="text"
                fullWidth
                placeholder="CMND/CCCD"
                label="CMND/CCCD"
                validate={register({
                  required: false
                })}
                error={errors.identityNumber}
                value={dataInfor.identityNumber}
                changeHandler={e => onChange({ e: e, key: "identityNumber" })}
              />
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="lastName"
                type="text"
                fullWidth
                placeholder="Họ"
                label="Họ"
                validate={register({
                  required: false
                })}
                error={errors.lastName}
                value={dataInfor.lastName}
                changeHandler={e => onChange({ e: e, key: "lastName" })}
              />
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="midName"
                type="text"
                fullWidth
                placeholder="Tên đệm"
                label="Tên đệm"
                validate={register({
                  required: false
                })}
                error={errors.midName}
                value={dataInfor.midName}
                changeHandler={e => onChange({ e: e, key: "midName" })}
              />
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="firstName"
                type="text"
                fullWidth
                placeholder="Tên"
                label="Tên"
                validate={register({
                  required: false
                })}
                error={errors.firstName}
                value={dataInfor.firstName}
                changeHandler={e => onChange({ e: e, key: "firstName" })}
              />
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="phoneNumber"
                type="number"
                fullWidth
                placeholder="Số điện thoại"
                label="Số điện thoại"
                validate={register({
                  required: false
                })}
                error={errors.phoneNumber}
                value={dataInfor.phoneNumber}
                changeHandler={e => onChange({ e: e, key: "phoneNumber" })}
              />
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="dob"
                value={dataInfor.dob || changeDayToString(today)}
                type="date"
                fullWidth
                placeholder="Ngày sinh"
                label="Ngày sinh"
                validate={register({
                  required: false
                })}
                error={errors.dob}
                changeHandler={e => onChangeDay({ e: e, key: "dob" })}
              />
            </Grid>

            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="identityIssueDate"
                value={dataInfor.identityIssueDate || changeDayToString(today)}
                type="date"
                fullWidth
                placeholder="Ngày cấp"
                label="Ngày cấp"
                validate={register({
                  required: false
                })}
                error={errors.identityIssueDate}
                changeHandler={e =>
                  onChangeDay({ e: e, key: "identityIssueDate" })
                }
              />
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="jobSalary"
                type="number"
                fullWidth
                placeholder="Thu nhập"
                label="Thu nhập"
                validate={register({
                  required: false
                })}
                error={errors.jobSalary}
                value={dataInfor.jobSalary}
                keyMoney={true}
                changeHandler={e => onChange({ e: e, key: "jobSalary" })}
              />
              {errors.jobSalary && errors.jobSalary.type === "required" && (
                <ErrorMessage>Vui lòng điền thu nhập</ErrorMessage>
              )}
            </Grid>
            {/* <Grid item lg={4} md={4} xs={12}>
              <Input
                name="grProduct"
                type="select"
                fullWidth
                placeholder="Nhóm sản phẩm"
                label="Nhóm sản phẩm"
                validate={register({
                  required: false,
                })}
                options={[{ name: "Iphone 11" }, { name: "Iphone 12" }]}
                // error={errors.grProduct}
                // changeHandler={(e) => onChange(e)}
              />
            </Grid> */}
          </Grid>
        </DropdownComponent>

        <DropdownComponent title="Địa chỉ thường chú">
          <Grid container spacing={2} className={classes.blTab}>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="perProvinceId"
                type="select"
                fullWidth
                placeholder="Tỉnh/Thành phố"
                label="Tỉnh/Thành phố"
                validate={register({
                  required: false
                })}
                options={[
                  { id: "", name: "-- Vui lòng chọn tỉnh thành --" },
                  ...listProvince
                ]}
                error={errors.perProvinceId}
                changeHandler={e =>
                  onChangeProvince({ e: e, key: "permanent" })
                }
                value={dataInfor.perProvinceId}
              />
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="perDistrictId"
                type="select"
                fullWidth
                placeholder="Quận/Huyện"
                label="Quận/Huyện"
                validate={register({
                  required: false
                })}
                options={[
                  { id: "", name: "-- Vui lòng chọn quận huyện --" },
                  ...listDistrict
                ]}
                error={errors.perDistrictId}
                value={dataInfor.perDistrictId}
                changeHandler={e =>
                  onChangeDistrict({ e: e, key: "permanent" })
                }
              />
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="perWardId"
                type="select"
                fullWidth
                placeholder="Phường/Xã"
                label="Phường/Xã"
                validate={register({
                  required: false
                })}
                options={[
                  { id: "", name: "-- Vui lòng chọn phường xã --" },
                  ...listWard
                ]}
                changeHandler={e => onChangeWard({ e: e, key: "permanent" })}
                error={errors.perWardId}
                value={dataInfor.perWardId}
              />
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="perStreet"
                type="text"
                fullWidth
                placeholder="Đường phố"
                label="Đường phố"
                validate={register({
                  required: false
                })}
                error={errors.perStreet}
                value={dataInfor.perStreet}
                changeHandler={e => onChange({ e: e, key: "perStreet" })}
              />
            </Grid>
          </Grid>
        </DropdownComponent>

        <DropdownComponent title="Địa chỉ tạm chú">
          <Box className={classes.blSwitch} onChange={e => changeAddressTem(e)}>
            <Box>Giống với địa chỉ thường chú</Box>
            <Switch defaultChecked={sampleAddress} />
          </Box>
          <Grid container spacing={2} className={classes.blTab}>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="currProvinceId"
                type="select"
                fullWidth
                placeholder="Tỉnh/Thành phố"
                label="Tỉnh/Thành phố"
                validate={register({
                  required: false
                })}
                options={[
                  { id: "", name: "-- Vui lòng chọn tỉnh thành --" },
                  ...listProvince
                ]}
                disabled={sampleAddress}
                error={errors.currProvinceId}
                value={dataInfor.currProvinceId}
                changeHandler={e =>
                  onChangeProvince({ e: e, key: "temporary" })
                }
              />
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="currDistrictId"
                type="select"
                fullWidth
                placeholder="Quận/Huyện"
                label="Quận/Huyện"
                validate={register({
                  required: false
                })}
                options={[
                  { id: "", name: "-- Vui lòng chọn quận huyện --" },
                  ...listDistrictTem
                ]}
                disabled={sampleAddress}
                error={errors.currDistrictId}
                value={dataInfor.currDistrictId}
                changeHandler={e =>
                  onChangeDistrict({ e: e, key: "temporary" })
                }
              />
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="currWardId"
                type="select"
                fullWidth
                placeholder="Phường/Xã"
                label="Phường/Xã"
                validate={register({
                  required: false
                })}
                disabled={sampleAddress}
                options={[
                  { id: "", name: "-- Vui lòng chọn phường xã --" },
                  ...listWardTem
                ]}
                error={errors.currWardId}
                value={dataInfor.currWardId}
                changeHandler={e => onChangeWard({ e: e, key: "temporary" })}
              />
              {errors.currWardId && errors.currWardId.type === "required" && (
                <ErrorMessage>Vui lòng chọn phường, xã</ErrorMessage>
              )}
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Input
                name="currStreet"
                type="text"
                fullWidth
                placeholder="Đường phố"
                label="Đường phố"
                validate={register({
                  required: false
                })}
                error={errors.currStreet}
                disabled={sampleAddress}
                value={dataInfor.currStreet}
                changeHandler={e => onChange({ e: e, key: "currStreet" })}
              />
            </Grid>
          </Grid>
        </DropdownComponent>

        <Box className={clsx(classes.alignCenter, classes.mrTop15)}>
          <ButtonFooter
            // type="submit"
            title="Tiếp tục"
            disabled={!isCheckSubmit}
            onClick={submit}
          />
        </Box>
      </form>
    </Grid>
  );
};

export default connect(mapStateToProps)(Screen1);
