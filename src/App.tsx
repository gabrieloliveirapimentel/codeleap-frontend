import { Route, Routes } from "react-router";
import { Provider } from "react-redux";

import { SignUp } from "./pages/signup";
import { Main } from "./pages/main";

import { store } from "./store";
import { Toaster } from "react-hot-toast";

export function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route
          path="/main"
          element={
            <Provider store={store}>
              <Main />
            </Provider>
          }
        />
      </Routes>
    </>
  );
}
