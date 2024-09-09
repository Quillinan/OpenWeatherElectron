import { HashRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import TodayPage from "./pages/TodayPage";
import ResetStyle from "./styles/ResetStyle";

export default function App() {
  return (
    <>
      <ResetStyle />
      <GlobalStyle />
      <HashRouter>
        <Routes>
          <Route path="/" element={<TodayPage />} />
        </Routes>
      </HashRouter>
    </>
  );
}
