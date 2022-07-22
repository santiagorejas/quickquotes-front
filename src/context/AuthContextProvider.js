import { useEffect, useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useHttp } from "../hooks/use-http";
import { AuthContext } from "./AuthContext";

const AuthContextProvider = (props) => {
  const [favs, setFavs] = useState([]);

  const { sendRequest } = useHttp();
  const { token, login, logout, userId, nickname } = useAuth();

  const setFavorites = (favoritesList) => {
    setFavs(favoritesList);
  };

  const addFavorite = async (qid, liked) => {
    if (liked) {
      setFavorites((pre) => [...pre, qid]);
    } else {
      setFavorites((pre) => pre.filter((id) => id !== qid));
    }

    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_API}/like/${qid}`,
        "POST",
        JSON.stringify({
          like: liked,
        }),
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      console.log(err);
      if (!liked) {
        setFavorites((pre) => [...pre, qid]);
      } else {
        setFavorites((pre) => pre.filter((id) => id !== qid));
      }
    }
  };

  const isFavorite = (qid) => {
    return favs.includes(qid);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        login,
        logout,
        userId,
        nickname,
        favorites: favs,
        setFavorites,
        addFavorite,
        isFavorite,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
