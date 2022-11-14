import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 10
    },
    blItem: {
      background: "linear-gradient(186.77deg, #00589B -2.75%, #174579 99.27%)",
      color: "white",
      borderRadius: "6px"
    },
    tabItem: {
      display: "flex",
      background: "#f08300",
      borderRadius: 9,
      padding: "7px 15px",
      justifyContent: "space-between"
    },
    textItem: {
      fontSize: 16,
      fontWeight: 500,
      color: "white"
    },
    mrTop15: {
      marginTop: 15
    }
  })
);

export default useStyles;
