import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Modal, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Cocktail } from "../../utils/types";

interface Ingredient{
    name: string | null;
    measurement: string | null;
}

export default function Recipe({onClose, cocktail }: 
    {onClose:() => void, cocktail: Cocktail}) {

        var ingredients = new Array<Ingredient>(15);

        for (var i = 0; i < 15; i++) {
            ingredients[i] = {name: null, measurement: null};
        }

        for (const [key, value] of Object.entries(cocktail)) {
            if (key.includes("strIngredient") && value){
                let num = key.split("strIngredient")[1]
                ingredients[Number(num) - 1].name = value
            } else if (key.includes("strMeasure") && value){
                let num = key.split("strMeasure")[1]
                ingredients[Number(num) - 1].measurement = value
            }
        }

        return( <Dialog
            onClose={onClose}
            open={true}
          >
            <DialogTitle sx={{ m: 0, p: 2 }}>
              {cocktail.strDrink} Recipe
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
         <Stack direction="row" spacing={2} justifyContent="space-between">
         <Box
  component="img"
  sx={{
    height: 233,
    width: 350,
    maxHeight: { xs: 233, md: 167 },
    maxWidth: { xs: 350, md: 250 },
  }}
  src={cocktail.strDrinkThumb}
/><div><Typography variant="h6" sx={{fontWeight: 'bold'}}>
            Ingredients
              </Typography>
            {ingredients.map((item) => item.name && item.measurement ? <Stack direction="row" justifyContent="space-between"><Typography paddingRight={3} gutterBottom> {item.name}</Typography> <Typography gutterBottom> {item.measurement}</Typography></Stack>: <></>)}</div>
            </Stack>
            
            <Typography variant="h6" sx={{fontWeight: 'bold'}}>
            Instructions
              </Typography>
            <Typography gutterBottom>
                {cocktail.strInstructions}
              </Typography>
            </DialogContent>
          </Dialog>)
}