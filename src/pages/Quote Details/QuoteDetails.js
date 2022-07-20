import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/UI/Card/Card";
import { useHttp } from "../../hooks/use-http";
import LoadingSpinner from "../../components/UI/Loading Spinner/LoadingSpinner";
import classes from "./QuoteDetails.module.css";
import NewComment from "../../components/Comments/NewComment";
import Comments from "../../components/Comments/Comments";

const QuoteDetails = () => {
  const { qid } = useParams();

  const { isLoading, error, clearError, sendRequest } = useHttp();

  const [comments, setComments] = useState([]);
  const [quoteDetails, setQuoteDetails] = useState(null);

  const onAddCommentHandler = (comment) => {
    setComments((pre) => [...pre, comment]);
  };

  const onDeleteCommentHandler = (cid) => {
    setComments((pre) => pre.filter((comment) => comment._id !== cid));
  };

  useEffect(() => {
    const fetchQuoteDetails = async () => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_API}/quote/${qid}`
        );
        setComments(data.comments);
        setQuoteDetails(data.quote);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchQuoteDetails();
  }, [sendRequest]);

  if (isLoading || !quoteDetails) return <LoadingSpinner />;

  return (
    <Card className={classes["quote-details"]}>
      <div className={classes["quote-details__content"]}>
        <i className="fa-solid fa-quote-left"></i>
        <h1>{quoteDetails.content}</h1>
        <i className="fa-solid fa-quote-right"></i>
      </div>
      <Comments comments={comments} onDeleteComment={onDeleteCommentHandler} />
      <NewComment quoteId={qid} onAddComment={onAddCommentHandler} />
    </Card>
  );
};

export default QuoteDetails;
