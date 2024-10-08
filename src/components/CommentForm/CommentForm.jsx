// src/components/CommentForm/CommentForm.jsx

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as commentService from "../../services/commentService";
import Icon from "../Icon/Icon";

const CommentForm = ({ handleAddComment, handleUpdateComment, isEdit }) => {
  const { hootId, commentId } = useParams();
  const [formData, setFormData] = useState({ text: "" });

  useEffect(() => {
    if (isEdit && commentId) {
      const fetchComment = async () => {
        const comment = await commentService.getComment(hootId, commentId);
        setFormData({ text: comment.text });
      };
      fetchComment();
    }
  }, [isEdit, hootId, commentId]);

  const handleChange = (e) =>
    setFormData({ ...formData, text: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await handleUpdateComment(hootId, commentId, formData);
    } else {
      handleAddComment(formData);
    }
    setFormData({ text: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">{isEdit ? "Edit" : "New"} Comment:</label>
      <textarea
        required
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />
      <button type="submit">
        <Icon category="Create" />
      </button>
    </form>
  );
};

export default CommentForm;
