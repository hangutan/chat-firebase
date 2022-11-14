import React from "react";
import GridFullHeight from "components/GridFullHeight";
import loading from "asset/img/loading.svg";
import styles from "./styles";

const Loading = () => {
  const classes = styles();
  return (
    <GridFullHeight
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <img
        width={50}
        height={50}
        src={loading}
        alt="loading"
        className={classes.icon_loading}
      />
    </GridFullHeight>
  );
};

export default Loading;
