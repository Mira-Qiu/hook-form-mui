import React from "react";
import {useForm, FormProvider} from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import FormInput from "./controls/input";
import FormSelect from "./controls/select";
import FormSelectAutoComplete from "./controls/select-autocomplete";

import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const validationSchema = yup.object().shape({
    nameV: yup.string().required("Name Validation Field is Required"),
    selV: yup.string().required("Select Validation Field is Required"),
    SelAutoV: yup.array().required("Multi Select Validation Field required"),
});


function App(props) {
    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });
    const {handleSubmit, errors} = methods;

    const onSubmit = (data) => {
        console.log(data);
    };

    const numberData = [
        {
            id: "10",
            label: "Ten",
        },
        {
            id: "20",
            label: "Twenty",
        },
        {
            id: "30",
            label: "Thirty",
        },
    ];

    return (
        <div style={{padding: "10px"}}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
            >
                SUBMIT
            </Button>

            <div style={{padding: "10px"}}>
                <FormProvider {...methods}>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormInput
                                    name="name"
                                    label="Name"
                                    required={true}
                                    errorobj={errors}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormSelect
                                    name="sel"
                                    label="Number"
                                    options={numberData}
                                    required={true}
                                    errorobj={errors}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormSelectAutoComplete
                                    name="selAuto"
                                    label="Auto Select Numbers"
                                    options={numberData}
                                    isMulti
                                    required={true}
                                    errorobj={errors}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}

export default App;
