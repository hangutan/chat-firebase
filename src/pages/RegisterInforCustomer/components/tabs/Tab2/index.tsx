import React, { useEffect } from "react";

import Box from "@material-ui/core/Box";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { reducerType } from "redux/reducers";

import styles from "./styles";

import Screen1 from "./screens/Screen1";
import Screen2 from "./screens/Screen2";

export interface Tab2Props {
  onChangeTab?: (index: number) => void;
  idxScreen: number;
  setActScreen: (index: number) => void;
  // dispatch: Dispatch;
}

// const mapStateToProps = (state: reducerType) => {
//   return {
//   };
// };

const Tab2 = (props: Tab2Props) => {
  const { onChangeTab, idxScreen, setActScreen } = props;
  const classes = styles();

  const onChangeScreen = (index) => {
    setActScreen(index);
  };

  const moveTab = () => {
    onChangeTab(2);
  };

  const renderScreen = () => {
    if (idxScreen === 1) return <Screen1 onChangeScreen={onChangeScreen} />;
    else return <Screen2 onChangeScreen={onChangeScreen} moveTab={moveTab} />;
  };

  return <Box className={classes.root}>{renderScreen()}</Box>;
};

// export default connect(mapStateToProps)(Tab2);
export default Tab2;
