const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/hoots`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) throw new Error(`Error fetching hoots: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.log(error);
    return null; // Return null or handle the error in the UI
  }
};

const show = async (hootId) => {
  try {
    const res = await fetch(`${BASE_URL}/${hootId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) throw new Error(`Error fetching hoot: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.log(error);
    return null; // Handle error
  }
};

const create = async (hootFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // Content-Type header is omitted to let the browser set the correct boundary
      },
      body: hootFormData, // FormData with both text and file data
    });
    if (!res.ok) throw new Error(`Error creating hoot: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.log("Error creating hoot:", error);
    return null; // Handle error
  }
};

const createComment = async (hootId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${hootId}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentFormData),
    });
    if (!res.ok) throw new Error(`Error creating comment: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.log(error);
    return null; // Handle error
  }
};

const deleteHoot = async (hootId) => {
  try {
    const res = await fetch(`${BASE_URL}/${hootId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(`Error deleting hoot: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.log(error);
    return null; // Handle error
  }
};

const update = async (hootId, hootFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${hootId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // Content-Type header is omitted for FormData
      },
      body: hootFormData, // FormData allows for file uploads
    });
    if (!res.ok) throw new Error(`Error updating hoot: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.log(error);
    return null; // Handle error
  }
};

const deleteComment = async (hootId, commentId) => {
  try {
    const res = await fetch(`${BASE_URL}/${hootId}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error("Error deleting comment");
    return await res.json();
  } catch (error) {
    console.log("Error deleting comment:", error);
    return null; // Handle error
  }
};

export {
  index,
  show,
  create,
  createComment,
  deleteHoot,
  update,
  deleteComment,
};
