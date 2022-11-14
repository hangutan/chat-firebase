import React, { useState } from "react";

import Box from "@material-ui/core/Box";

import styles from "./styles";

import Screen1 from "./screens/Screen1";
import Screen2 from "./screens/Screen2";
import Screen3 from "./screens/Screen3";
import Screen4 from "./screens/Screen4";

export interface Tab2Props {
  idxScreen: number;
  onChangeTab?: (index: number) => void;
  setActScreen: (index: number) => void;
}

const Tab2 = (props: Tab2Props) => {
  const { onChangeTab, idxScreen, setActScreen } = props;
  const classes = styles();
  // const [isScreen, setIsScreen] = useState(1);

  const onChangeScreen = (index) => {
    setActScreen(index);
  };

  const moveTab = () => {
    onChangeTab(2);
  };

  const renderScreen = () => {
    if (idxScreen === 1) return <Screen1 onChangeScreen={onChangeScreen} />;
    else if (idxScreen === 2)
      return <Screen2 onChangeScreen={onChangeScreen} moveTab={moveTab} />;
    else if (idxScreen === 3)
      return <Screen3 onChangeScreen={onChangeScreen} moveTab={moveTab} />;
    else return <Screen4 onChangeScreen={onChangeScreen} moveTab={moveTab} />;
  };

  return <Box className={classes.root}>{renderScreen()}</Box>;
};

export default Tab2;
