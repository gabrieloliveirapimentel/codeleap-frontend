import { Route, Routes } from "react-router";

import { SignUp } from "./pages/signup";
import { Main } from "./pages/main";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  );
}
