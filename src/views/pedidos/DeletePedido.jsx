import { Button, Card, CardHeader, makeStyles, Modal } from "@material-ui/core";
import CardFooter from "components/Card/CardFooter";
import { useModal } from "hooks/useModal";
import React from "react";
import { deletePedido } from "actions/pedidos";
import { connect } from "react-redux";

const useStyles = makeStyles({
  myButton: {
    display: "flex",
    justifyContent: "space-between",
  },
  modal: {
    position: "fixed",
    top: "50%",
    left: "25%",
    transform: "translate(0, -50%)",
    overflowY: "none",
  },
});

const DeletePedido = ({ id, deletePedido }) => {
  const classes = useStyles();
  const [open, setOpen] = useModal(false);
  const handleDelete = () => {
    deletePedido(id.idfactura);
    setOpen();
  };
  console.log(id.idfactura);
  return (
    <div>
      <Button variant="contained" color="secondary" onClick={setOpen}>
        Cancelar
      </Button>
      <Modal open={open} onClose={setOpen}>
        <Card className={classes.modal}>
          <CardHeader
            title={`está seguro que desea cancelar el pedido  ${id.idfactura}`}
          />
          <CardFooter className={classes.myButton}>
            <Button variant="outlined" color="primary" onClick={setOpen}>
              Cancelar
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleDelete}>
              Aceptar
            </Button>
          </CardFooter>
        </Card>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = {
  deletePedido,
};
export default connect(null, mapDispatchToProps)(DeletePedido);
