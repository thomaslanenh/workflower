import {ErrorMessage, Field, FieldArray, Form, Formik, useFormikContext} from 'formik';
import "./WorkflowFlow.css"
import {useWorkflowerStore} from '../WorkflowerStore.jsx'

const SelectProperties = () => {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted

    const dispatch = useWorkflowerStore(state => state.dispatch)

    const initialValues = { properties: [
            {
                name: ""
            }
        ] };

    return (
        <div className="App">
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {

                    dispatch({
                        action: "set_properties",
                        payload: {
                            properties: values.properties,
                        }
                    })

                    dispatch({
                        action: "change_stage",
                        payload: {
                            new_stage: "generation"
                        }
                    })
                }}
            >
                {({setFieldValue, isSubmiting, errors, touched, values}) => (
                    <div className="section">
                        <Form>
                            <label>
                                Set Property Internal Names
                            </label>
                            <FieldArray name={"properties"}>
                            {({insert, remove, push}) => (
                                <div>
                                    {values.properties.length > 0 &&
                                        values.properties.map((property, index) => (
                                            <div className="row" key={index}>
                                                <div className="col">
                                                    <label htmlFor={`properties.${index}.name`}>Internal Property Name</label>
                                                    <Field
                                                        name={`properties.${index}.name`}
                                                        placeholder="firstname"
                                                        type="text"
                                                        style={{
                                                            marginTop: 15,
                                                            display: "unset"
                                                        }}
                                                    />
                                                    <ErrorMessage
                                                        name={`properties.${index}.name`}
                                                        component="div"
                                                        className="field-error"
                                                    />
                                                </div>
                                                <div className="col">
                                                    <button
                                                        type="button"
                                                        className="secondary"
                                                        onClick={() => remove(index)}
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    <button
                                        type="button"
                                        className="secondary"
                                        onClick={() => push({name: ''})}
                                    >
                                        Add Property
                                    </button>
                                </div>

                            )}
                            </FieldArray>
                            <div>
                                <button type="submit">Generate Code</button>
                            </div>
                        </Form>
                    </div>
                )}

            </Formik>
        </div>
    )
};


export default SelectProperties;