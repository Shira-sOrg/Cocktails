import { Grid, Typography } from "@mui/material"
import React from "react"

export default function Error(error: any){
    return (
        <Grid container sx={{height:600,  alignItems:"center", justifyContent:"center", color: "white"}}>
            <Typography align="center" variant="h5">An Error Has Accured: {error?.message}</Typography>
        </Grid>)
};