import { Button, CircularProgress, createStyles, Grid, makeStyles, TextField, Theme } from "@material-ui/core";
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
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
  const { register, handleSubmit, control, reset } = useForm<IFormInput>();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);


  const onSubmit = (data: IFormInput) => {
    setEdit(true);
    const allData = { ...data, ...{ geojson: JSON.stringify(props.draw.getAll()) } }
    console.log(allData)

    fdb.auth().onAuthStateChanged((user) => {
      if (user) {
        fdb.firestore().collection('zgloszenia').add({ allData }).then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          setOpen(true);
          setEdit(false);
          reset({});

        })
          .catch((error) => {
            console.error("Error adding document: ", error);
            setEdit(false);
          });
      } else {
        // No user is signed in.
      }
    });

  };

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Data saved"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
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
          {edit ? (<Button type="submit" variant="contained" color="primary">
            <CircularProgress color="secondary" />  Sending...
          </Button>) : <Button type="submit" variant="contained" color="primary">  Send
          </Button>}

        </Grid>

      </form>


    </div>
  );
}