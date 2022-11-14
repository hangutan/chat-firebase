import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tab: {
      width: '25%',
      backgroundColor: '#f08300',
      display: 'flex',
      borderRadius: '6px',
      padding: '10px',
      [theme.breakpoints.between("sm", "md")]: {
        width: '33.33%',
      },
      [theme.breakpoints.between("xs", "sm")]: {
        width: '50%',
      },
      [theme.breakpoints.only("xs")]: {
        width: '90%',
      },
    },
    btnTab: {
      width: '50%',
      textAlign: 'center',
      color: '#fff',
      fontWeight: 'bold',
      cursor: 'pointer',
      "&:active": {
        color: 'red',
      }
    },
    borderTab: {
      borderRight: '2px solid #fff',
    }
  })
)

export default useStyles;