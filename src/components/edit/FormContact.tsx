import { Button, createStyles, Grid, makeStyles, TextField, Theme, IconButton } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { Controller, useForm } from "react-hook-form";
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { fdb } from "../../models/FirebaseConfig";
import 'firebase/auth';
import EditIcon from '@material-ui/icons/Edit';
import TimelineIcon from '@material-ui/icons/Timeline';
import EditToolbar from "./EditToolbar";

enum GenderEnum {
  female = "female",
  male = "male"
}

interface IFormInput {
  title: String;
  descryption: string;
  geojson: any;

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
    toolBox: {
      margin: '1px'

    }
  }),
);


interface Props {
  draw: any;
}

export default function App(props: Props) {
  const { register, handleSubmit, control } = useForm<IFormInput>();
  const classes = useStyles();


  const onSubmit = (data: IFormInput) => {
    const allData = { ...data, ...{ geojson: JSON.stringify(props.draw.getAll()) } }
    console.log(allData)

    fdb.auth().onAuthStateChanged((user) => {
      if (user) {
        fdb.firestore().collection('zgloszenia').add({ allData }).then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      } else {
        // No user is signed in.
      }
    });

  };

  return (
    <div>
      <EditToolbar draw={props.draw}></EditToolbar>
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


    </div>
  );
}