import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "fixed",
      height: "100%",
      zIndex: 1000,
      //     content: "";
      // display: inline-block;
      // height: 100%;
      // width: 1%;
      // vertical-align: middle;
    },
    icon_loading: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
    },
  })
);

export default useStyles;
