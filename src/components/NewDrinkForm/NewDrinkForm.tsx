import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Snackbar, Stack, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

interface IngredientProp {
    ingredient: string;
    measurement: string;
    ingredientError?: boolean;
    measurementError?: boolean;
    [key: string]: string | boolean | undefined;
  }

export default function NewDrinkForm({ onClose }: {onClose:() => void}){
    const [inputIngredientFields, setInputIngredientFields] = useState<IngredientProp[]>([
        { ingredient: "", measurement: "" },
      ]);
    const [name, setName] = useState<string>("");
    const [instructions, setInstructions] = useState<string>("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [nameError, setNameError] = useState<boolean>(false);
    const [instructionsError, setInstructionsError] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [submissionStatus, setSubmissionStatus] = useState<string>("");
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedImage(file);
        }
    };

      const handleChangeInput = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const values = [...inputIngredientFields];
        values[index][event.target.id as string] = event.target.value;

        if (event.target.id === 'ingredient') {
            values[index].ingredientError = event.target.value.length < 1;
        } else if (event.target.id === 'measurement') {
            values[index].measurementError = event.target.value.length < 1;
        }

        setInputIngredientFields(values);
      };
    
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isFormValid) {
            const filteredIngredients = inputIngredientFields.map(({ ingredient, measurement }) => ({ ingredient, measurement }));
            const formData = {
                name: name,
                ingredients: filteredIngredients,
                instructions: instructions,
                imageUrl: selectedImage?.name || "" 
            };
            
            const existingDrinks = localStorage.getItem("drinks");
            const drinksArray = existingDrinks ? JSON.parse(existingDrinks) : [];
            
            drinksArray.push(formData);
            try {
                localStorage.setItem("drinks", JSON.stringify(drinksArray));
            
                setInputIngredientFields([{ ingredient: "", measurement: "" }]);
                setName("");
                setInstructions("");
                setSelectedImage(null);
                setNameError(false);
                setInstructionsError(false);
                setSubmissionStatus("success");
            } catch (error) {
                setSubmissionStatus("error");
            }
            setOpenSnackbar(true);

        } else {
            setSubmissionStatus("error");
        }
    };
    
      const handleAddFields = () => {
        setInputIngredientFields([...inputIngredientFields, { ingredient: "", measurement: ""}]);
      };
    
      const handleRemoveFields = (index: number) => {
        if (inputIngredientFields.length > 1){
            const values = [...inputIngredientFields];
            values.splice(index, 1);
            setInputIngredientFields(values);}
        
      };

      const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        if (submissionStatus == "success") onClose()
        setSubmissionStatus("");
    };

      useEffect(() => {
        const ingredientErrors = inputIngredientFields.some(field => field.ingredientError || field.ingredient === "");
        const measurementErrors = inputIngredientFields.some(field => field.measurementError || field.measurement === "");
        setIsFormValid((!nameError && name != "")  && (!instructionsError && instructions !="") && !ingredientErrors && !measurementErrors);
    }, [inputIngredientFields, nameError, instructionsError, name, instructions]);

    useEffect(() => {
        console.log(submissionStatus)
        if (submissionStatus === "success" || submissionStatus === "error") {
            setOpenSnackbar(true);
        }
    }, [submissionStatus]);

    return(
        <div>
        <Dialog
            onClose={onClose}
            open={true}
          >
            <DialogTitle sx={{ m: 0, p: 2}}>
              Create New Cocktail
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
            <Box
                onSubmit={handleSubmit}
                component="form"
                sx={{
                m: 1 ,
                }}
                autoComplete="off"
            >
                <Stack spacing={1}>
                    <TextField
                    required
                    id="name"
                    label="Name"
                    value={name}
                    error={nameError}
                    helperText={nameError ? "Please Enter Cocktail's Name" : ""}
                    onChange={(e)=> (setName(e.target.value), e.target.validity.valid ? 
                        setNameError(false):setNameError(true))}
                    />
                    {inputIngredientFields.map((inputField, index) => (
                        <Stack direction="row" spacing={1} key={index}>
                            <TextField
                                required
                                id="ingredient"
                                label="Ingredient"
                                value={inputField.ingredient}
                                error={inputField.ingredientError}
                                helperText={inputField.ingredientError ? "Please enter ingredient" : ""}
                                onChange={(event) => handleChangeInput(index, event)}
                            />
                            <TextField
                            required
                            id="measurement"
                            label="Measurement"
                            value={inputField.measurement}
                            error={inputField.measurementError}
                            helperText={inputField.measurementError ? "Please enter ingredient" : ""}
                            onChange={(event) => handleChangeInput(index, event)}
                            />
                            <IconButton onClick={() => handleRemoveFields(index)}>
                                <RemoveIcon />
                            </IconButton>
                            <IconButton onClick={() => handleAddFields()}>
                                <AddIcon />
                            </IconButton>
                        </Stack>
                    ))}
                    <TextField
                    required
                    id="instructions"
                    label="Instructions"
                    multiline
                    value={instructions}
                    error={instructionsError}
                    helperText={instructionsError ? "Please Enter Instructions" : ""}
                    onChange={(e)=> (setInstructions(e.target.value), e.target.validity.valid ? 
                        setInstructionsError(false):setInstructionsError(true))}
                    />
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={() => handleImageChange}
                        />
                        {selectedImage && (
                            <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
                        )}
                    <Button
                        type="submit"
                        variant="outlined"
                        onClick={() => handleSubmit}
                        disabled={!isFormValid}>
                        Add Cocktail
                    </Button>
                </Stack>
            </Box>
            </DialogContent>
          </Dialog>
          <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          message={submissionStatus === "success" ? "Data saved successfully!" : "Failed to save data."}
      /></div>
    );
}