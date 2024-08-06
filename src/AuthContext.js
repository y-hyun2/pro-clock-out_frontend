import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 로컬 스토리지에서 로그인 상태를 읽어와서 초기값으로 설정
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // 로컬 스토리지의 'isLoggedIn' 키의 값이 'true'이면 true 반환, 그 외는 false 반환
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const login = () => {
    localStorage.setItem("isLoggedIn", "true"); // 로컬 스토리지에 로그인 상태 저장
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn"); // 로컬 스토리지에서 로그인 상태 제거
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
