
import {useState} from 'react';
import {Field, Form, Formik, useFormikContext} from 'formik';
import "./WorkflowFlow.css"
import {useWorkflowerStore} from '../WorkflowerStore.jsx'

const SelectFunctions = () => {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted

    const dispatch = useWorkflowerStore(state => state.dispatch)
    const workflow_type = useWorkflowerStore(state => state.workflow_type)


    const initialValues = { function_types: [] };

    return (
        <div className="App">
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {

                    dispatch({
                        action: "set_needed_functions",
                        payload: {
                            functions_selected: values.function_types,
                        }
                    })

                    dispatch({
                        action: "change_stage",
                        payload: {
                            new_stage: "set_properties"
                        }
                    })
                }}
            >
                {({setFieldValue, isSubmiting, errors, touched}) => (
                    <div className="section">
                        <Form>
                            <label>
                                Select Functionality:
                            </label>
                            <div role={"group"} aria-labelledby={"checkbox-group"} style={{marginTop: 15}}>
                                <label>
                                    <Field type={"checkbox"} name={"function_types"} value={"create"}
                                           style={{display: "unset"}}/>
                                    Create
                                </label>
                                <label>
                                    <Field type={"checkbox"} name={"function_types"} value={"update"}
                                           style={{display: "unset"}}/>
                                    Update
                                </label>
                                {/*<label>*/}
                                {/*    <Field type={"checkbox"} name={"function_types"} value={"merge"}*/}
                                {/*           style={{display: "unset"}}/>*/}
                                {/*    Merge*/}
                                {/*</label>*/}
                            </div>
                            <div>
                                <button type="submit">Next</button>
                            </div>
                        </Form>
                    </div>
                )}

            </Formik>
        </div>
    )
};


export default SelectFunctions;