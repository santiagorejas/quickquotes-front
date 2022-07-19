import React from "react";
import QuotesList from "../../components/Quotes List/QuotesList";

const Home = () => {
  return (
    <div>
      <QuotesList URL={`${process.env.REACT_APP_API}/quote`} />
    </div>
  );
};

export default Home;
