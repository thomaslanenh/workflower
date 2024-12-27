
import {useState} from 'react';
import {Field, Form, Formik, useFormikContext} from 'formik';
import "./WorkflowFlow.css"
import {useWorkflowerStore} from '../WorkflowerStore.jsx'

const SelectWorkflow = () => {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted

    const dispatch = useWorkflowerStore(state => state.dispatch)

    const [isCustom, setIsCustom] = useState(false);

    const handleCustomChange = async (value) => {

        if(value === "custom_object"){
            setIsCustom(true);
        }
        else{
            setIsCustom(false);
        }
    }

    const setFieldValue = useFormikContext()
    const initialValues = { workflow_type: "company" };
    return (
        <div className="App">
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                    dispatch({
                        action: "change_workflow_type",
                        payload: {
                            workflow: values.workflow_type,
                        }
                    })

                    if(values.custom_object_id){
                        dispatch({
                            action: "set_custom_object_id",
                            payload: {
                                custom_id: values.custom_object_id,
                            }
                        })
                    }

                    dispatch({
                        action: "set_api_key",
                        payload: {
                            api_key: values.private_token
                        }
                    })

                    dispatch({
                        action: "change_stage",
                        payload: {
                            new_stage: "select_functions"
                        }
                    })
                }}
            >
                {({setFieldValue, isSubmiting, errors, touched}) => (
                    <div className="section">
                        <Form>
                            <label>
                                Select Workflow Type
                            </label>
                            <Field as={"select"} name={"workflow_type"} style={{marginTop: 25}} onChange={e => {
                                handleCustomChange(e.target.value)
                                setFieldValue("workflow_type", e.target.value)
                            }}>
                                <option value={"contact"}>Contact</option>
                                <option value={"company"}>Company</option>
                                <option value={"Deal"}>Deal</option>
                                <option value={"customobject"}>Custom Object</option>
                            </Field>
                            {isCustom && <>
                                    <label htmlFor={"custom_object_id"}>Custom Object ID</label>
                                    <span style={{fontStyle: "italic", fontSize: 12}}>Enter the custom object ID here.</span>
                                    <Field style={{marginTop: 15, marginLeft: "auto", marginRight: "auto"}} type={"text"} name={"custom_object_id"}
                                        placeholder={"2-829529"}
                                    />
                                </>
                            }
                            <label>Private Token Name</label>
                            <Field style={{marginTop: 15, marginLeft: "auto", marginRight: "auto"}} type={"text"} name={"private_token"}
                                   placeholder={"API_KEY"}
                            />
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


export default SelectWorkflow;