import { combineReducers } from "redux";
import userReducer from "./slices/user-slice"
import productReducer from "./slices/product-slice"

const rootReducer = combineReducers({
    usersList:userReducer,
    productList:productReducer
})

export default rootReducer

// Infer RootState type from rootReducer
export type RootState = ReturnType<typeof rootReducer>;