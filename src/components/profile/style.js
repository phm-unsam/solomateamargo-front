import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%',
  
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    table: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    margin5: {
      margin: theme.spacing(1),
    },
    img: {
      maxWidth: 350,
      margin: theme.spacing(1)
    },
    dialog: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      width: 'fit-content',
    }
}));


  