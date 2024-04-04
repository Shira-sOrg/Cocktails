import React from "react"

import { Grid, Typography } from "@mui/material"

export default function Loading(){
    return (
        <Grid container sx={{height:600,  alignItems:"center", justifyContent:"center", color: "white"}}>
            <Typography align="center" variant="h5">Loading...</Typography>
        </Grid>)
};