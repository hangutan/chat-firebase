import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '10px',
    },
    title: {
      fontWeight: "bold",
      color: "#043B72",
    },
    blBtn: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#F08300',
      color: '#fff',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '6px',
      padding: '4px 12px',
    },
    detailPro: {
      backgroundColor: '#fff',
      borderRadius: '6px',
      marginTop: '10px',
      padding: '10px',
    },
    itemProduct: {
      display: 'flex',
      padding: '10px 0'
    },
    titleItem: {
      fontWeight: 'bold',
      width: '50%',
    },
    blTab: {
      marginBottom: '10px',
      '& .MuiGrid-item': {
        padding: '0 8px !important',
      }
    },

    itemPro: {
      backgroundColor: '#fff',
      borderRadius: '5px',
      padding: '15px 10px',
      position: 'relative',
    },
    titlePro: {
      fontWeight: 'bold',
      fontSize: '14px',
    },
    totalPro: {
      marginTop: '10px',
      display: 'flex',
      justifyContent: 'space-between',
    },
    iconCheck: {
      top: '10px',
      width: '15px',
      right: '10px',
      color: '#fff',
      height: '15px',
      display: 'flex',
      position: 'absolute',
      borderRadius: '15px',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#33CC33',
      '& svg': {
        fontSize: '12px',
        fontWeight: 'bold',
      }

    },
    totalPrice: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      borderRadius: '6px',
      padding: '15px 10px',
    },
    mrTop10: {
      marginTop: '10px',
    },
    mrTop15: {
      marginTop: '15px',
    },
    flexBox: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    w50: {
      width: '50%',
    },
    firstDay: {
      backgroundColor: '#fff',
      borderRadius: '6px',
      padding: '15px 10px',
    },
    checkSwitch: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    insurance: {
      backgroundColor: '#fff',
      padding: '15px 10px',
      borderRadius: '6px',
    },
    titleInsurance: {
      fontWeight: 'bold',
      color: '#F08300',
    },
    fontBold: {
      fontWeight: 'bold',
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
    },
    mrTop20: {
      marginTop: '20px',
    }
  })
)

export default useStyles;