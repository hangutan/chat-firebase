import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "transparent",
      borderRadius: 20,
      marginTop: "10px",
    },
    blHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      // padding: "1rem",
    },
    pdBt0: {
      paddingBottom: 0,
    },
    title: {
      fontWeight: "bold",
      color: "#043B72",
      // textDecoration: "underline",
    },
    blContent: {
      transition: "max-height 0.3s ease",
      display: "none",
    },
    isOpen: {
      display: "block",
      maxHeight: "100%",
    },
    btnIcon: {
      padding: 0,
      "& svg": {
        backgroundColor: "#043B72",
        borderRadius: "100%",
        color: "#fff",
      },
    },
  })
);

export default useStyles;
