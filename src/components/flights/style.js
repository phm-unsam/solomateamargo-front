import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { yellow } from '@material-ui/core/colors';

export const useStyles = makeStyles(theme => ({


  buttonAgregarCarrito: {
    margin: 5,

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
