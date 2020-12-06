import { Button, createStyles, Grid, makeStyles, TextField, Theme } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { Controller, useForm } from "react-hook-form";

enum GenderEnum {
  female = "female",
  male = "male"
}

interface IFormInput {
  title: String;
  descryption: string;

}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paperGrid: {
      padding: theme.spacing(4),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export default function App() {
  const { register, handleSubmit, control } = useForm<IFormInput>();
  const classes = useStyles();

  const onSubmit = (data: IFormInput) => {
    console.log(data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid className={classes.paperGrid} container spacing={3} direction="column">

        <Controller
          as={<TextField />}
          name="title"
          label="First Name"
          control={control}
          defaultValue=""
          required
        />
        <Controller
          as={<TextField />}
          name="descryption"
          label="Descryption"
          control={control}
          defaultValue=""
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>

      </Grid>

    </form>
  );
}