import { useQuery } from 'react-query';

async function fetchCocktails(searchQuery: string) {
  let url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?';
  const response = await fetch(url + searchQuery);
  if (!response.ok) {
      throw new Error('Failed to fetch cocktails');
  }
  try{
    const data = await response.json();
    return data.drinks;
  } catch(error) {
      alert(error)
  }
}

export default function useCocktails(searchQuery: string) {
  return useQuery(['cocktails', searchQuery], () => fetchCocktails(searchQuery));
}
