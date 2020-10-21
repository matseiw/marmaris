import { Button, Card, makeStyles, Modal } from "@material-ui/core";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import CardHeader from "components/Card/CardHeader";
import React from "react";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
  },
}));

export const FormError = ({ open, handleOpen, msg }) => {
  const classes = useStyles();
  return (
    <Modal open={open} onClose={handleOpen} className={classes.modal}>
      <Card>
        <CardHeader>Error</CardHeader>
        <CardBody>{msg}</CardBody>
        <CardFooter>
          <Button onClick={handleOpen}>Aceptar</Button>
        </CardFooter>
      </Card>
    </Modal>
  );
};
