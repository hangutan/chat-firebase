import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 10,
    },
    form: {
      width: '100%',
      padding: '10px',
    },
    form1: {
      width: '100%'
    },
    blTab: {
    //   backgroundColor: '#fff',
    //   borderRadius: '15px',
    //   padding: '2px',
      marginBottom: '1rem',
      marginTop: '5px',
      '& .MuiGrid-item': {
        padding: '0 8px !important',
      }
    },

    blSwitch: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginRight: '-10px',
      '& p': {
        fontSize: '14px',
      }
    },
    alignCenter: {
      textAlign: 'center',
    },
    mrTop15: {
      marginTop: '15px',
    },
    mrRight10: {
      marginRight: '10px',
    },
    flexCenter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    addRelationship: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      fontSize: '14px',
      cursor: 'pointer',
      marginBottom: '0.5rem',
      marginTop: '0.5rem',
    },
    iconRelationShip: {
      color: '#F08300',
      fontSize: '14px',
      fontWeight: 'bold',
      marginLeft: 5,
    },
    displayNone: {
      display: "none",
    },
    w_50: {
      width: '50%',
    }
  })
)

export default useStyles;