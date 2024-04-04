import { useEffect, useState } from 'react';
import Search from '../../components/Search/Search';
import CocktailsDisplay from '../../components/CocktailsDisplay/CocktailsDisplay';
import NewDrinkForm from '../../components/NewDrinkForm/NewDrinkForm';
import useCocktails from '../../utils/cocktailApi';
import { Button, Stack, Typography } from '@mui/material';
import AlphabeticPagination from '../../components/AlphabeticPagination/AlphabeticPagination';
import ResultsNotFound from '../../components/ResultsNotFound/ResultsNotFound';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';


export default function Home(){
    const [visible, setVisible] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("f=a");
    const { data: cocktails, isLoading, error } = useCocktails(searchQuery);

    return(
        <div>
        <Stack spacing={1} padding={2} alignContent="center" justifyItems="center">
            <Typography variant="h2" align='center' sx={{color:'white'}}>Browse Cocktails</Typography>
            <Stack direction="row" justifyContent="space-between">
                <Button sx={{color:'white'}} variant="outlined" onClick={()=>setVisible(true)}>Add New Cocktail</Button>
                <Search onSearch={setSearchQuery}/>
            </Stack>
            <AlphabeticPagination onSearch={setSearchQuery}></AlphabeticPagination>
            {isLoading ? (
                <Loading></Loading>
            ) : (error? (<Error error={error}></Error>) : (
                cocktails && cocktails.length > 0 ? <CocktailsDisplay cocktails={cocktails} /> : <ResultsNotFound></ResultsNotFound>
            ))}
        </Stack>
        {visible && <NewDrinkForm onClose={() => setVisible(false)}></NewDrinkForm>}
        </div>
    );
}   