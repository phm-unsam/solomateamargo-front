import { makeStyles, } from '@material-ui/core/styles';
export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    margin: {
      margin: theme.spacing(1),
    },
    table: {
      minWidth: 700
    },
    buttonAgregarCarrito: {
      margin: 5,
      minWidth: 500
    },
    marginCard: {
      margin: 30,
    }
  }));



