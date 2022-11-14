import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    menuButton: {
      marginLeft: 0
    },
    containerHeader: {
      height: 44,
      minHeight: "unset",
      paddingLeft: 0
    },
    toolbar: {
      position: "fixed",
      top: 0,
      maxWidth: 1024,
      margin: "auto",
      background: "linear-gradient(186.77deg, #00589B -2.75%, #174579 99.27%)",
      color: "white"
    },
    title: {
      flexGrow: 1,
      textAlign: "center",
      fontSize: 20
    },
    iconphone: {
      marginRight: -15
    },
    fontAzonix: {
      fontFamily: "Halyard-Display, sans-serif",
      fontSize: 18
    },
    roomBtn: {
      padding: 0,
      color: "white"
    },
    fontSmall: {
      fontSize: 14
    }
  })
);

export default useStyles;
