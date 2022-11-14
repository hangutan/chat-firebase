import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 10,
    },
    btnCheck: {
      padding: "0 2rem",
    },
    form: {
      // width: "100%",
    },
    title: {
      fontWeight: "bold",
      color: "#043B72",
    },

    tab: {
      padding: "0.5rem",
      borderRadius: "1rem",
      // backgroundColor: "#fafafa",
      grap: 10,
      display: "block",
      textAlign: "center",
    },

    textCenter: {
      textAlign: "center",
      // [theme.breakpoints.down("xs")]: {
      //   textAlign: "center",
      // },
    },
    textCenterXs: {
      width: "100%",
      [theme.breakpoints.down("md")]: {
        textAlign: "center",
      },
    },

    mTop10: {
      marginTop: 10,
    },
    mBt15: {
      marginBottom: 15,
    },
    mTop15: {
      marginTop: 15,
    },
    mrTop20: {
      marginTop: 20,
    },
    mLeft10: {
      marginLeft: 10,
    },
    blockFlex: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    //tab2
    fileUpload: {
      width: "100%",
      minHeight: "250px",
      backgroundColor: "#fff",
      border: "1px solid #d9d9d9",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    imgUpload: {
      position: "absolute",
      width: "100%",
      height: "100%",
      borderRadius: "20px",
    },
    contentFile: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      "& button": {
        backgroundColor: "#CFCFCF",
      },
      "& p": {
        color: "#8497A6",
      },
    },
    iconFileload: {
      "& svg": {
        fontSize: "2.5rem",
        color: "#8497A6",
      },
    },
    blSwitch: {
      paddingTop: 15,
      paddingBottom: 15,
      display: "flex",
      justifyContent: "flex-end",
    },
    displayNone: {
      display: "none",
    },
    textBtn: {
      paddingRight: '5px',
    },
    tabOCA: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginTop: '1rem',
    }
  })
);

export default useStyles;
