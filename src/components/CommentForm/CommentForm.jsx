// src/components/CommentForm/CommentForm.jsx

import { useState } from 'react';

const CommentForm = ({ handleAddComment }) => {
  const [formData, setFormData] = useState({ text: '' });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddComment(formData); // Pass the form data up to HootDetail
    setFormData({ text: '' }); // Clear the form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your comment:</label>
      <textarea
        required
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />
      <button type="submit">Submit Comment</button>
    </form>
  );
};

export default CommentForm;
