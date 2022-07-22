import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  nickname: null,
  token: null,
  login: () => {},
  logout: () => {},
  favorites: [],
  addFavorite: (qid, liked) => {},
  isFavorite: (qid) => {},
});
