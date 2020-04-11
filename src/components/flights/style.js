import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { yellow } from '@material-ui/core/colors';
import TableCell from '@material-ui/core/TableCell';

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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
  margin5: {
    margin: 5,
  }
}));

export const ColorButton = withStyles(theme => ({
  root: {
    color: yellow[50],
    backgroundColor: yellow[700],
    '&:hover': {
      backgroundColor: yellow[800],
    },
  },
}))(Button);

export const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
