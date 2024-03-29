import { GET_TASKS, DELETE_TASK, ADD_TASK } from '../actions/types.js';

const initialStata = {
    tasks: []
}

export default function (state = initialStata, action) {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id != action.payload)
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        default:
            return state;
    }
}