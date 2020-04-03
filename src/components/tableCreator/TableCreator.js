import React, { Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.action.hover,
        color: theme.palette.common.black,
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

export default function TableCreator(props) {
    const styles = props.styles;
    return (
        <Fragment>
            <TableContainer >
                <Table spacing={3} className={styles}>
                    <TableHead>
                        <TableRow>
                            {props.columnName.map(header => (<StyledTableCell align="center">{header.name}</StyledTableCell>))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data.map(els => (
                            <StyledTableRow key={els.id}>
                                    {Object.values(els).map(el => (
                                        <TableCell  align="center" onClick={() => props.bodyAction(els)}>{el}</TableCell>
                                    ))}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    )
}