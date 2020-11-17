import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import SingUp from "./SingUp";


interface Props {
    email?: any;
    password?: string;
    createAccount: (email: string, password: string) => void;
}
export default function SingUpButton(props: Props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
    };

    const handleCreateAccount = (email: string, password: string) => {
        console.log("XXXXXxx", email, password)
        props.createAccount(email, password)
        setOpen(false);
    }



    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Login
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <SingUp createAccount={handleCreateAccount}></SingUp>
            </Dialog>
        </div>
    );
}
