import { Route, Routes } from "react-router";

import { SignUp } from "./pages/signup";
import { Main } from "./pages/main";
import { PostsProvider } from "./contexts/PostsContext";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route
        path="/main"
        element={
          <PostsProvider>
            <Main />
          </PostsProvider>
        }
      />
    </Routes>
  );
}
