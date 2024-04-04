import { Grid, IconButton, InputBase, Paper } from "@mui/material";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

interface SearchProps {
    onSearch: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps){
    var [inputValue, setInputValue] = useState<string>('');

    function handleKeyDown(event: React.KeyboardEvent<HTMLElement>){
        if (event.key === "Enter"){
            onSearch("s="+inputValue);  
        }
    }
    return(
      <div>
        <Grid container justifyContent="right" alignItems="right"
      sx={{mx: 'auto', p: 1, m: 1}}>
          <Paper
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search cocktails by name"
          onChange={event => {setInputValue(event.target.value)}}
          error={inputValue === "" ? true : false}
          onKeyDown={handleKeyDown}
        />
        <IconButton onClick={() => onSearch("s="+ inputValue)} type="button" sx={{ p: '10px' }}>
          <SearchIcon />
        </IconButton>
      </Paper>
      </Grid>
    </div>
    );
}