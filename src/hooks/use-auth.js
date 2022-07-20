import { useState, useEffect, useCallback } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(null);
  const [nickname, setNickname] = useState(null);

  const login = useCallback((uid, token, nickname, expirationDate) => {
    setToken(token);
    setNickname(nickname);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        nickname: nickname,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    setUserId(uid);
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (
      userData &&
      userData.token &&
      new Date(userData.expiration) > new Date()
    ) {
      login(
        userData.userId,
        userData.token,
        userData.nickname,
        new Date(userData.expiration)
      );
    }
  }, [login]);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setNickname(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  return { token, login, logout, userId, nickname };
};
