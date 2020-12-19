import { Dialog, IconButton } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useEffect } from 'react';
import { fdb } from "../models/FirebaseConfig";
import PersonIcon from '@material-ui/icons/Person';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import "./../css/Button.css";

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
        setOpenSignInDialog(true)
    }

    const handleCreateAccount = (email: string, password: string) => {
        console.log("Tworze konto")
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(`Account created`, user);
                setOpenSignInDialog(false)
                props.userLoged(true);
                setLoged(true);
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

     useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setLoged(true);
                props.userLoged(true);
            } else {
                setLoged(false);
                props.userLoged(false);
            }
        });

    }, []) 




    const loginOut = () => {
        console.log("Wylogowano")
        firebase.auth().signOut().then(() => {
            setUser(user);
            setLoged(true);
            props.userLoged(true);

        }).catch(function (error) {
            console.log("singOut", error)
        });
    }

    return (
        <div>

            { loged ? (<div className='iconButtonStyle'><IconButton className="logout" title="Log out" type="submit" onClick={loginOut} aria-label="search">
                <AccountCircleIcon />
            </IconButton></div>) : (
                    <div className='iconButtonStyle'> <IconButton className="login" title="Login" type="submit" onClick={login} aria-label="search">
                        <PersonIcon />
                    </IconButton></div>
                )}
            { loged ? ("") : (
                <div className='iconButtonStyle'>
                    <IconButton className="create" title="Create account" type="submit" onClick={createAccount} aria-label="search">
                        <PersonAddIcon />
                    </IconButton>
                </div>
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