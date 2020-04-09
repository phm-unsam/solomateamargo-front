import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    root: {
      width: '90%',
      marginLeft: '5%'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
}));
