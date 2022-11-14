import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    form: {
      width: '100%',
      padding: '10px',
    },
    blTabNoPadding: {
      '& .MuiGrid-item': {
        padding: '0 !important',
      }
    },
    blTab: {
      // backgroundColor: '#fff',
      // borderRadius: '15px',
      // padding: '2px 2px 10px 2px',
      marginBottom: '1rem',
      marginTop: '0.4rem',
      '& .MuiGrid-item': {
        padding: '0 8px !important',
      }
    },
    blBtn: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    btnAdd: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#F08300',
      border: '1px solid #F08300',
      fontWeight: 'bold',
      borderRadius: '6px',
      padding: '5px 10px',
      marginRight: '10px',
    },
    btnSearch: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      backgroundColor: '#F08300',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '6px',
      padding: '5px 10px',
    },
    listProduct: {
      marginTop: '20px',
      maxHeight: '250px',
      overflow: 'auto',
      [theme.breakpoints.up("sm")]: {
        maxHeight: '450px',
      },
      "&::-webkit-scrollbar": {
        display: "none",
      }
    },
    itemProduct: {
      backgroundColor: '#FFFFFF',
      borderRadius: '5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 5,
    },
    nameCheck: {
      paddingLeft: '10px',
      width: "300px",
      whiteSpace: 'nowrap',
      overflow: "hidden",
      textOverflow: "ellipsis",
      textTransform: 'capitalize',
    },
    blCheck: {
      display: 'flex',
      alignItems: "center",
      justifyContent: 'flex-end',
    },
    mrTop20: {
      marginTop: '20px',
    },
    alignCenter: {
      textAlign: 'center',
    },
    mrRight10: {
      marginRight: '10px',
    },
    flexCenter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
  })
)

export default useStyles;
