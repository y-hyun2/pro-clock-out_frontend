import "./App.css";
import Navbar from "./components/Navbar.js";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.js";
import Main from "./pages/Main.js";
import Analytics from "./pages/Analytics.js";
import Calendar from "./pages/Calendar.js";
import Daily from "./pages/Daily.js";
import Recommend from "./pages/Recommend.js";
import Signin from "./pages/SigninPage.js";
import Mypage from "./pages/Mypage.js";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes> 
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/analytics" element={<Analytics></Analytics>}></Route>
        <Route path="/calander" element={<Calendar></Calendar>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/login/signin" element={<Signin></Signin>}></Route>
        <Route path="/daily" element={<Daily></Daily>}></Route>
        <Route path="/recommend" element={<Recommend></Recommend>}></Route>
        <Route path="/mypage" element={<Mypage></Mypage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
