import React from "react";
import {useFormContext, Controller} from "react-hook-form";
import {MenuItem, FormControl, Select, InputLabel, FormHelperText} from "@material-ui/core";

const MuiSelect = (props) => {
    const {label, name, options, required, errorobj} = props;
    let isError = false;
    let errorMessage = "";
    if (errorobj && errorobj.hasOwnProperty(name)) {
        isError = true;
        errorMessage = errorobj[name].message;
    }
    return (
        <FormControl fullWidth={true}>
            <InputLabel htmlFor={name}>
                {label} {required ? <span className="req-label">*</span> : null}
            </InputLabel>
            <Select id={name} {...props}>
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {options.map((item) => (
                    <MenuItem key={item.id}
                              value={item.id}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
            {isError && (
                <FormHelperText error={isError}>{errorMessage}</FormHelperText>
            )}
        </FormControl>
    )
}

function FormSelect(props) {
    const {control} = useFormContext();
    const {name, label, options} = props;
    return (
        <React.Fragment>
            <Controller
                render={({field}) => (
                    <MuiSelect
                        name={name}
                        label={label}
                        options={options}
                    />
                )}
                as={MuiSelect}
                name={name}
                fullWidth={true}
                control={control}
                defaultValue=""
                {...props}
            />
        </React.Fragment>
    )
}

export default FormSelect;
