import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //padding: 10,
      position: "relative",
      paddingBottom: 100,
      // height: "100vh",
    },
    title: {
      fontSize: 14,
      color: "#472F92",
      "& a": {
        color: "#472F92",
        "-webkit-user-drag": "none",
        "-webkit-tap-highlight-color": "transparent",
        textDecoration: "underline",
        cursor: "pointer",
        "&:active": {
          backgroundColor: "unset",
          color: "#472F92",
        },
        "&:hover": {
          backgroundColor: "unset",
          color: "#472F92",
        },
      },
    },
    font600: {
      fontWeight: 600,
    },
  })
);

export default useStyles;
