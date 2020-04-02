import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';


export default makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    table: {
        display: 'inline'
    },
    margin5: {
        margin: 5,
    },
    img: {
      maxWidth: 350
    },
    clickedRow: {
      backgroundColor: blue
    }
}));


  