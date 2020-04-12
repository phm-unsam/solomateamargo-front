import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles(theme => ({
  root: {
    minWidth: "50%",
    margin: 5
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems:"center"
  },
  cardWrapper: {
    margin: 25,
    display: "flex",
    flexDirection: "row"
  }
}));

export const ColorButton = withStyles(theme => ({
  root: {
    color: grey[50],
    backgroundColor: grey[700],
    '&:hover': {
      backgroundColor: grey[800],
    },
  },
}))(Button);
