import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import * as reducers from "../components/reducers";

const globalReducers = combineReducers({
  images: reducers.ImagesListReducer,
  // image: ImagesListReducer,
  image_upload: reducers.ImageUploadReducer,
  data: reducers.DataReducer,
});

const preloadedState = {
  //token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
}; // read from cookies / local storage

export const store = configureStore({
  reducer: globalReducers,
  devTools: true,
  // @ts-ignore
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  // @ts-ignore
  preloadedState: preloadedState,
});
