import { combineReducers } from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router";
import { AuthReducer, authReducer } from "./auth";
import { messageReducer, messageState } from "./messages";
import { provinceReducer, ProvinceReducer } from "./province";
import { customerReducer, CustomerReducer } from "./customer";
import { productsReducer, ProductsReducer } from "./products";
import { InitReducer, initReducer } from "./init";

export interface reducerType {
  province: ProvinceReducer;
  router: {
    location: {
      pathname: string;
      search: string;
      hash: string;
      query?: any;
    };
    action: string;
  };
  auth: AuthReducer;
  message: messageState;
  customer: CustomerReducer;
  products: ProductsReducer;
  init: InitReducer;
}

const createRootReducer: any = (history: History) => {
  const reducers = combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    message: messageReducer,
    province: provinceReducer,
    customer: customerReducer,
    products: productsReducer,
    init: initReducer,
  });
  return reducers;
};

export default createRootReducer;
