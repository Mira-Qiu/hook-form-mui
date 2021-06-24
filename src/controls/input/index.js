import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";

function FormInput(props) {
    const { control } = useFormContext();
    const { name, label, required, errorobj } = props;
    let isError = false;
    let errorMessage = "";
    if(errorobj && errorobj.hasOwnProperty(name)){
        isError=true;
        errorMessage=errorobj[name].message;
    }

    return (
        <Controller
            render = {({ field})=> (
                <TextField
                    fullWidth
                    label={label}
                    required
                    error={isError}
                    helperText={errorMessage}
                />
            )}
            as={TextField}
            name={name}
            control={control}
            InputLabelsProps={{
                className:required? "required-label":"",
                required:required||false,
            }}
            defaultValue=""
            fullWidth={true}
            {...props}
        />
    );
}

export default FormInput;
