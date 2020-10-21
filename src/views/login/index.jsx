import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "hooks/useForm";
import { connect } from "react-redux";
import { login } from "actions/authAction";
import { useHistory } from "react-router-dom";
import Alertcomponent from "components/Alert";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Matthew Seidel
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const LoginClass = ({ login }) => {
  const classes = useStyles();
  const [{ contraseña, nombreUsuario }, handleChange] = useForm({
    contraseña: "",
    nombreUsuario: "",
  });
  const history = useHistory();

  const onLogin = (e) => {
    e.preventDefault();
    login({ contraseña, nombreUsuario })
      .then(({ data }) => {
        console.log(data);
        switch (data[0].cargo) {
          case 1:
            history.push("/admin");
            break;
          case 2:
            history.push("/mesero");
            break;
          default:
            history.push("/cajero");
            break;
        }
        console.log("pasa");
      })
      .catch();
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingresa
        </Typography>
        <form className={classes.form} onSubmit={onLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="nombre de usuario"
            name="nombreUsuario"
            value={nombreUsuario}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={contraseña}
            onChange={handleChange}
            name="contraseña"
            label="contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            ingresar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                ¿olvidó su contraseña?
              </Link>
            </Grid>
          </Grid>
        </form>
        <Alertcomponent />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapDispatchToProps = {
  login,
};

export default connect(null, mapDispatchToProps)(LoginClass);
