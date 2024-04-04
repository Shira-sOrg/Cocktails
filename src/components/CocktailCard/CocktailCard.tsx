import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Cocktail } from '../../utils/types';

interface CocktailCardProps {
    cocktail: Cocktail;
    openModal: (query: Cocktail) => void;
}

export default function CocktailCard({cocktail, openModal}: CocktailCardProps){

    return(
        <Card sx={{width: 150, justifyContent: "space-between", display: 'flex', flexDirection: 'column'}}>
            <CardMedia
            height={170}
            component="img"
            image={cocktail.strDrinkThumb}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {cocktail.strDrink}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => openModal(cocktail)}>Recipe</Button>
            </CardActions>
      </Card>
    );
}