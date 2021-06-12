import React, { createContext, useContext, useReducer } from "react";
//create the context of the data layer provider
export const StateProviderContext = createContext();

// data layer state provider configuration with the reducer.
export const StateProvider = ({ initialState, reducer, children }) => (
    <StateProviderContext.Provider value={useReducer(reducer, initialState)}>{children}</StateProviderContext.Provider>
);
// finally pull reduxed information(only what is needed) from state provider layer or data layer
export const useStateProviderContextValue = () => useContext(StateProviderContext);