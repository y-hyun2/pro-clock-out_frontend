import "./App.css";
import Navbar from "./components/toolbar/Navbar.jsx";
import Footer from "./components/toolbar/Footer.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import Main from "./pages/Main.js";
import Analytics from "./pages/Analytics.js";
import Calendar from "./pages/Calendar.js";
import Daily from "./pages/Daily.js";
import Recommend from "./pages/Recommend.js";
import Signin from "./pages/SigninPage.jsx";
import Nickname from "./components/signin/Nickname.jsx";
import Mypage from "./pages/Mypage.jsx";
import { GlobalStyle, AppContainer } from "./styles/GlobalStyles";

function App() {
  const location = useLocation();
  const noFooterPaths = ["/login", "/login/signin"]; // Footer를 표시하지 않을 경로

  return (
    <div>
      <GlobalStyle />
      <AppContainer>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/calander" element={<Calendar />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/signin" element={<Signin />} />
          <Route path="/login/signin/nickname" element={<Nickname />} />
          <Route path="/daily" element={<Daily />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </AppContainer>
      {!noFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
