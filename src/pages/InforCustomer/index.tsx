import React from "react";
import { Box } from "@material-ui/core";
import clsx from "clsx";

import { push } from "connected-react-router";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { reducerType } from "redux/reducers";
import {
  InfoCustomerConvertReducer,
  CheckOcrReducer
} from "redux/reducers/customer";
import { InitDataReducer } from "redux/reducers/init";

import HeaderBarSub from "components/HeaderBarSub";
import History from "./components/History";
import Information from "./components/Information";
import DropdownComponent from "components/DropdownComponent";

import ButtonGroup from "@material-ui/core/ButtonGroup";
import SubmitButton from "components/Button";

import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

import styles from "./styles";

interface InforCustomerPageProps {
  dispatch: Dispatch;
  checkOcr: CheckOcrReducer;
  init_data: InitDataReducer;
  inforCustomer: InfoCustomerConvertReducer;
}

const mapStateToProps = (state: reducerType) => {
  return {
    inforCustomer: state.customer.inforCustomer,
    init_data: state.init.init_data,
    checkOcr: state.customer.checkOcr
  };
};

const InforCustomer = (props: InforCustomerPageProps) => {
  const { dispatch, inforCustomer, checkOcr, init_data } = props;
  const classes = styles();

  const openUrl = url => {
    dispatch(push(url));
  };

  return (
    <Box>
      <HeaderBarSub
        openUrl={openUrl}
        name="Thông tin khách hàng"
        isGoBack={true}
      />
      <Box className={classes.root}>
        <Box className={clsx(classes.mrBt10)}>
          <Information inforCustomer={inforCustomer} init_data={init_data} />
        </Box>
        {/* <Box className={classes.mrBt10}>
          <DropdownComponent title="History">
            <History />
          </DropdownComponent>
        </Box> */}
        <Box className={clsx(classes.alignCenter, classes.blButton)}>
          <ButtonGroup className={classes.btnFooter}>
            <SubmitButton onClick={() => openUrl("register-customer")}>
              Tiếp tục
              <ArrowRightAltIcon />
            </SubmitButton>
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default connect(mapStateToProps)(InforCustomer);
