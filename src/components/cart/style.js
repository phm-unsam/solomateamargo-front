import { makeStyles, withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
export const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
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
    margin5: {
      margin: 5,
    }
  }));
  
  export const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
 export const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

