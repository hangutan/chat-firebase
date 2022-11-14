import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import styles from "./styles";
import clsx from "clsx";
import { TrendingUpRounded } from "@material-ui/icons";

export interface DropdownCompProps {
  title?: string;
  children?: any;
}

const DropdownComponent = (props: DropdownCompProps) => {
  const classes = styles();
  const { title, children } = props;
  const [isOpen, setIsOpen] = useState(true);

  const toggleComponent = () => {
    setIsOpen(!isOpen);
  };

  const renderButton = () => {
    if (isOpen) return <ExpandLessIcon />;
    else return <ExpandMoreIcon />;
  };

  return (
    <Box className={classes.root}>
      <Box
        className={`${
          isOpen ? clsx(classes.blHeader, classes.pdBt0) : classes.blHeader
        }`}
      >
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
        <IconButton onClick={toggleComponent} className={classes.btnIcon}>
          {renderButton()}
        </IconButton>
      </Box>
      <Box
        className={`${
          isOpen ? clsx(classes.blContent, classes.isOpen) : classes.blContent
        }`}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DropdownComponent;
