import React, { Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

const WithPassage = (OriginalComponent, listaCompra) => {
    function typePassage(props) {
        const {origin, destination, exit, airport} = props.listaCompra

        return (
            <Fragment>
                <div>

                    <StyledTableRow>
                        <StyledTableCell align="right">{origin}</StyledTableCell>
                        <StyledTableCell align="right" >{destination}</StyledTableCell>
                        <StyledTableCell align="right">{exit}</StyledTableCell>
                        <StyledTableCell align="right">{airport}</StyledTableCell>

                    </StyledTableRow>
                </div>
                <OriginalComponent {...props} />
            </Fragment>
        );
    }
    return typePassage
}

export default WithPassage;