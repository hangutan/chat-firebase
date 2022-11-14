import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "1rem",
      marginBottom: "0.5rem",
    },
    tabContainer: {
      width: "70%",
      display: "flex",
      justifyContent: "space-between",
      // backgroundColor: "#D9D9D9",
      borderRadius: "20px",
      margin: "0 10px",
      // [theme.breakpoints.between("sm", "md")]: {
      //   width: "50%",
      // },
      [theme.breakpoints.up("sm")]: {
        width: "55%",
      },
      [theme.breakpoints.up("md")]: {
        width: "45%",
      },
    },
    btnIcon: {
      position: "relative",
      backgroundColor: "#E8EDF2",
      zIndex: 1000,
      "&:hover": {
        backgroundColor: "#E8EDF2",
      },
      "&:before": {
        content: "''",
        position: "absolute",
        width: "140%",
        height: "5px",
        backgroundColor: "#E8EDF2",
        left: "100%",
        zIndex: 1,
        [theme.breakpoints.up("md")]: {
          width: "230%",
        },
        [theme.breakpoints.between("sm", "md")]: {
          width: "170%",
        },
      },
      "&:last-child:before": {
        content: "''",
        width: 0,
      },
      "& svg": {
        fontSize: "1.5rem",
        [theme.breakpoints.up("sm")]: {
          fontSize: "2.1rem",
        },
      },
    },
    active: {
      color: "white",
      backgroundColor: "#00589B",
      "&:before": {
        backgroundColor: "#00589B",
      },
    },
  })
);

export default useStyles;
