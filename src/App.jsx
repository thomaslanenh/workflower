import { useState } from 'react'
import './App.css'
import {useWorkflowerStore} from './WorkflowerStore.jsx'
import SelectWorkflow from "./Components/WorkflowForm.jsx";
import SelectFunctions from "./Components/SelectFunctions.jsx";
import SelectProperties from "./Components/SelectProperties.jsx";
import GeneratingCode from "./Components/GeneratingCode.jsx";


function App() {
    const [count, setCount] = useState(0)
    const dispatch = useWorkflowerStore(state => state.dispatch)
    const current_stage = useWorkflowerStore(state => state.current_stage)


    const returnHome = () =>{
        dispatch({
            action: "change_stage",
            payload: {
                current_stage: "home"
            }
        })
    }
    const renderCurrentStage = () => {
        switch(current_stage){
            case "home":
                return (
                    <>
                        <div>
                            <SelectWorkflow/>
                        </div>
                    </>
                )
            case "select_functions":
                return (
                    <>
                        <SelectFunctions/>
                    </>
                )
            case "set_properties":
                return (
                    <>
                        <SelectProperties/>
                    </>
                )
            case "generation":
                return (
                    <>
                        <GeneratingCode/>
                    </>
                )
        }
    }


    return (
        <div>
            <h1 onClick={returnHome}>🌸 Workflower 🌸</h1>
            {renderCurrentStage()}
        </div>
    )
}

export default App
