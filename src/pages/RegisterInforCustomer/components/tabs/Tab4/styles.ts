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
    titleInsurance: {
      fontWeight: 'bold',
      color: '#F08300',
    },
    fontBold: {
      fontWeight: 'bold',
    },
    blLoan: {
      border: '0.5px solid rgba(132, 151, 166, 0.5)',
      borderRadius: '5px',
    },
    textLoan: {
      padding: '5px 10px',
    },
    w50: {
      width: '50%',
    },
    blTable: {
      fontSize: '12px',
      wisth: '100%',
      backgroundColor: '#fff',
      marginTop: '10px',
      '& table': {
        width: '100%',
      },
      '& th': {
        width: '25%',
        textAlign: 'center',
        padding: '5px',
        border: '0.5px solid #f5f5f5'
      },
      '& td': {
        width: '25%',
        textAlign: 'center',
        padding: '5px',
        border: '0.5px solid #f5f5f5'
      }
    },
    blTab: {
      marginTop: '15px',
      '& .MuiGrid-item': {
        padding: '0 8px !important',
      }
    },
    blImg: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      borderRadius: '5px',
      padding: '10px 10px',
      alignItems: 'center',
    },
    blImgLeft: {
      display: 'flex',
      alignItems: 'center',
    },
    iconCheckImg: {
      width: '16px',
      height: '16px',
      borderRadius: '16px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid #4BA570',
      marginRight: '10px',
      '& svg': {
        color: '#4BA570',
        fontWeight: 'bold',
        fontSize: '16px',
      }
    },
    blImgRight: {
      width: '60px',
      height: '36px',
      borderRadius: '6px',
      backgroundColor: '#666',
    },
    textImg: {
      fontSize: '12px',
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
