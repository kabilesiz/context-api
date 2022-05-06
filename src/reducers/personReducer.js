const personReducer = (state, action) => {
    switch (action.method) {
        case "ADD_PERSON":
            let id = 1;
            if (state.length > 0) {
                id = state[state.length - 1].id + 1;
            }
            action.person.id = id;
            action.person.key = id;
            state = [...state, action.person];
            return state;

        case "REMOVE_PERSON":
            state = state.filter((x) => x.id !== action.id);
            return state;

        case "EDIT_PERSON":
            const index = state.findIndex(course => course.id === action.person.id);
            state[index] = {
                ...state[index],
                ...action.person,
            };
            return state;

        default:
            return state;
    }
};

export default personReducer;