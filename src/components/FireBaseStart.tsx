import { IconButton } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import React from 'react';
import useEffect from 'react';
import { firebaseConfig } from "./../models/FirebaseConfig";
import SearchIcon from '@material-ui/icons/Search';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Dialog from '@material-ui/core/Dialog';

interface Props {
    firebaseData?: any;
    data?: any;
    email: string;
    password: string;
    createAccount?: (email: string, password: string) => void;
    login?: boolean;
}

export default class FireBaseStart<Firebase> extends React.Component<Props>{

    saveDate() {
        firebase.firestore().collection('zgloszenia').add({
            opis: "OPIS test...123",
            pole: "testowe",
            numer: 13
        })
    }

    async getData() {

        const dem: any = [];
        await firebase.firestore().collection('zgloszenia').get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    dem.push(doc.data());
                });
            });
        return dem;
    }

    author(auth: any) {
        const email = `test${Math.random()}`.replace('.', '') + `@test.pl`
        const pass = 'haslo1234'
        auth.createUserWithEmailAndPassword(email, pass)
    }



    async componentDidMount() {
        // Initialize Firebase


        console.log("Firebase START")
        firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth()
        //this.saveDate();
        let data = await this.getData();
        console.log("Firebase KONIEC", data)

        //this.author(auth)
        auth.signInWithEmailAndPassword("test06576130067340669@test.pl", "haslo1234")
       
        firebase.auth().onAuthStateChanged((user) => {
            console.log("auth???", user)
        })


    }
    componentDidUpdate() {
        const auth = firebase.auth()
        const aaa = auth.signInWithEmailAndPassword( this.props.email, this.props.password).then((user) => {
            console.log(user)
            
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
            
          });
        
        console.log("SSSSSS", aaa)
    }

    onClick() {
        console.log("Get data")
        console.log("GGGGG", this.props.email)
    }


    render() {
        return (
            <div>

                <h1>FIREBASE START</h1>
                <IconButton type="submit" onClick={this.onClick} className='iconButton' aria-label="search">
                    <SearchIcon />
                </IconButton>

                
            </div>
        )
    }


}