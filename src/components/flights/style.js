import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles(theme => ({
  root: {
    width: "50%",
    margin: 5
  },
  margin:{
    margin:25
  },
  marginShort:{
    margin:10
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems:"center"
  },
  column : {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row"
  },
  cardWrapper: {
    margin: 25,
    display: "flex",
    flexDirection: "row"
  },
  contentWrapper:{
    display: "block",
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
