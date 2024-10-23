import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as hootService from '../../services/hootService';
import styles from './HootForm.module.css';

const HootForm = (props) => {
  const { hootId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    category: 'News',
  });
  const [photo, setPhoto] = useState(null); // To handle file upload

  useEffect(() => {
    if (hootId) {
      const fetchHoot = async () => {
        const hootData = await hootService.show(hootId);
        setFormData(hootData);
      };
      fetchHoot();
    }
  }, [hootId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handlePhotoChange = (evt) => {
    setPhoto(evt.target.files[0]); // Store selected file in state
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const hootData = new FormData(); // Use FormData to include both text and file
    hootData.append('title', formData.title);
    hootData.append('text', formData.text);
    hootData.append('category', formData.category);
    if (photo) hootData.append('photo', photo); // Append the photo if available

    if (hootId) {
      props.handleUpdateHoot(hootId, hootData);
    } else {
      props.handleAddHoot(hootData);
    }
  };

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h1>{hootId ? 'Edit Hoot' : 'New Hoot'}</h1>
        <label htmlFor="title-input">Title</label>
        <input
          required
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="text-input">Text</label>
        <textarea
          required
          name="text"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
        />
        <label htmlFor="category-input">Category</label>
        <select
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="News">News</option>
          <option value="Games">Games</option>
          <option value="Music">Music</option>
          <option value="Movies">Movies</option>
          <option value="Sports">Sports</option>
          <option value="Television">Television</option>
        </select>
        <label htmlFor="photo-input">Photo</label>
        <input type="file" name="photo" id="photo-input" onChange={handlePhotoChange} />
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default HootForm;
