import React, { Fragment, useEffect } from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';

import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

import { useDispatch } from 'react-redux';
import { getCart } from '../redux/actions/cartAction';

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const WithFlightsTable = (OriginalComponent) => {
    function AirplaneRouteTable() {
        const classes = useStyles();

        const dispatch = useDispatch();



        useEffect(() => {
            dispatch(getCart());
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return (
            <Fragment>
                <div className="general">

                    <div className="container">

                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="right">Origen</StyledTableCell>
                                        <StyledTableCell align="right">Destino</StyledTableCell>
                                        <StyledTableCell align="right">Salida</StyledTableCell>
                                        <StyledTableCell align="right">Aerolinea</StyledTableCell>

                                    </TableRow>
                                </TableHead>

                            </Table>
                        </TableContainer>
                    </div>
                    <OriginalComponent />
                </div>
            </Fragment>
        )
    }
    return AirplaneRouteTable
}

export default WithFlightsTable;

