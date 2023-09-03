import React from "react";
import { Provider } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import store from "./redux/store";
import MovieList from "./screens/MovieList";
import MovieDetailScreen from "./screens/MovieDetailScreen";

function App() {
  const routes = {
    MovieList: "/",
    MovieDetail: "/:id",
  };
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.MovieList} element={<MovieList />} index></Route>
          <Route
            path={routes.MovieDetail}
            element={<MovieDetailScreen />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
