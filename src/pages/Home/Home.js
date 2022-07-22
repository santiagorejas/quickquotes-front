import React, { useEffect, useState } from "react";
import NewQuote from "../../components/New Quote/NewQuote";
import QuotesList from "../../components/Quotes List/QuotesList";
import LoadingSpinner from "../../components/UI/Loading Spinner/LoadingSpinner";
import { useHttp } from "../../hooks/use-http";

const Home = () => {
  const { isLoading, error, clearError, sendRequest } = useHttp();
  const [quotes, setQuotes] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(null);

  const onAddQuote = (quote) => {
    if (currentPage === 1) setQuotes((pre) => [quote, ...pre].slice(0, 12));
  };

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
      <NewQuote onAddQuote={onAddQuote} />
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

export default Home;
