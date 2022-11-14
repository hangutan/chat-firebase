import React from "react";

import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";

import CallIcon from "@material-ui/icons/Call";
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import styles from "./styles";

const arrTabs = [
  {
    name: "Contact",
    icon: <CallIcon />,
  },
  {
    name: "Person",
    icon: <PersonIcon />,
  },
  {
    name: "AddPerson",
    icon: <PersonAddIcon />,
  },
  {
    name: "Product",
    icon: <LocalGroceryStoreIcon />,
  },
];

export interface TabHeaderProps {
  activeTab?: number;
  onActiveTab?: (index: number) => void;
}

const Tabs = (props: TabHeaderProps) => {
  const { onActiveTab, activeTab } = props;
  const classes = styles();

  return (
    <Box className={classes.root}>
      <Box className={classes.tabContainer}>
        {arrTabs.map((item, index) => {
          return (
            <IconButton
              key={index}
              className={`${classes.btnIcon} ${
                activeTab >= index + 1 ? classes.active : ""
              }`}
              onClick={() => onActiveTab(index)}
            >
              {item.icon}
            </IconButton>
          );
        })}
      </Box>
    </Box>
  );
};

export default Tabs;
