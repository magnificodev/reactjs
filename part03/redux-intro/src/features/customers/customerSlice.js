import { createSlice } from "@reduxjs/toolkit";

// Initial state for customer slice
const initialState = {
    fullName: "",
    nationalID: "",
    createdAt: "",
}

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        createCustomer: {
            prepare(fullName, nationalID) {
                return {
                    payload: { fullName, nationalID }
                }
            },
            reducer(state, action) {
                state.fullName = action.payload.fullName;
                state.nationalID = action.payload.nationalID;
                state.createdAt = new Date().toISOString();
            }
        },
        updateName: (state, action) => {
            state.fullName = action.payload;
        }
    }
})

export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;


// // Reducer function for customer slice
// export default function customerReducer(state = initialStateCustomer, action) {
//     switch (action.type) {
//         case "customer/createCustomer":
//             return {
//                 ...state,
//                 ...action.payload,
//             }
//         case "customer/updateName":
//             return {
//                 ...state,
//                 fullName: action.payload,
//             }
//         default:
//             return state;
//     }
// }

// // Action creator functions for customer slice
// function createCustomer(fullName, nationalID) {
//     return {
//         type: "customer/createCustomer",
//         payload: { fullName, nationalID, createdAt: new Date().toISOString() }
//     }
// }

// function updateName(fullName) {
//     return {
//         type: "customer/updateName",
//         payload: fullName,
//     }
// }

// export { createCustomer, updateName }