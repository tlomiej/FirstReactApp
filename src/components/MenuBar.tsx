import React, { useState } from 'react';
import FireBaseLogin from "./FireBaseLogin";
import { Button, Drawer, IconButton, SwipeableDrawer } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import { Anchor } from 'mapbox-gl';



interface props {
    drawEdit: boolean;
}

export default function MenuBar(Props: props) {
    const [drawerEdit, setDrawerEdit] = useState(false);

    const toggleDrawerEditNew = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setDrawerEdit(open)
    };

    

    return <div>
        <Drawer
            open={drawerEdit}
            /* onClose={toggleDrawerEditNew("left", false)} */
        >
            <Button onClick={toggleDrawerEditNew("left", false)}>"X"</Button>

        </Drawer>
    </div>;
}