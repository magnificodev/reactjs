import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false,
}

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        deposit: (state, action) => {
            state.balance += action.payload;
            state.isLoading = false;
        },
        withdraw: (state, action) => {
            if (state.balance >= action.payload)
                state.balance -= action.payload;
        },
        requestLoan: {
            prepare: (amount, purpose) => {
                return {
                    payload: { amount, purpose },
                }
            },
            reducer: (state, action) => {
                if (state.loan === 0) {
                    state.loan = action.payload.amount;
                    state.loanPurpose = action.payload.purpose;
                    state.balance += action.payload.amount;
                }
            }
        },
        payLoan: (state) => {
            if (state.balance >= state.loan) {
                state.balance -= state.loan;
                state.loan = 0;
                state.loanPurpose = "";
            }
            else {
                state.loan -= state.balance;
                state.balance = 0;
            }
        },
        convertingCurrency: (state) => {
            state.isLoading = true;
        }
    }
})

export const { withdraw, requestLoan, payLoan, convertingCurrency } = accountSlice.actions;

export function deposit(amount, currency) {
    if (currency === "USD")
        return {
            type: "account/deposit",
            payload: amount,
        }
    return async function (dispatch, getState) {
        dispatch({ type: "account/convertingCurrency" });

        const res = await fetch(`https://api.frankfurter.dev/v1/latest?base=USD&symbols=${currency}`);
        const data = await res.json();
        const converted = amount / data.rates[currency];
        dispatch({
            type: "account/deposit",
            payload: converted,
        })
    }
}

export default accountSlice.reducer;

// export default function accountReducer(state = initialStateAccount, action) {
//     switch (action.type) {
//         case "account/deposit":
//             return {
//                 ...state,
//                 isLoading: false,
//                 balance: state.balance + action.payload,
//             }
//         case "account/withdraw":
//             if (state.balance >= action.payload)
//                 return {
//                     ...state,
//                     balance: state.balance - action.payload,
//                 }
//             return state;
//         case "account/requestLoan":
//             if (state.loan > 0) return state;
//             return {
//                 ...state,
//                 loan: action.payload.amount,
//                 loanPurpose: action.payload.purpose,
//                 balance: state.balance + action.payload.amount,
//             }
//         case "account/payLoan":
//             if (state.balance < state.loan) return {
//                 ...state,
//                 loan: state.loan - state.balance,
//                 balance: 0,
//             }
//             else
//                 return {
//                     ...state,
//                     loan: 0,
//                     loanPurpose: "",
//                     balance: state.balance - state.loan,
//                 }
//         case "account/convertingCurrency":
//             return {
//                 ...state,
//                 isLoading: true,
//             }
//         default:
//             return state;
//     }
// }

// // Action creator functions for account slice
// function deposit(amount, currency) {
//     if (currency === "USD")
//         return {
//             type: "account/deposit",
//             payload: amount,
//         }
//     return async function (dispatch, getState) {
//         dispatch({ type: "account/convertingCurrency" });

//         const res = await fetch(`https://api.frankfurter.dev/v1/latest?base=USD&symbols=${currency}`);
//         const data = await res.json();
//         const converted = amount / data.rates[currency];
//         dispatch({
//             type: "account/deposit",
//             payload: converted,
//         })
//     }
// }

// function withdraw(amount) {
//     return {
//         type: "account/withdraw",
//         payload: amount,
//     }
// }

// function requestLoan(amount, purpose) {
//     return {
//         type: "account/requestLoan",
//         payload: { amount, purpose },
//     }
// }

// function payLoan() {
//     return {
//         type: "account/payLoan",
//     }
// }

// export { deposit, withdraw, requestLoan, payLoan }