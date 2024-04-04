import React from 'react';
import {Button} from '@mui/material'

interface AlphabeticPaginationProps {
    onSearch: (query: string) => void;
}

export default function AlphabeticPagination({ onSearch }: AlphabeticPaginationProps){
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    return(
        <div>
            {
                alphabet.map(letter=>(
                    <Button sx={{color:'white'}} key={letter} onClick={()=> onSearch("f=" + letter)}>
                        {letter}
                    </Button>
                ))
            }
        </div>
    )
}