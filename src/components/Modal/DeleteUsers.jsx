import { Button, Card, makeStyles, Modal } from "@material-ui/core";
import CardHeader from "components/Card/CardHeader";
import { useModal } from "hooks/useModal";
import { deleteUser } from "actions/userActions";
import React from "react";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  width100: {
    width: "50%",
  },
}));

const DeleteUsers = ({ id, deleteUser }) => {
  const { open, handleOpen } = useModal();
  const classes = useStyles();

  const handleDelete = () => {
    deleteUser(id);
    handleOpen();
  };
  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleOpen}>
        Eliminar
      </Button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        className={classes.modal}
        onClose={handleOpen}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Card>
          <CardHeader>
            ¿está seguro ue desea eliminar este registro?{" "}
          </CardHeader>
          <Button onClick={handleDelete}>Sí</Button>
          <Button onClick={handleOpen}>No</Button>
        </Card>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = {
  deleteUser,
};

export default connect(null, mapDispatchToProps)(DeleteUsers);
