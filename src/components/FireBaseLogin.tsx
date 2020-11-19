import { Dialog, IconButton } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import React from 'react';
import { fdb } from "../models/FirebaseConfig";
import PersonIcon from '@material-ui/icons/Person';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import SingUp from "./SingUp";
import Snackbar from '@material-ui/core/Snackbar/Snackbar';

interface Props {
    login?: boolean;
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function SingUpButton(props: Props) {
    const [open, setOpen] = React.useState(false);
    const [loged, setLoged] = React.useState(false);
    const [user, setUser] = React.useState({});


   

    const componentDidMount = () => {


        // firebase.initializeApp(firebaseConfig);
        //const auth = firebase.auth()

        //this.author(auth)
        // auth.signInWithEmailAndPassword("test06576130067340669@test.pl", "haslo1234")

        // firebase.auth().onAuthStateChanged((user) => {
        //     console.log("auth???", user)
        // })


    }
    /*     componentDidUpdate() {
            const auth = firebase.auth()
            const aaa = auth.signInWithEmailAndPassword(this.props.email, this.props.password).then((user) => {
                console.log(user)
    
            })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode, errorMessage)
    
                });
    
            console.log("SSSSSS", aaa)
        } */

    const onClick = () => {
        console.log("Get data")
        console.log("Get data")
    }

    const login = () => {
        setOpen(true);
    }

    const createAccount = () => {


    }

    const handleClose = () => {
        setOpen(true)
    }

    const handleLogin = (email: string, password: string) => {

        const auth = fdb.auth()

        auth.signInWithEmailAndPassword(email, password).then((user) => {
            console.log(user, user.user, user.credential);


            setUser(user);
            setOpen(false);
            setLoged(true);


        })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)

            });
    }

    const loginOut = () => {
        console.log("Wylogowano")
        firebase.auth().signOut().then(() => {
            setLoged(false);
        }).catch(function (error) {
            console.log("singOut", error)
        });
    }

    const singOutSnackbarInfo = () => {
        return (<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                This is a success message!
            </Alert>
        </Snackbar>)
    }

    return (
        <div>

            { loged ? (<IconButton title="Log out " className="logout" type="submit" onClick={loginOut} aria-label="search">
                <AccountCircleIcon />
            </IconButton>) : (<IconButton title="Login" className="login" type="submit" onClick={login} aria-label="search">
                <PersonIcon />
            </IconButton>)}



            <IconButton title="Create account" className="create" type="submit" onClick={createAccount} aria-label="search">
                <PersonAddIcon />
            </IconButton>
            <Dialog onClose={handleClose} open={open}>
                <SingUp login={handleLogin}></SingUp>
            </Dialog>


        </div>
    )



}