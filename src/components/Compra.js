import React, { Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { useDispatch } from 'react-redux'
import { borrarCompraAction } from '../actions/CarritoDeComprasAction'

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

const Compra = ({ listaCompra }) => {

    const { id, origen, destino, salida, aerolinea, asiento, clase, precio } = listaCompra

    const dispatch = useDispatch()

    const confirmarEliminarCompra = id => {


        dispatch(borrarCompraAction(id))
    }
    return (
        <Fragment>

            <StyledTableRow>
                <StyledTableCell component="th" scope="row">{origen}</StyledTableCell>
                <StyledTableCell align="right" >{destino}</StyledTableCell>
                <StyledTableCell align="right">{salida}</StyledTableCell>
                <StyledTableCell align="right">{aerolinea}</StyledTableCell>
                <StyledTableCell align="right">{asiento}</StyledTableCell>
                <StyledTableCell align="right">{clase}</StyledTableCell>
                <StyledTableCell align="right">{precio}</StyledTableCell>
                <StyledTableCell align="right">{precio}</StyledTableCell>
                <StyledTableCell align="right">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => confirmarEliminarCompra(id)}
                    >Eliminar</Button>
                </StyledTableCell>

            </StyledTableRow>

        </Fragment>
    );
}

export default Compra;