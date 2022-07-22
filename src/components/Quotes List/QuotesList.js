import { Pagination } from "@mui/material";
import React, { useContext } from "react";
import Card from "../UI/Card/Card";
import classes from "./QuotesList.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const QuotesList = ({ quotes, pageCount, setCurrentPage, currentPage }) => {
  const navigate = useNavigate();

  const { isFavorite } = useContext(AuthContext);

  if (quotes?.length === 0) return <h1>No quotes were found</h1>;

  return (
    <div className={classes["quotes-list-container"]}>
      <ul className={classes["quotes-list"]}>
        {quotes.map((quote) => (
          <li onClick={() => navigate(`/quote/${quote._id}`)}>
            <Card
              className={classes["quote"]}
              style={{
                borderColor: isFavorite(quote._id) ? "#e74c3c" : "#494e5e",
              }}
            >
              <div className={classes["quote__content"]}>
                <i className="fa-solid fa-quote-left"></i>
                <h3>{quote.content}</h3>
                <i className="fa-solid fa-quote-right"></i>
              </div>
              <p className={classes["quote__author"]}>{quote.author}</p>
            </Card>
          </li>
        ))}
      </ul>
      <Pagination
        defaultPage={currentPage}
        count={pageCount}
        variant="outlined"
        className={classes["quotes-list__pagination"]}
        onChange={setCurrentPage}
      />
    </div>
  );
};

export default QuotesList;
