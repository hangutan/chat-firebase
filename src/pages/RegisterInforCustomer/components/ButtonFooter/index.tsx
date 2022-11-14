import React from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import SubmitButton from "components/Button";

import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import styles from "./styles";

import imgLoading from "asset/img/loading.gif";

export interface ButtonFooterProps {
  title?: string;
  loading?: boolean;
  onClick?: () => void;
  type?: string;
  disabled?: boolean;
}

const ButtonFooter = (props: ButtonFooterProps) => {
  const { title, loading, onClick, type, disabled } = props;
  const classes = styles();

  const renderButtonDefault = () => {
    return (
      <ButtonGroup className={classes.root}>
        <SubmitButton
          className={classes.btnCheck}
          disabled={disabled}
          onClick={onClick}
        >
          {loading ? (
            <img alt="loading" src={imgLoading} width="30px" />
          ) : title ? (
            title
          ) : (
            "Tiếp tục"
          )}
          <ArrowRightAltIcon />
        </SubmitButton>
      </ButtonGroup>
    );
  };

  const renderButtonSubmit = () => {
    return (
      <ButtonGroup>
        <SubmitButton
          className={classes.btnCheck}
          disabled={loading}
          type="submit"
        >
          {loading ? (
            <img alt="loading" src={imgLoading} width="30px" />
          ) : title ? (
            title
          ) : (
            "Tiếp tục"
          )}
          <ArrowRightAltIcon />
        </SubmitButton>
      </ButtonGroup>
    );
  };

  const renderButtonBack = () => {
    return (
      <ButtonGroup>
        <SubmitButton
          className={classes.btnCheck}
          disabled={loading}
          onClick={onClick}
        >
          <KeyboardBackspaceIcon />
          {loading ? (
            <img alt="loading" src={imgLoading} width="30px" />
          ) : title ? (
            title
          ) : (
            "Quay lại"
          )}
        </SubmitButton>
      </ButtonGroup>
    );
  };

  const renderButton = () => {
    switch (type) {
      case "submit":
        return renderButtonSubmit();
      case "back":
        return renderButtonBack();
      default:
        return renderButtonDefault();
    }
  };
  return <>{renderButton()}</>;
};

export default ButtonFooter;
