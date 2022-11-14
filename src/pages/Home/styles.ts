import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 10
    },
    blItem: {
      backgroundColor: "#fff",
      textAlign: "center",
      padding: "20px 0px",
      borderRadius: "6px",
      "& img": {
        width: 72,
        height: 72
      }
    },
    titleItem: {
      color: "#F08300",
      fontWeight: "bold",
      fontSize: 14
    },
    mrTop10: {
      marginTop: 10
    },
    flexCenter: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    btnLogout: {
      color: "#F08300",
      padding: "5px 10px",
      border: "1px solid #F08300",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold"
    }
  })
);

export default useStyles;
