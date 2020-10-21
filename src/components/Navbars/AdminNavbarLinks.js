import React from "react";
// @material-ui/core components

import Button from "components/CustomButtons/Button.js";
import { connect } from "react-redux";

import { logout } from "actions/authAction";
function AdminNavbarLinks({ logout }) {
  return (
    <div>
      <Button variant="contained" color="secondary" onClick={logout}>
        Salir
      </Button>
    </div>
  );
}

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(AdminNavbarLinks);
