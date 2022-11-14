import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '10px',
    },
    title: {},
    listHistory: {
      backgroundColor: '#fff',
      boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
      borderRadius: '15px',
    },
    itemHistory: {
      padding: '10px',
    },
    itemHistory_left: {},
    item: {
      display: 'flex',
      padding: '10px 0px',
      alignItems: 'center',
      '& img': {
        width: '24px',
        height: '24px',
        marginRight: '10px',
      }
    }
  })
)

export default useStyles;