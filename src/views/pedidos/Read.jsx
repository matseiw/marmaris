import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import mesaLogo from "assets/img/Table-02.png";
import { CardHeader, Card, Grid } from "@material-ui/core";
import { getMesasDisponibles } from "actions/mesa";
import CardFooter from "components/Card/CardFooter";
import NuevoPedido from "./NuevoPedido";
import DeletePedido from "./DeletePedido";
import EditarPedido from "./EditarPedido";
import NuevoDomicilio from "./NuevoDomicilio";
import { Domicilios } from "./Domicilios";
const Read = ({ getMesasDisponibles }) => {
  const { mesa, mesasLibres } = useSelector((state) => state.mesa);
  const [start, setStart] = useState(true);
  useEffect(() => {
    if (start === true) {
      getMesasDisponibles();
      setStart(false);
    } else {
      setTimeout(() => {
        getMesasDisponibles();
      }, 10000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NuevoDomicilio />
      <Grid container spacing={2}>
        {mesa.map((m) => (
          <Grid item xs={6} md={4} lg={3} key={m.idmesa}>
            {mesasLibres.find((libre) => libre.idmesa === m.idmesa) ? (
              <Card>
                <CardHeader title={m.nombre} subheader="Ocupada" />
                <img src={mesaLogo} alt="mesa" />
                <CardFooter>
                  <EditarPedido
                    factura={mesasLibres.filter(
                      (mes) => mes.idmesa === m.idmesa
                    )}
                    mesa={m}
                  ></EditarPedido>
                  <DeletePedido
                    id={mesasLibres.filter((mes) => mes.idmesa === m.idmesa)[0]}
                  ></DeletePedido>
                </CardFooter>
              </Card>
            ) : (
                <Card>
                  <CardHeader title={m.nombre} subheader="disponible" />
                  <img src={mesaLogo} alt="mesa" />

                  <CardFooter>
                    <NuevoPedido mesa={m}>Agregar Pedido</NuevoPedido>
                  </CardFooter>
                </Card>
              )}
          </Grid>
        ))}
        <Grid item xs={12}>
          {mesasLibres.map((mesa) => (
            <>{<Domicilios factura={mesa} />}</>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

const mapDispatchToProps = { getMesasDisponibles };

export default connect(null, mapDispatchToProps)(Read);
