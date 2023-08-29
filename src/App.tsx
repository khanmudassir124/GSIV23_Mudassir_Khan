import React from "react";
import { Provider } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import store from "./redux/store";
import MovieList from "./screens/MovieList";
import MovieDetail from "./screens/MovieDetail";

function App() {
  const routes = {
    MovieList: "MovieList",
    MovieDetail: "MovieDetail",
  };
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.MovieList} element={<MovieList />}></Route>
          <Route path={routes.MovieDetail} element={<MovieDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
