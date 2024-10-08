// src/components/HootDetail/HootDetail.jsx
import { useParams } from "react-router-dom";
import { AuthedUserContext } from "../../App";
import { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';

import * as hootService from "../../services/hootService";
import CommentForm from "../CommentForm/CommentForm"; // Import CommentForm

const HootDetail = (props) => {
  const { hootId } = useParams();
  const [hoot, setHoot] = useState(null);
  const user = useContext(AuthedUserContext); // Get logged-in user

  useEffect(() => {
    const fetchHoot = async () => {
      const fetchedHoot = await hootService.show(hootId);
      setHoot(fetchedHoot);
    };
    fetchHoot();
  }, [hootId]);

  if (!hoot) return <p>Loading...</p>;

  return (
    <article>
      <h2>{hoot.title}</h2>
      <p>{hoot.text}</p>
      <p>
        Posted by {hoot.author.username} on{" "}
        {new Date(hoot.createdAt).toLocaleDateString()}
      </p>

      {hoot.author._id === user._id && (
        <>
        <Link to={`/hoots/${hootId}/edit`}>Edit</Link>
        <button onClick={() => props.handleDeleteHoot(hootId)}>Delete</button>
        </>
      )}

      {/* Render the CommentForm here */}
      <h3>Comments</h3>
      <CommentForm />
    </article>
  );
};

export default HootDetail;
