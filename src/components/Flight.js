import React, { Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux'
import { deleteFlightAction } from '../redux/actions/cartAction'

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

export default function Flight({ listaCompra }) {

    const { id, origin, destination, exit, airport, seat, flightClass, price } = listaCompra

    const dispatch = useDispatch()

    const deleteFlight = id => {
        dispatch(deleteFlightAction(id))
    }

    return (
        <Fragment>

            <StyledTableRow>
                <StyledTableCell component="th" scope="row">{origin}</StyledTableCell>
                <StyledTableCell align="right" >{destination}</StyledTableCell>
                <StyledTableCell align="right">{exit}</StyledTableCell>
                <StyledTableCell align="right">{airport}</StyledTableCell>
                <StyledTableCell align="right">{seat}</StyledTableCell>
                <StyledTableCell align="right">{flightClass}</StyledTableCell>
                <StyledTableCell align="right">{price}</StyledTableCell>
                <StyledTableCell align="right">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteFlight(id)}
                    >Eliminar</Button>
                </StyledTableCell>

            </StyledTableRow>

        </Fragment>
    );
}