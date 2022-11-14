import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    blItem: {
      position: "relative",
      background: "linear-gradient(186.77deg, #00589B -2.75%, #174579 99.27%)",
      color: "white",
      borderRadius: 9
    },
    iconArrow: {
      position: "absolute",
      top: 0,
      right: 0,
      background: "rgba(41, 122, 190, 0.85)",
      height: "1.2rem",
      display: "flex",
      borderBottomLeftRadius: 9,
      borderTopRightRadius: 9,
      alignItems: "center",
      padding: "0 5px"
    },
    blContent: {
      padding: "10px 15px"
    },
    title: {
      fontSize: "1.4rem",
      fontWeight: "bold"
    },
    content: {
      fontSize: "1rem"
    }
  })
);

export default useStyles;
