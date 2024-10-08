const BASE_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

export const createComment = async (hootId, commentData) => {
  try {
    const res = await fetch(`${BASE_URL}/hoots/${hootId}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error creating comment:", error);
    throw new Error("Could not create comment");
  }
};

export const getComment = async (commentId) => {
  try {
    const res = await fetch(`${BASE_URL}/comments/${commentId}`);
    if (!res.ok) throw new Error("Failed to fetch comment");
    return await res.json();
  } catch (error) {
    console.error("Error fetching comment:", error);
    throw error;
  }
};

export const updateComment = async (hootId, commentId, commentData) => {
  try {
    const res = await fetch(`${BASE_URL}/hoots/${hootId}/comments/${commentId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error updating comment:", error);
    throw new Error("Could not update comment");
  }
};

export const deleteComment = async (hootId, commentId) => {
  try {
    const res = await fetch(`${BASE_URL}/hoots/${hootId}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return await res.json();
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw new Error("Could not delete comment");
  }
};
