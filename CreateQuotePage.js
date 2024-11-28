import React, { useState } from 'react';
import axios from 'axios';

const CreateQuotePage = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload image
      const formData = new FormData();
      formData.append('file', file);
      const uploadResponse = await axios.post(
        'https://crafto.app/crafto/v1.0/media/assignment/upload',
        formData
      );
      const mediaUrl = uploadResponse.data.mediaUrl;

      // Create quote
      await axios.post(
        'https://assignment.stage.crafto.app/postQuote',
        { text, mediaUrl },
        { headers: { Authorization: token } }
      );
      alert('Quote created successfully!');
    } catch (error) {
      console.error('Error creating quote:', error);
    }
  };

  return (
    <div className="create-quote-container">
      <h1>Create Quote</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your quote"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateQuotePage;