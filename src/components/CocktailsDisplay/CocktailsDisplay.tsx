import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Cocktail, Cocktails } from '../../utils/types';
import CocktailCard from '../CocktailCard/CocktailCard';
import Recipe from '../Recipe/Recipe';

interface CocktailsDisplayProps {
    cocktails: Cocktail[];
}

export default function CocktailsDisplay({ cocktails }: CocktailsDisplayProps){
    const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null);

    function openModal(cocktail: Cocktail){
        setSelectedCocktail(cocktail);
      }
    return(
        <Grid container spacing={3} sx={{minHeight:600}}>
        {cocktails.map(cocktail => (
            <Grid item sx={{display: 'flex', maxHeight:390}}>
            <CocktailCard key={cocktail.idDrink} cocktail={cocktail} openModal={openModal}/>
            </Grid>
        ))}
        {selectedCocktail && <Recipe
        cocktail={selectedCocktail}
        onClose={() => setSelectedCocktail(null)}></Recipe>}
        </Grid>
    );
}