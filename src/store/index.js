import { booksReducer } from "./reducers/booksReducer";
import { libraryReducer } from "./reducers/libraryReducer";
import { authReducer } from "./reducers/authReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { composeWithDevTools } from "redux-devtools-extension";

const presistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["authReducer"],
};

const rootReducer = combineReducers({
  authReducer,
  booksReducer,
  libraryReducer,
});
const persistedReducer = persistReducer(presistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
let persistor = persistStore(store);

export { persistor, store };
