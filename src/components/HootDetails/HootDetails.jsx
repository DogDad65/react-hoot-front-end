import { useParams, Link } from "react-router-dom";
import { AuthedUserContext } from "../../App";
import { useEffect, useState, useContext } from "react";
import styles from "./HootDetails.module.css";
import * as hootService from "../../services/hootService";
import * as commentService from "../../services/commentService";
import CommentForm from "../CommentForm/CommentForm";
import Loading from "../Loading/Loading";
import Icon from "../Icon/Icon";

const HootDetail = (props) => {
  const { hootId } = useParams();
  const [hoot, setHoot] = useState(null);
  const user = useContext(AuthedUserContext);
  const [editCommentId, setEditCommentId] = useState(null); // Track which comment is in edit mode

  useEffect(() => {
    const fetchHoot = async () => {
      const fetchedHoot = await hootService.show(hootId);
      setHoot(fetchedHoot);
    };
    fetchHoot();
  }, [hootId]);

  const handleAddComment = async (commentData) => {
    const newComment = await hootService.createComment(hootId, commentData);
    setHoot((prevHoot) => ({
      ...prevHoot,
      comments: [...prevHoot.comments, newComment],
    }));
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await hootService.deleteComment(hootId, commentId);
      setHoot((prevHoot) => ({
        ...prevHoot,
        comments: prevHoot.comments.filter(
          (comment) => comment._id !== commentId
        ),
      }));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleUpdateComment = async (hootId, commentId, updatedCommentData) => {
    try {
      const updatedComment = await commentService.updateComment(
        hootId,
        commentId,
        updatedCommentData
      );
      setHoot((prevHoot) => ({
        ...prevHoot,
        comments: prevHoot.comments.map((comment) =>
          comment._id === commentId ? updatedComment : comment
        ),
      }));
      setEditCommentId(null); // Exit edit mode after updating
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  if (!hoot) return <Loading />;

  return (
    <article className={styles.container}>
      <h2>{hoot.title}</h2>
      <p>{hoot.text}</p>
      <p>
        Posted by {hoot.author.username} on{" "}
        {new Date(hoot.createdAt).toLocaleDateString()}
      </p>

      {hoot.author._id === user._id && (
        <>
          <Link to={`/hoots/${hootId}/edit`}>
            <Icon category="Edit" />
          </Link>
          <button onClick={() => props.handleDeleteHoot(hootId)}>
            <Icon category="Trash" />
          </button>
        </>
      )}

      <h3>Comments</h3>
      <CommentForm handleAddComment={handleAddComment} />
      <section>
        {hoot.comments.map((comment) => (
          <article key={comment._id} className={styles.comment}>
            <header>
              <div>
                <p>
                  {comment.author.username} posted on{" "}
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
                {comment.author._id === user._id && (
                  <>
                    <button onClick={() => setEditCommentId(comment._id)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteComment(comment._id)}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </header>

            {/* Conditional render for edit mode */}
            {editCommentId === comment._id ? (
              <CommentForm
                handleUpdateComment={handleUpdateComment}
                isEdit={true}
                commentId={comment._id} // Pass comment ID for updating
                hootId={hootId} // Pass hoot ID
              />
            ) : (
              <p>{comment.text}</p>
            )}
          </article>
        ))}
      </section>
    </article>
  );
};

export default HootDetail;
