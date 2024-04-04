import { Grid, Typography } from "@mui/material"
import React from "react"

export default function ResultsNotFound(){
    return (
    <Grid container sx={{height:600,  alignItems:"center", justifyContent:"center", color: "white"}}>
        <Typography align="center" variant="h5">No Results Found</Typography>
    </Grid>)
}