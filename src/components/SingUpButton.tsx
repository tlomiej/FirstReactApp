import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import SingUp from "./SingUp";

export default function SingUpButton() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Login
        </Button>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <SingUp></SingUp>
            </Dialog>
        </div>
    );
}
