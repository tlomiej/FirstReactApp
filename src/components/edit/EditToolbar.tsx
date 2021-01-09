import { createStyles, makeStyles, TextField, Theme, IconButton } from "@material-ui/core";
import React from "react";
import 'firebase/auth';
import TimelineIcon from '@material-ui/icons/Timeline';
import EditIcon from '@material-ui/icons/Edit';
import CropSquareIcon from '@material-ui/icons/CropSquare';
import LocationOnIcon from '@material-ui/icons/LocationOn';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolBox: {
            margin: '1px',
            paddingLeft: '25px'

        }
    }),
);


interface Props {
    draw: any;
}

export default function EditToolbar(props: Props) {
    const classes = useStyles();


    const drawPolygon = () => {
        props.draw.changeMode('draw_polygon');
    }

    const drawPolyline = () => {
        props.draw.changeMode('draw_line_string');
    }
    const drawPoint = () => {
        props.draw.changeMode('draw_point');
    }



    return (
        <div className={classes.toolBox}>
            <IconButton title="Punkt" aria-label="search" onClick={drawPoint}>
                <LocationOnIcon />
            </IconButton>
            <IconButton title="Linia" aria-label="search" onClick={drawPolyline}>
                <TimelineIcon />
            </IconButton>
            <IconButton title="Obszar" aria-label="search" onClick={drawPolygon}>
                <CropSquareIcon />
            </IconButton>
        </div>
    );
}