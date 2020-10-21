import React from "react";
import { connect, useSelector } from "react-redux";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Alert from "@material-ui/lab/Alert";
import { setClose } from "actions/alertAction";
const AlertComponent = ({ setClose }) => {
  const { type, code, msg, open } = useSelector((state) => state.alert);
  return (
    <>
      {open && (
        <Alert severity={type} onClose={setClose}>
          <AlertTitle>Código {code}</AlertTitle>
          {msg}
        </Alert>
      )}
    </>
  );
};

const mapDispatchToProps = { setClose };

export default connect(null, mapDispatchToProps)(AlertComponent);
