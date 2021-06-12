export const initialState = {
    user: null,
};
export const actionTypes = {
    SET_USER: "SET_USER",
};
// Reducer Job: Receive actions from the user(via the server) and perform the actions and push the action data
// into the state(initialState) for the data layer or state provider to consume.
const reducer = (state, action) => {
    console.log(
        "Reducer: Setting the incoming api data into the data layer/state provider context"
    );
    console.log(action);
    //action has 2 types-> type, [incoming payload/data from server]
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user,
            };
        default:
            return state;
    }
};
export default reducer;