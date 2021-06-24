import React, {useEffect, useState} from "react";
import {useFormContext, Controller} from "react-hook-form";
import Select, {createFilter} from "react-select";
import {StyledFormControl, StyledAutoSelectInputLabel} from "../styles";
import {FormHelperText} from "@material-ui/core";

import "./index.css";

const stylesReactSelect = {
    clearIndicator: (provided, state) => ({
        ...provided,
        cursor: "pointer",
    }),
    indicatorSeparator: (provided, state) => ({
        ...provided,
        margin: 0,
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        cursor: "pointer",
    }),
    placeholder: (provided, state) => ({
        ...provided,
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        color: state.selectProps.error ? "#f44336" : "rgba(0,0,0,0.54)",
    }),
    control: (provided, state) => ({
        ...provided,
        borderRadius: 0,
        border: 0,
        borderBottom: state.selectProps.error ?
            "1px solid #f44336" :
            "1px solid rgba(0,0,0,0.87)",
        borderShadow: "none",
        ":hover": {
            borderColor: state.selectProps.error ? "1px solid #f44336" : "inherit",
            boxShadow: state.selectProps.error ? "1px solid #f44336" : "none",
        },
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        paddingLeft: 0,
    }),
};

const components = {Option,};

function Option(props) {
    const {onMouseMove, onMouseOver, ...newInnerProps} = props.innerProps;
    return (
        <div {...newInnerProps} className="autoselect-options">
            {props.children}
        </div>
    )
}

function ReactSelect(props) {
    const {label, options, name, errorobj,required} = props;
    let isError = false;
    let errorMessage = "";
    if (errorobj && errorobj.hasOwnProperty(name)) {
        isError = true;
        errorMessage = errorobj[name].message;
    }
    return (
        <React.Fragment>
            <StyledFormControl>
                <StyledAutoSelectInputLabel>
                    <span>
                        {label}{required ? <span className="req-label">*</span> : null}
                    </span>
                </StyledAutoSelectInputLabel>
                <Select
                    options={options}
                    placeholder="Please select"
                    valueKey="id"
                    components={components}
                    isClearable={true}
                    error={isError}
                    styles={stylesReactSelect}
                    isSearchable={true}
                    filterOption={createFilter({ignoreAccents: false})}
                    {...props}
                />
                {isError && (
                    <FormHelperText error={isError}>{errorMessage}</FormHelperText>
                )}
            </StyledFormControl>
        </React.Fragment>
    )
};

function FormSelectAutoComplete(props) {
    const {control} = useFormContext();
    const {name, label, options} = props;

    const [newData, setNewData] = useState([]);

    useEffect(() => {
        const newOptions = options.map((data, index) => ({
            label: data.label,
            value: data.id,
        }))
        setNewData(newOptions);
    }, [options]);

    return (
        <React.Fragment>
            <Controller
                render={() => (
                    <ReactSelect
                        name={name}
                        label={label}
                        options={newData}
                    />
                )}
                name={name}

                control={control}
                as={ReactSelect}
                {...props}
            />
        </React.Fragment>
    )
}

export default FormSelectAutoComplete;
