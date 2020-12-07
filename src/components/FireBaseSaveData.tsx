import { Dialog, IconButton } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import React from 'react';
import { fdb } from "../models/FirebaseConfig";

interface Props {
    userLoged?: (loged: boolean) => void;
    data?: any;
}



export default function FireBaseSaveData(props: Props) {


    const saveData = () => {
        fdb.firestore().collection('zgloszenia').add({ ...props.data });

    }





}