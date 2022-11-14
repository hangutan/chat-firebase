import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // padding: 10,
      paddingBottom: "10px",
      height: "100vh",
      backgroundColor: "#fff",
      "& .MuiGrid-container": {
        display: "block !important",
      },
    },
    blForm: {
      padding: 10,
    },
    form: {
      width: "100%",
    },
    title: {
      fontWeight: "bold",
      color: "#F08300",
      marginTop: "1rem",
    },
    contentTitle: {
      fontSize: "14px",
      marginTop: "5px",
      marginBottom: "15px",
      color: "#333",
    },
    btnLogin: {
      width: "100%",
      marginTop: "25px",
    },
    font600: {
      fontWeight: 600,
    },
    mrTop15: {
      marginTop: 15,
    },
    mrRight10: {
      marginRight: 10,
    },
  })
);

export default useStyles;
