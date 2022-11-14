import React, { useEffect } from "react";
import useToggle from "hooks/useToggle";
import StyledInput from "./components/StyledInput";
import InputContainer from "./components/InputContainer";
import EyeIcon from "./components/EyeIcon";
// import WarningIcon from './components/WarningIcon';
import QuestionIcon from "./components/QuestionIcon";
import Label from "./components/Label";
import Hint from "./components/Hint";
import Italic from "./components/Italic";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import styles from "./styles";
import Checkbox from "@material-ui/core/Checkbox";
import MdCheckboxOutline from "react-ionicons/lib/MdCheckboxOutline";
import NativeSelect from "@material-ui/core/NativeSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enforceFormat, formatToPhone } from "asset/javascripts/input_phone";
import TextField from "@material-ui/core/TextField";
import $ from "jquery";
import clsx from "clsx";
import Select from "react-select";
import AsyncSelect from "react-select/async";
// import 'react-select/dist/css/react-select.css';
import CalendarToday from "@material-ui/icons/CalendarToday";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import { formatNumber } from "common/helpers/parse";

interface InputProps {
  label?: string | any;
  type: string;
  fullWidth?: boolean | undefined;
  placeholder?: string;
  value?: any;
  changeHandler?: Function;
  name: string;
  validate?: any;
  error?: any;
  hint?: string;
  show_info?: boolean | undefined;
  required?: boolean | undefined;
  hide_label?: boolean | undefined;
  checked?: boolean | false;
  options?: any | [];
  disabled?: boolean | false;
  loadOptions?: Function;
  nameOption?: string;
  keyOption?: string;
  keyMoney?: boolean;
}

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "none",
    borderBottom: "1px solid #dddddd",
    boxShadow: "none"
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: "none"
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    paddingLeft: "0"
  })
};

const Input = React.memo((props: InputProps) => {
  let {
    label,
    type,
    fullWidth,
    placeholder,
    value,
    changeHandler,
    name,
    validate,
    // error,
    hint,
    show_info,
    required,
    hide_label,
    checked,
    options,
    disabled,
    loadOptions,
    nameOption,
    keyOption,
    keyMoney
  } = props;
  const classes = styles();
  const [isShowPassword, toggle] = useToggle(false);
  const renderType = (type: string) => {
    switch (type) {
      case "password":
        return isShowPassword ? "text" : "password";
      case "string":
        return "string";
      case "number":
        return "number";
      case "date":
        return "date";
      case "time":
        return "time";
      default:
        return "text";
    }
  };
  const [currentValue, setCurrentValue] = React.useState("");

  const checkbox = () => {
    return (
      <InputContainer className={classes.rootCheckbox}>
        {type === "checkbox" && (
          <FormControlLabel
            key={name}
            control={
              <Checkbox
                checkedIcon={
                  <MdCheckboxOutline color="#472F92" fontSize="26px" />
                }
                name={name}
                checked={checked}
                onChange={e => {
                  if (typeof changeHandler !== "function") return null;
                  changeHandler(e.target.checked);
                }}
              />
            }
            label={<Label className={classes.labelCheckbox}>{label}</Label>}
          />
        )}
      </InputContainer>
    );
  };

  const radio = () => {
    return (
      <InputContainer>
        {type === "radio" && (
          <FormControl>
            <Label>{label}</Label>
            <RadioGroup
              row
              aria-labelledby=""
              name={name}
              value={value}
              onChange={e => {
                if (typeof changeHandler !== "function") return null;
                changeHandler(e);
              }}
            >
              {options &&
                options.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    label={item.label}
                    control={<Radio />}
                    className={classes.labelRadio}
                  />
                ))}
            </RadioGroup>
          </FormControl>
        )}
      </InputContainer>
    );
  };

  const selectInput = () => {
    return (
      <React.Fragment>
        {type === "select" && options && (
          <>
            <Label>{label}</Label>
            <NativeSelect
              value={value}
              onChange={e => {
                if (typeof changeHandler !== "function") return null;
                changeHandler(e.target.value);
              }}
              disableUnderline
              disabled={disabled}
              name={name}
              inputRef={validate}
              className={classes.rootSelect}
              inputProps={{ "aria-label": name }}
              placeholder={placeholder}
            >
              {options &&
                options.map((obj, i) => (
                  <option key={i} value={obj.id}>
                    {obj.name}
                  </option>
                ))}
            </NativeSelect>
          </>
        )}
      </React.Fragment>
    );
  };

  const selectInputCustom = () => {
    return (
      <React.Fragment>
        {type === "selectcustom" && options && (
          <>
            <Label>{label}</Label>
            <NativeSelect
              value={value}
              onChange={e => {
                if (typeof changeHandler !== "function") return null;
                changeHandler(e.target.value);
              }}
              disableUnderline
              name={name}
              inputRef={validate}
              disabled={disabled}
              className={classes.rootSelect}
              inputProps={{ "aria-label": name }}
            >
              {options &&
                options.map((obj, i) => (
                  <option key={i} value={obj[keyOption]}>
                    {obj[nameOption]}
                  </option>
                ))}
            </NativeSelect>
          </>
        )}
      </React.Fragment>
    );
  };

  const select2Input = () => {
    return (
      <React.Fragment>
        {type === "select2" && options && (
          <>
            <Label>{label}</Label>
            <select
              value={value}
              onChange={e => {
                if (typeof changeHandler !== "function") return null;
                changeHandler(e);
              }}
              name={name}
              className={classes.rootSelect2}
              placeholder={placeholder}
              ref={validate}
              // styles={customStyles}
            >
              {options &&
                options.map((obj, i) => (
                  <option key={i} value={obj[keyOption]}>
                    {obj[nameOption]}
                  </option>
                ))}
            </select>
          </>
        )}
        {type === "select2async" && (
          <>
            <Label>{label}</Label>
            <AsyncSelect
              isMulti
              name={name}
              cacheOptions
              defaultOptions
              loadOptions={loadOptions}
              value={value}
              onChange={e => {
                if (typeof changeHandler !== "function") return null;
                changeHandler(e);
              }}
            />
          </>
        )}
      </React.Fragment>
    );
  };

  const normalInput = () => {
    return (
      <React.Fragment>
        <Label>
          {Boolean(required) && <Italic>* </Italic>}
          {Boolean(!hide_label) && label}
          {Boolean(show_info) && <QuestionIcon />}
        </Label>
        <InputContainer>
          {type === "textarea" ? (
            <TextareaAutosize
              className={classes.textarea}
              maxRows={5}
              minRows={5}
              onChange={e => {
                if (typeof changeHandler !== "function") return null;
                changeHandler(e);
              }}
              value={value}
              placeholder={placeholder}
              name={name}
              ref={validate}
            />
          ) : type === "phonenumber" ? (
            <TextField
              className={clsx(classes.rootInput, classes.inputPhone)}
              name={name}
              placeholder={placeholder}
              value={value}
              inputProps={{
                maxLength: "14"
              }}
              InputProps={{
                disableUnderline: true
              }}
              inputRef={validate}
              fullWidth={fullWidth}
              onChange={e => {
                setCurrentValue(e.target.value);
                if (typeof changeHandler !== "function") return null;
                changeHandler(e);
              }}
            />
          ) : type === "number" ? (
            <StyledInput
              name={name}
              type={keyMoney ? renderType("text") : renderType(type)}
              fullWidth={fullWidth}
              placeholder={placeholder}
              // error={Boolean(error)}
              inputProps={{
                maxLength: 10
              }}
              disabled={disabled}
              value={keyMoney ? formatNumber(value) : value}
              inputRef={validate}
              onChange={e => {
                setCurrentValue(e.target.value);
                if (typeof changeHandler !== "function") return null;
                changeHandler(e);
              }}
            />
          ) : (
            <>
              <StyledInput
                name={name}
                type={renderType(type)}
                fullWidth={fullWidth}
                placeholder={placeholder}
                // error={Boolean(error)}
                disabled={disabled}
                value={value}
                inputRef={validate}
                onChange={e => {
                  setCurrentValue(e.target.value);
                  if (typeof changeHandler !== "function") return null;
                  changeHandler(e);
                }}
              />
              {type === "password" && !!currentValue && (
                <EyeIcon clickHandler={toggle} isEyeClose={isShowPassword} />
              )}
              <Hint>{hint}</Hint>
            </>
          )}
        </InputContainer>
      </React.Fragment>
    );
  };

  const timePickerInput = () => {
    return (
      <>
        <Label>{label}</Label>
        <div className={classes.rootInput}>
          <DatePicker
            selected={value}
            onChange={e => {
              if (typeof changeHandler !== "function") return null;
              changeHandler(e);
            }}
            name={name}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={5}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </div>
      </>
    );
  };

  const datePickerInput = () => {
    const [day, month, year] = value.split("/");
    const date = new Date(+year, month - 1, +day);
    return (
      <>
        <Label>{label}</Label>
        <div className={classes.rootInput}>
          <DatePicker
            // selected={value}
            selected={date}
            onChange={e => {
              if (typeof changeHandler !== "function") return null;
              changeHandler(e);
            }}
            placeholderText={placeholder}
            name={name}
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </>
    );
  };

  const renderInput = () => {
    switch (type) {
      case "checkbox":
        return checkbox();
      case "select":
        return selectInput();
      case "selectcustom":
        return selectInputCustom();
      case "select2":
      case "select2async":
        return select2Input();
      case "time":
        return timePickerInput();
      case "date":
        return datePickerInput();
      case "radio":
        return radio();
      default:
        return normalInput();
    }
  };

  useEffect(() => {
    if (type === "phonenumber") {
      const inputElement = $(`input[name='${name}']`)[0];
      inputElement.addEventListener("keydown", enforceFormat);
      inputElement.addEventListener("keyup", formatToPhone);
    }
    // eslint-disable-next-line
  }, []);

  return <>{renderInput()}</>;
});

export default Input;
