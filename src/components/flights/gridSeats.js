import React, { Fragment, useEffect } from "react";
import Button from "@material-ui/core/Button";
import MaterialTable from "material-table";

import Typography from "@material-ui/core/Typography";
import { NoDataCard } from "../noDataCard";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Icon from "@material-ui/core/Icon";
//css
import { useStyles } from "./style";

import { useDispatch } from "react-redux";
import { cartLoad } from "../../redux/actions/cartAction";
import { Card } from "@material-ui/core";

export const GridSeats = (props) => {
  const login = useSelector((store) => store.login);
  const classes = useStyles();
  let history = useHistory();
  const cartFlights = useSelector((state) => state.cartReducer.flights);
  const dispatch = useDispatch();
  useEffect(() => {
    updateFlights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateFlights = () => {
    dispatch(cartLoad({ loggedId: login.id }));
  };

  const onCartClick = (e) => {
    history.push("/cart");
  };

  const addCart = (e, seat) => {
    props.addCart(seat.id);

    setTimeout(function () {
      updateFlights();
    }, 200);
    
  };

  const disabledCart = () => {
    return cartFlights.length === 0;
  };
  const table = (
    <MaterialTable
      title="Asientos"
      columns={[
        { title: "Clase", field: "type" },
        { title: "Numero", field: "number" },
        { title: "Ventanilla", field: "nextoWindow" },
        { title: "Precio", field: "cost" },
      ]}
      data={props.seats}
      options={{
        search: false,
        paging: false,
        actionsColumnIndex: -1,
      }}
      actions={[
        {
          icon: "add_shopping_cart",
          tooltip: "Agregar al carrito ",
          onClick: addCart,
        },
      ]}
      localization={{
        body: { emptyDataSourceMessage: "No hay asientos para este vuelo" },
        header: { actions: "Acciones" },
      }}
    />
  );

  return (
    <Fragment>
      {props.seats.length === 0 ? (
        <NoDataCard msg="Seleccione un vuelo" />
      ) : (
        table
      )}
      <div className={classes.margin}>
        <Card>
          <Typography variant="h5" component="h2">
            Carrito de compras
          </Typography>
          <br />
          <Typography variant="body1" gutterBottom>
            Cantidad de items: {cartFlights.numberOfTickets}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Total ${cartFlights.totalCost}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.margin}
            onClick={onCartClick}
            disabled={disabledCart()}
          >
            Ver carrito <Icon>shopping_cart</Icon>
          </Button>
        </Card>
      </div>
    </Fragment>
  );
};
