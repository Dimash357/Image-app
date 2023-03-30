import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./components/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostImage from "./pages/PostImage";
import "./css/index.css";
import "./css/bootstrap_5_3/bootstrap.css";
import axios from "axios";
import * as constants from "./components/constants";

axios.defaults.baseURL = `${constants.SERVER_ADDRESS}:${constants.SERVER_PORT}/api/`;

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<PostImage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
