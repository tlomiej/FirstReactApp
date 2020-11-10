import { IconButton } from '@material-ui/core';
import firebase from 'firebase//app';
//import 'firebase/auth';
import 'firebase/database';
import React from 'react';
import { firebaseConfig } from "./../models/FirebaseConfig";
import SearchIcon from '@material-ui/icons/Search';

interface Props {
    firebaseData?: any;
}

export default class FireBaseStart<Firebase> extends React.Component<Props>{


    componentDidMount() {
        // Initialize Firebase

        console.log("Firebase START")
        firebase.initializeApp(firebaseConfig);
        let zgloszeniaRef = firebase.database().ref("zgloszenia");

        console.log("Firebase", zgloszeniaRef)

        zgloszeniaRef.ref.on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
             let childData = childSnapshot.val();
             //var id=childData.id;
             console.log('Firebase',childData);
            });
           });
        
           console.log("Firebase KONIEC")

    }

    onClick() {
        console.log("Get data")
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