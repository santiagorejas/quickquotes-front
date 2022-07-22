import { useEffect, useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useHttp } from "../hooks/use-http";
import { AuthContext } from "./AuthContext";

const AuthContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);

  const { sendRequest } = useHttp();
  const { token, login, logout, userId, nickname } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_API}/quote/favorites-id`,
          "GET",
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );
        setFavorites(data.quotes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFavorites();
  }, [sendRequest, token]);

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
      console.log(data);
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
    return favorites?.includes(qid);
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
        favorites,
        addFavorite,
        isFavorite,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
