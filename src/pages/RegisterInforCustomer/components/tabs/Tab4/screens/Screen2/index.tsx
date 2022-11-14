import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import clsx from "clsx";

import styles from "../../styles";

import useForm from "react-hook-form";
import ErrorMessage from "components/ErrorMessage";
import Input from "components/Input";

import ButtonFooter from "pages/RegisterInforCustomer/components/ButtonFooter";

export interface Screen2Props {
  onChangeScreen?: (index: number) => void;
  moveTab?: () => void;
}

const arrMarry = [
  {
    value: "1",
    label: "Độc thân",
  },
  {
    value: "2",
    label: "Đã có gia đình",
  },
];

const Screen2 = (props: Screen2Props) => {
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
        Thông tin cá nhân
      </Typography>
      <Grid container spacing={2} className={classes.blTab}>
        <Grid item lg={4} md={4} xs={12}>
          <Input
            name="marry"
            type="radio"
            fullWidth
            placeholder="Tình trạng hôn nhân"
            label="Tình trạng hôn nhân"
            validate={register({
              required: true,
            })}
            options={arrMarry}
            error={errors.marry}
            value={arrMarry[0].value}
            changeHandler={(e) => onChange(e)}
          />
          {errors.marry && errors.marry.type === "required" && (
            <ErrorMessage>Vui lòng chọn tình trạng hôn nhân</ErrorMessage>
          )}
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <Input
            name="papers"
            type="select"
            fullWidth
            placeholder="Chứng từ khác"
            label="Chứng từ khác"
            validate={register({
              required: true,
            })}
            options={[{ label: "CMND" }, { label: "CCCD" }]}
            error={errors.scheme}
            changeHandler={(e) => onChange(e)}
          />
          {errors.scheme && errors.scheme.type === "required" && (
            <ErrorMessage>Vui lòng chọn loại chứng từ</ErrorMessage>
          )}
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <Input
            name="numberPapers"
            type="text"
            fullWidth
            placeholder="Số chứng từ"
            label="Số chứng từ"
            validate={register({
              required: true,
            })}
            error={errors.numberPapers}
            // value={dealer.podName}
            changeHandler={(e) => onChange(e)}
          />
          {errors.numberPapers && errors.numberPapers.type === "required" && (
            <ErrorMessage>Vui lòng điền số chứng từ</ErrorMessage>
          )}
        </Grid>
      </Grid>

      <Box className={clsx(classes.flexCenter, classes.mrTop20)}>
        <Box>
          <ButtonFooter onClick={() => onChangeScreen(3)} />
        </Box>
      </Box>
    </Box>
  );
};

export default Screen2;
