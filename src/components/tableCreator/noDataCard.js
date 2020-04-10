import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import style from './style';

export const NoDataCard = (props) => {
    const classes = style();
    let msg = props.msg;

    return(
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                { msg }
                </Typography>
            </CardContent>
        </Card>
    )
}