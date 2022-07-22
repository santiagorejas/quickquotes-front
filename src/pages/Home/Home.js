import React, { useEffect, useState } from "react";
import QuotesList from "../../components/Quotes List/QuotesList";
import LoadingSpinner from "../../components/UI/Loading Spinner/LoadingSpinner";
import { useHttp } from "../../hooks/use-http";

const Home = () => {
  const { isLoading, error, clearError, sendRequest } = useHttp();
  const [quotes, setQuotes] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_API}/quote?page=${currentPage}`
        );
        setQuotes(data.quotes);
        setPageCount(data.totalPages);
      } catch (err) {
        console.log(err);
      }
    };

    fetchQuotes();
  }, [sendRequest, currentPage]);

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

export default Home;
