// src/components/HootList/HootList.jsx
import styles from "./HootList.module.css";
import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";

const HootList = (props) => {
  return (
    <main className={styles.container}>
      <h1>Hoot List</h1>
      {props.hoots.map((hoot) => (
        <Link key={hoot._id} to={`/hoots/${hoot._id}`}>
          <article>
            <header>
              <div>
                <h2>{hoot.title}</h2>
                <Icon category={hoot.category} />
              </div>
              <p>
                {hoot.author.username} posted on{" "}
                {new Date(hoot.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{hoot.text}</p>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default HootList;
