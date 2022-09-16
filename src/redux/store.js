import { createStore } from "redux";
import { userReducer } from "./reducers/reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "persist-key",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export default store;
export { persistor };
