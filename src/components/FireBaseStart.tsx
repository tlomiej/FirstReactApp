import { IconButton } from '@material-ui/core';
import firebase from 'firebase//app';
//import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import React from 'react';
import { firebaseConfig } from "./../models/FirebaseConfig";
import SearchIcon from '@material-ui/icons/Search';

interface Props {
    firebaseData?: any;
    data? :any;
}

export default class FireBaseStart<Firebase> extends React.Component<Props>{


    saveDate(){
        firebase.database().ref('zgloszenia').set([{
            opis: "OPIS test...123"
          }], (error) => {
            if (error) {
              console.log(`Save error ${error}`)
            } else {
                console.log("Save OK")

            }
          });
    }

    async getData() {
 
        const dem : any= [];
        await firebase.firestore().collection('zgloszenia').get()
          .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
            dem.push(doc.data());
          });
        });
        return dem;
      }

    async componentDidMount() {
        // Initialize Firebase

        console.log("Firebase START")
        firebase.initializeApp(firebaseConfig);
        this.saveDate();
        let data = await this.getData();
         console.log("Firebase KONIEC", data)

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