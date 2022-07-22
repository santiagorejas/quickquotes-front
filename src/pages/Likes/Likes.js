import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import QuotesList from "../../components/Quotes List/QuotesList";
import LoadingSpinner from "../../components/UI/Loading Spinner/LoadingSpinner";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/use-http";

const Likes = () => {
  const { isLoading, error, clearError, sendRequest } = useHttp();
  const [quotes, setQuotes] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(null);

  const { token, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_API}/quote/favorites?page=${currentPage}`,
          "GET",
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );
        setQuotes(data.quotes);
        setPageCount(data.totalPages);
      } catch (err) {
        console.log(err);
      }
    };

    fetchQuotes();
  }, [sendRequest, currentPage, token]);

  if (!isLoggedIn) return <Navigate to="/" />;

  return (
    <div>
      {(isLoading || !quotes) && <LoadingSpinner />}
      {!isLoading && quotes && (
        <QuotesList
          URL={`${process.env.REACT_APP_API}/quote`}
          quotes={quotes}
          pageCount={pageCount}
          setCurrentPage={(e) => {
            setCurrentPage(e.currentTarget.textContent);
          }}
        />
      )}
    </div>
  );
};

export default Likes;
