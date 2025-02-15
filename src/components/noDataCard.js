import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export const NoDataCard = (props) => {
    let msg = props.msg;

    return(
        <Card >
            <CardContent>
                <Typography variant="h5" component="h2">
                { msg }
                </Typography>
            </CardContent>
        </Card>
    )
}