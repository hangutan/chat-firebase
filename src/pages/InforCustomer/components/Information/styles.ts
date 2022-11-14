import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#fff",
      boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
      borderRadius: 6,
      padding: 10
    },
    blItem: {
      display: "flex",
      flexWrap: "wrap",
      padding: "5px 0"
    },
    item: {
      minWidth: "50%",
      display: "inline-block"
    },
    title: {
      color: "#00589B",
      fontWeight: "bold"
    },
    itemTitle: {
      fontWeight: "bold",
      color: "#454749",
      paddingBottom: "10px!important"
    },
    pdTop10: {
      paddingTop: 10
    },
    mrTop10: {
      marginTop: 10
    }
  })
);

export default useStyles;
