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

export default function TableCreator(props){
    const firstRow = props.data[0]
    const headers = Object.keys(firstRow);
    const styles = props.styles;
    return(
        <Fragment>
            <TableContainer >
                <Table spacing={3} className={styles}>
                    <TableHead>
                        <TableRow>
                            {headers.map(header => (<StyledTableCell align="center">{header}</StyledTableCell>))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {props.data.map(el => (
                        <StyledTableRow >
                            {Object.values(el).map(el => (
                                <TableCell key={el.id} align="center" onClick={props.onClick}>{el}</TableCell>
                            ))}
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    )
}