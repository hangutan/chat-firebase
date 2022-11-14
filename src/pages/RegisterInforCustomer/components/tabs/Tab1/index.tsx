import React from "react";

import Box from "@material-ui/core/Box";

import Screen1 from "./screens/Screen1";
import Screen2 from "./screens/Screen2";

export interface Tab1Props {
  onChangeTab?: (index: number) => void;
  idxScreen: number;
  setActScreen?: (index: number) => void;
}

const Tab1 = (props: Tab1Props) => {
  const { onChangeTab, idxScreen, setActScreen } = props;

  const onChangeScreen = (index) => {
    setActScreen(index);
  };

  const moveTab = () => {
    onChangeTab(1);
  };

  const renderScreen = () => {
    if (idxScreen === 1) return <Screen1 onChangeScreen={onChangeScreen} />;
    else return <Screen2 onChangeScreen={onChangeScreen} moveTab={moveTab} />;
  };

  return <Box>{renderScreen()}</Box>;
};

export default Tab1;
