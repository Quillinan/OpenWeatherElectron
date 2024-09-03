import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import TodayPage from "./pages/TodayPage";
import ResetStyle from "./styles/ResetStyle";

export default function App(): JSX.Element {
  return (
    <>
      <ResetStyle />
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodayPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
