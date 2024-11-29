import { combineReducers } from "redux";
import userReducer from "./slices/user-slice"
import productReducer from "./slices/product-slice"
import loginUserReducer from "./slices/login-user-slice"
const rootReducer = combineReducers({
    usersList:userReducer,
    productList:productReducer,
    loginUser:loginUserReducer
})

export default rootReducer

// Infer RootState type from rootReducer
export type RootState = ReturnType<typeof rootReducer>;