import {create} from "zustand";

const reducer = (state, {action, payload}) => {
    switch (action){
        case "change_stage":
            return {current_stage: payload.new_stage}
        case "change_workflow_type":
            return {workflow_type: payload.workflow};
        case "set_needed_functions":
            return {needed_functions: payload.functions_selected}
        case "set_api_key":
            return {api_key: payload.api_key}
        case "set_properties":
            return {properties: payload.properties}
        case "set_generated_code":
            return {generated_code: payload.generated_code}
        case "set_custom_object_id":
            return {custom_object_id: payload.custom_id}
    }
}

export const useWorkflowerStore = create((set) => ({
    current_stage: "home",
    workflow_type: "",
    needed_functions: [],
    api_key: "",
    properties: [],
    generated_code: "",
    custom_object_id: '',
    dispatch: (args) => set((state) => reducer(state, args))
}))