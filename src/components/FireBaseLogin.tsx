import { Dialog, IconButton } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import React from 'react';
import { firebaseConfig } from "../models/FirebaseConfig";
import PersonIcon from '@material-ui/icons/Person';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import SingUp from "./SingUp";

interface Props {
    login?: boolean;
}

export default function SingUpButton(props: Props) {
    const [open, setOpen] = React.useState(false);


    const componentDidMount = () => {
        firebase.initializeApp(firebaseConfig);

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
        
        const auth = firebase.auth()

        auth.signInWithEmailAndPassword(email, password).then((user) => {
            console.log(user)
            setOpen(false)

        })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)

            });
    }

    const loginOut = () => {
        console.log("Wylogowano")
    }

    return (
        <div>


            <IconButton title="Login" type="submit" onClick={login} className='iconButton' aria-label="search">
                <PersonIcon />
            </IconButton>
            <IconButton title="" type="submit" onClick={loginOut} className='iconButton' aria-label="search">
                <AccountCircleIcon />
            </IconButton>
            <IconButton title="Create account" type="submit" onClick={createAccount} className='iconButton' aria-label="search">
                <PersonAddIcon />
            </IconButton>
            <Dialog onClose={handleClose} open={open}>
                <SingUp login={handleLogin}></SingUp>
            </Dialog>


        </div>
    )



}