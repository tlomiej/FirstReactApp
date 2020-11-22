import { Dialog, IconButton } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import React from 'react';
import { fdb } from "../models/FirebaseConfig";
import PersonIcon from '@material-ui/icons/Person';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import SingUp from "./SingUp";

interface Props {
    userLoged: (loged: boolean) => void;
}



export default function SingUpButton(props: Props) {
    const [openLoginDialog, setOpen] = React.useState(false);
    const [openSignInDialog, setOpenSignInDialog] = React.useState(false);
    const [loged, setLoged] = React.useState(false);
    const [user, setUser] = React.useState({});
    const [infoMessage, setInfoMessage] = React.useState('');
    const [infoMessageLogin, setInfoMessageLogin] = React.useState('');


    const onClick = () => {
        console.log("Get data")
    }

    const login = () => {
        setOpen(true);
    }

    const createAccount = () => {
        console.log("nowe konto")
        setLoged(true);
        setOpenSignInDialog(true)
    }

    const handleCreateAccount = (email: string, password: string) => {
        console.log("Tworze konto")
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(`Account created`, user);
                setOpenSignInDialog(false)
                props.userLoged(true);
            })
            .catch((error) => {
                console.log("Create account", error)
                var errorCode = error.code;
                setInfoMessage(error.message);


            });
    }

    const handleCloseLogin = () => {
        setOpen(false);
    }
    const handleCloseSignIn = () => {
        setOpenSignInDialog(false);
    }




    const handleLogin = (email: string, password: string) => {

        const auth = fdb.auth()

        auth.signInWithEmailAndPassword(email, password).then((user) => {
            console.log(user, user.user, user.credential);

            setUser(user);
            setOpen(false);
            setLoged(true);
            props.userLoged(true);


        })
            .catch((error) => {
                setInfoMessageLogin(error.message)
            });
    }



    const loginOut = () => {
        console.log("Wylogowano")
        firebase.auth().signOut().then(() => {
            setLoged(false);
            props.userLoged(false);

        }).catch(function (error) {
            console.log("singOut", error)
        });
    }

    return (
        <div>

            { loged ? (<IconButton title="Log out " className="logout" type="submit" onClick={loginOut} aria-label="search">
                <AccountCircleIcon />
            </IconButton>) : (
                    <IconButton title="Login" className="login" type="submit" onClick={login} aria-label="search">
                        <PersonIcon />
                    </IconButton>
                )}
            { loged ? ("") : (
                <IconButton title="Create account" className="create" type="submit" onClick={createAccount} aria-label="search">
                    <PersonAddIcon />
                </IconButton>
            )}




            <Dialog onClose={handleCloseLogin} open={openLoginDialog}>
                <SingUp infoMessage={infoMessageLogin} label="Login" login={handleLogin}></SingUp>
            </Dialog>
            <Dialog onClose={handleCloseSignIn} open={openSignInDialog}>
                <SingUp infoMessage={infoMessage} label="Sing up" login={handleCreateAccount}></SingUp>
            </Dialog>


        </div>
    )



}