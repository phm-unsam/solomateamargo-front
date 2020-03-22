import React, { Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux'
import { deleteFlightAction } from '../../redux/actions/cartAction'
import WithPassage from '../WithPassage'
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

function Passage({ listaCompra }) {

    const { id, seat, flightClass, price } = listaCompra

    const dispatch = useDispatch()

    const deleteFlight = id => {
        dispatch(deleteFlightAction(id))
    }

    return (
        <Fragment>
            <div>

                <StyledTableRow>
                    <StyledTableCell align="right">{seat}</StyledTableCell>
                    <StyledTableCell align="right">{flightClass}</StyledTableCell>
                    <StyledTableCell align="right">{price}</StyledTableCell>
                    <StyledTableCell align="right">
                        <Button className="buton"
                            variant="contained"
                            color="secondary"
                            onClick={() => deleteFlight(id)}
                        >Eliminar</Button>
                    </StyledTableCell>

                </StyledTableRow>
            </div>

        </Fragment>
    );
}

export default WithPassage(Passage)