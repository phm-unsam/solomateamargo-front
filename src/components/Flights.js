import React, { useState, Fragment }  from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import { yellow } from '@material-ui/core/colors';
import MomentUtils from '@date-io/moment';
import {  MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const theme = {
  spacing: 2
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  margin: {
    margin: theme.spacing(1),
  },
  table: {
    minWidth: 700
  },
  buttonAgregarCarrito: {
    margin: 5,
    minWidth: 500
  }
}));

const ColorButton = withStyles(theme => ({
  root: {
    color: yellow[50],
    backgroundColor: yellow[700],
    '&:hover': {
      backgroundColor: yellow[800],
    },
  },
}))(Button);

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default function Flights() {
  return(
    <div>
      <SearchComponent></SearchComponent>
      <GridFlights></GridFlights>
      <GridSeats></GridSeats>
      <FooterFlights></FooterFlights>
    </div>
  )  
}

function SearchComponent(){
  const [selectedDate, handleDateChange] = useState(new Date());
  const classes = useStyles();

  return(
    <Fragment>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <TextField
              variant="standard"
              margin="normal"
              name="origin"
              label="Origen"
              type="text"
              id="origin"
            />
          </Grid>
          <Grid item xs={3}>
          <TextField
              variant="standard"
              margin="normal"
              name="origin"
              label="Destino"
              type="text"
              id="origin"
            />
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
          <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.margin}
            >
              Buscar
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Grid item xs={3}>        
              <KeyboardDatePicker format="DD/MM/YYYY" value={selectedDate} onChange={handleDateChange} label="Desde"></KeyboardDatePicker>
            </Grid>
            <Grid item xs={3}>
              <KeyboardDatePicker format="DD/MM/YYYY" value={selectedDate} onChange={handleDateChange} label="Hasta"></KeyboardDatePicker>
            </Grid>
          </MuiPickersUtilsProvider>
          <Grid item xs={3}>
          <Typography variant="body1" gutterBottom><input type="checkbox"  className={classes.margin}/>Ventanilla </Typography>
          </Grid>
          <Grid item xs={3}>
          <ColorButton
              type="submit"
              variant="contained"
              color="primary"
              className={classes.margin}
            >
              Limpiar Campos
            </ColorButton>
          </Grid>
        </Grid>
      </Fragment>
  )
}

function GridFlights(){
  const classes = useStyles();

  return(
    <Fragment>
    <TableContainer>
      <Table className={classes.table} spacing={3}>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Origen</StyledTableCell>
            <StyledTableCell align="center">Destino</StyledTableCell>
            <StyledTableCell align="center">Aerolinea</StyledTableCell>
            <StyledTableCell align="center">Salida</StyledTableCell>
            <StyledTableCell align="center">Escala</StyledTableCell>
            <StyledTableCell align="center">Duracion</StyledTableCell>
            <StyledTableCell align="center">Desde</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/*Object.keys(compras).map(articulo => (<Compra listaCompra={compras[articulo]} key={articulo} />))*/}
        </TableBody>
      </Table>
    </TableContainer>
  </Fragment>  
  )
}

function GridSeats(){
  const classes = useStyles();

  return(
    <Fragment>
      <TableContainer>
        <Typography align='left' variant="h4" gutterBottom>
          Selección de Asiento
        </Typography>
        <Table className={classes.table} spacing={3}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Clase</StyledTableCell>
              <StyledTableCell align="center">Numero</StyledTableCell>
              <StyledTableCell align="center">Ventanilla</StyledTableCell>
              <StyledTableCell align="center">Precio</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/*Object.keys(compras).map(articulo => (<Compra listaCompra={compras[articulo]} key={articulo} />))*/}
          </TableBody>
        </Table>
        <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.buttonAgregarCarrito}
          >
            Agregar al carrito
          </Button>
      </TableContainer>
    </Fragment>
  )
}

function FooterFlights(){
  const classes = useStyles();
  
  return(
    <Fragment>
      <Grid container spacing={3}>
          <Grid item xs={6}>        
          <Typography variant="body1" gutterBottom> Items en el carrito: 111 </Typography>
          <Typography variant="body1" gutterBottom> Total en el carrito: $11.111 </Typography>
          </Grid>
        <Grid item xs={3}>
        <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.margin}
          >
            Perfil
          </Button>
        </Grid>
        <Grid item xs={3}>
        <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.margin}
          >
            Finalizar Compra
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  )
}