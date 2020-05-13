import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Container from "@material-ui/core/Container";
import { Fingerprint } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

export default function AccountForm({
  type,
  submit,
  styles,
  open,
  result,
  severity,
}) {
  const { register, handleSubmit } = useForm();
  const classes = styles();

  return (
    <Container style={{ marginTop: "50px" }} maxWidth="sm">
      <Paper className={classes.padding}>
        <div className={classes.margin}>
          <form onSubmit={handleSubmit(submit)}>
            <Grid container alignItems="flex-end" spacing={8}>
              <Grid item>
                <AccountBoxIcon />
              </Grid>
              <Grid item md={true} sm={true} xs={true}>
                <TextField
                  inputRef={register}
                  id="username"
                  label="Username"
                  name="username"
                  fullWidth
                  autoFocus
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <Fingerprint />
              </Grid>
              <Grid item md={true} sm={true} xs={true}>
                <TextField
                  inputRef={register}
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <Grid container justify="center" style={{ marginTop: "10px" }}>
              <Button
                variant="outlined"
                color="primary"
                style={{ textTransform: "none" }}
                type="submit"
              >
                {type}
              </Button>
            </Grid>
          </form>
        </div>
        <Grid container justify="center" style={{ marginTop: "10px" }}>
          {open ? (
            <div className={classes.alertRoot}>
              <Alert severity={severity}>{result}</Alert>
            </div>
          ) : (
            <div></div>
          )}
        </Grid>
      </Paper>
    </Container>
  );
}
