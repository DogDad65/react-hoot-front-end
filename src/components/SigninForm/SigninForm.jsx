import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import SignupIcon from '../../assets/images/signup.svg';
import styles from './SigninForm.module.css';

const SigninForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(''); 
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage(''); 
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData);
      props.setUser(user); 
      navigate('/'); 
    } catch (err) {
      updateMessage(err.message); 
    }
  };

  return (
    <main className={styles.container}>
      <section>
        <img src={SignupIcon} alt="An owl sitting on a sign" />
      </section>
      <section>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h1>Log In</h1>
          <p>{message}</p>
          <div>
            <label htmlFor="username">Username:</label> 
            <input
              type="text"
              autoComplete="off"
              id="username"
              value={formData.username}
              name="username"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              autoComplete="off"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit">Log In</button>
            <Link to="/">
              <button type="button">Cancel</button>
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
};

export default SigninForm;
