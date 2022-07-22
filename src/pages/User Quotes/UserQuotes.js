import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuotesList from "../../components/Quotes List/QuotesList";
import LoadingSpinner from "../../components/UI/Loading Spinner/LoadingSpinner";
import { useHttp } from "../../hooks/use-http";

const UserQuotes = () => {
  const { isLoading, error, clearError, sendRequest } = useHttp();
  const [quotes, setQuotes] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(null);

  const { uid } = useParams();

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_API}/quote/user/${uid}?page=${currentPage}`
        );
        setQuotes(data.quotes);
        setPageCount(data.totalPages);
      } catch (err) {
        console.log(err);
      }
    };

    fetchQuotes();
  }, [sendRequest, currentPage, uid]);

  return (
    <div>
      {(isLoading || !quotes) && <LoadingSpinner />}
      {!isLoading && quotes && (
        <QuotesList
          quotes={quotes}
          pageCount={pageCount}
          setCurrentPage={(e, value) => {
            setCurrentPage(value);
          }}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default UserQuotes;
