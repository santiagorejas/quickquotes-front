import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHttp } from "../../hooks/use-http";
import Card from "../UI/Card/Card";
import classes from "./QuotesList.module.css";
import LoadingSpinner from "../UI/Loading Spinner/LoadingSpinner";

const QuotesList = (props) => {
  const { isLoading, error, clearError, sendRequest } = useHttp();
  const [quotes, setQuotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const data = await sendRequest(`${props.URL}?page=${currentPage}`);
        setQuotes(data.quotes);
        setPageCount(data.totalPages);
      } catch (err) {
        console.log(err);
      }
    };

    fetchQuotes();
  }, [sendRequest, currentPage]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (quotes.length === 0) return <h1>No quotes were found</h1>;

  return (
    <div>
      <ul className={classes["quotes-list"]}>
        {quotes.map((quote) => (
          <li className={classes["quote"]}>
            <Card>
              <h3 className={classes["quote__content"]}>{quote.content}</h3>
              <p className={classes["quote__author"]}>{quote.author}</p>
            </Card>
          </li>
        ))}
      </ul>
      <Pagination
        count={pageCount}
        onChange={(e) => {
          setCurrentPage(e.currentTarget.textContent);
        }}
      />
    </div>
  );
};

export default QuotesList;
