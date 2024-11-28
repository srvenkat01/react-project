import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuoteListPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get(
          `https://assignment.stage.crafto.app/getQuotes?limit=20&offset=${offset}`,
          { headers: { Authorization: token } }
        );
        if (response.data.length === 0) setHasMore(false);
        setQuotes((prev) => [...prev, ...response.data]);
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    };
    fetchQuotes();
  }, [offset]);

  return (
    <div className="quote-list-container">
      <h1>Quotes</h1>
      {quotes.map((quote, index) => (
        <div key={index} className="quote-item">
          <img src={quote.mediaUrl} alt="quote" />
          <div className="quote-text">{quote.text}</div>
          <div className="quote-meta">
            <span>{quote.username}</span>
            <span>{quote.created_at}</span>
          </div>
        </div>
      ))}
      {hasMore && (
        <button onClick={() => setOffset((prev) => prev + 20)}>Load More</button>
      )}
      <button className="floating-button" onClick={() => navigate('/create')}>
        +
      </button>
    </div>
  );
};

export default QuoteListPage;