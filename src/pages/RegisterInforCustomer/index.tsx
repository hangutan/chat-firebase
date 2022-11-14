import React, { useState, useEffect } from "react";
import styles from "./styles";
import Tabs from "./components/TabHeader";
import Box from "@material-ui/core/Box";

import HeaderBarSub from "components/HeaderBarSub";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { reducerType } from "redux/reducers";

import { push } from "connected-react-router";

import NotificationMessage from "components/NotificationMessage";
import { createBrowserHistory } from "history";

import { initApp } from "api/init";

import { UserReducer } from "redux/reducers/auth";
import { LogOCRReducer } from "redux/reducers/customer";

import { UPDATE_INIT_DATA } from "redux/reducers/init/actionTypes";

//component tabs
import Tab1 from "./components/tabs/Tab1";
import Tab2 from "./components/tabs/Tab2";
import Tab3 from "./components/tabs/Tab3";
import Tab4 from "./components/tabs/Tab4";

interface RegisterInforCustomerProps {
  dispatch: Dispatch;
  current_user: UserReducer;
  logOcr: LogOCRReducer;
}

const mapStateToProps = (state: reducerType) => {
  return {
    current_user: state.auth.current_user,
    logOcr: state.customer.logOcr,
  };
};

const TwlService = (props: RegisterInforCustomerProps) => {
  const { dispatch, current_user, logOcr } = props;
  const classes = styles();

  const history = createBrowserHistory();

  const [actTab, setActTab] = useState(1);
  const [actScreenTab1, setActScreenTab1] = useState(1);
  const [actScreenTab2, setActScreenTab2] = useState(1);
  const [actScreenTab3, setActScreenTab3] = useState(1);
  const [actScreenTab4, setActScreenTab4] = useState(1);

  useEffect(() => {
    initAppConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openUrl = (url) => {
    dispatch(push(url));
  };

  const onActiveTab = (index) => {
    setActTab(index + 1);
  };

  const initAppConfig = async () => {
    const res = await initApp({
      ocrId: logOcr.id,
      createdBy: current_user.salesCode,
    });
    dispatch({
      type: UPDATE_INIT_DATA,
      init_data: res,
    });
  };

  const onGoBack = () => {
    if (actTab === 1) {
      if (actScreenTab1 > 1) {
        setActScreenTab1(actScreenTab1 - 1);
      } else {
        history.goBack();
      }
    } else if (actTab === 2) {
      if (actScreenTab2 > 1) {
        setActScreenTab2(actScreenTab2 - 1);
      } else {
        setActTab(1);
      }
    } else if (actTab === 3) {
      if (actScreenTab3 > 1) {
        setActScreenTab3(actScreenTab3 - 1);
      } else {
        setActTab(2);
      }
    } else {
      if (actScreenTab4 > 1) {
        setActScreenTab4(actScreenTab4 - 1);
      } else {
        setActTab(3);
      }
    }
  };

  const setInndexScreeenTab = (index: number) => {
    if (actTab === 1) {
      setActScreenTab1(index);
    } else if (actTab === 2) {
      setActScreenTab2(index);
    } else if (actTab === 3) {
      setActScreenTab3(index);
    } else {
      setActScreenTab4(index);
    }
  };

  const renderTab = () => {
    if (actTab === 1)
      return (
        <Tab1
          onChangeTab={onActiveTab}
          idxScreen={actScreenTab1}
          setActScreen={setInndexScreeenTab}
        />
      );
    if (actTab === 2)
      return (
        <Tab2
          onChangeTab={onActiveTab}
          idxScreen={actScreenTab2}
          setActScreen={setInndexScreeenTab}
        />
      );
    if (actTab === 3)
      return (
        <Tab3
          onChangeTab={onActiveTab}
          idxScreen={actScreenTab3}
          setActScreen={setInndexScreeenTab}
        />
      );
    if (actTab === 4)
      return (
        <Tab4
          onChangeTab={onActiveTab}
          idxScreen={actScreenTab4}
          setActScreen={setInndexScreeenTab}
        />
      );
  };

  return (
    <Box className={classes.root}>
      <HeaderBarSub
        openUrl={openUrl}
        name="Đăng kí thông tin khách hàng"
        isGoBack={true}
        onGoBack={onGoBack}
      />
      <NotificationMessage />
      <Box>
        <Tabs activeTab={actTab} onActiveTab={onActiveTab} />
      </Box>
      <Box>{renderTab()}</Box>
    </Box>
  );
};

export default connect(mapStateToProps)(TwlService);
