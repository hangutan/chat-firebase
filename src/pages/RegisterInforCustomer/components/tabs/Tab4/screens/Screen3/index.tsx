import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import clsx from "clsx";

import styles from "../../styles";

import useForm from "react-hook-form";
import ErrorMessage from "components/ErrorMessage";
import Input from "components/Input";

import ButtonFooter from "pages/RegisterInforCustomer/components/ButtonFooter";

export interface Screen3Props {
  onChangeScreen?: (index: number) => void;
  moveTab?: () => void;
}

const Screen3 = (props: Screen3Props) => {
  const classes = styles();
  const { onChangeScreen, moveTab } = props;

  const { register, errors, handleSubmit } = useForm();

  const onChange = (e: any) => {};

  const submit = (data: any, e: any) => {
    e.preventDefault();
    onChangeScreen(2);
  };
  return (
    <Box>
      <Typography variant="h5" className={classes.title}>
        Thông tin nghề nghiệp
      </Typography>
      <Grid container spacing={2} className={classes.blTab}>
        <Grid item lg={4} md={4} xs={12}>
          <Input
            name="works"
            type="select"
            fullWidth
            placeholder="Công việc"
            label="Công việc"
            validate={register({
              required: true,
            })}
            options={[{ label: "IT" }, { label: "Thợ hồ" }]}
            error={errors.works}
            changeHandler={(e) => onChange(e)}
          />
          {errors.works && errors.works.type === "required" && (
            <ErrorMessage>Vui lòng chọn công việc</ErrorMessage>
          )}
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <Input
            name="company"
            type="text"
            fullWidth
            placeholder="Tên công ty"
            label="Tên công ty"
            validate={register({
              required: true,
            })}
            error={errors.company}
            // value={dealer.podName}
            changeHandler={(e) => onChange(e)}
          />
          {errors.company && errors.company.type === "required" && (
            <ErrorMessage>Vui lòng điền tên công ty</ErrorMessage>
          )}
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <Input
            name="numberYear"
            type="number"
            fullWidth
            placeholder="Số năm kinh nghiệm"
            label="Số năm kinh nghiệm"
            validate={register({
              required: true,
            })}
            error={errors.numberYear}
            // value={dealer.podName}
            changeHandler={(e) => onChange(e)}
          />
          {errors.numberYear && errors.numberYear.type === "required" && (
            <ErrorMessage>Vui lòng chọn số năm</ErrorMessage>
          )}
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <Input
            name="numberMonth"
            type="number"
            fullWidth
            placeholder="Số tháng kinh nghiệm"
            label="Số tháng kinh nghiệm"
            validate={register({
              required: true,
            })}
            error={errors.numberMonth}
            // value={dealer.podName}
            changeHandler={(e) => onChange(e)}
          />
          {errors.numberMonth && errors.numberMonth.type === "required" && (
            <ErrorMessage>Vui lòng chọn số tháng</ErrorMessage>
          )}
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <Input
            name="position"
            type="text"
            fullWidth
            placeholder="Chức vụ"
            label="Chức vụ"
            validate={register({
              required: true,
            })}
            error={errors.position}
            // value={dealer.podName}
            changeHandler={(e) => onChange(e)}
          />
          {errors.position && errors.position.type === "required" && (
            <ErrorMessage>Vui lòng điền chức vụ</ErrorMessage>
          )}
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <Input
            name="typeContact"
            type="select"
            fullWidth
            placeholder="Loại hợp đồng"
            label="Loại hợp đồng"
            validate={register({
              required: true,
            })}
            options={[{ label: "Vô thời hạn" }, { label: "Có thời hạn" }]}
            error={errors.typeContact}
            changeHandler={(e) => onChange(e)}
          />
          {errors.typeContact && errors.typeContact.type === "required" && (
            <ErrorMessage>Vui lòng chọn loại hợp đồng</ErrorMessage>
          )}
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <Input
            name="wage"
            type="number"
            fullWidth
            placeholder="Lương"
            label="Lương"
            validate={register({
              required: true,
            })}
            error={errors.typeContact}
            changeHandler={(e) => onChange(e)}
          />
        </Grid>
      </Grid>
      <Box className={clsx(classes.flexCenter, classes.mrTop20)}>
        <Box>
          <ButtonFooter onClick={() => onChangeScreen(4)} />
        </Box>
      </Box>
    </Box>
  );
};

export default Screen3;
