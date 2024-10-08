const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const getUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = payload.exp * 1000 < Date.now();
    if (isExpired) {
      localStorage.removeItem('token');
      return null;
    }
    return payload;
  } catch (error) {
    console.error("Token decoding error:", error);
    localStorage.removeItem('token');
    return null;
  }
};

const signup = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Sign-up failed');
    }
    const json = await res.json();
    localStorage.setItem('token', json.token);
    return json;
  } catch (err) {
    console.error("Sign-up error:", err);
    throw err;
  }
};

const signin = async (user) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Sign-in failed');
    }
    const json = await res.json();
    if (json.token) {
      localStorage.setItem('token', json.token);
      return getUser();
    }
  } catch (err) {
    console.error("Sign-in error:", err);
    throw err;
  }
};

const signout = () => {
  localStorage.removeItem('token');
};

export { signup, signin, getUser, signout };
