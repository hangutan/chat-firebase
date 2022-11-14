import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 10
    },
    mrBt10: {
      marginBottom: "1rem"
    },
    alignCenter: {
      textAlign: "center"
    },
    blButton: {
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(240, 240, 240, 0.7)"
    },
    btnFooter: {
      padding: "0 1rem",
      display: "flex",
      alignItems: "center",
      margin: 10
    }
  })
);

export default useStyles;
