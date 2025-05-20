// components/NewsCard.jsx
import Link from 'next/link';
import styles from './NewsCard.module.css';

export default function NewsCard({ article }) {
  return (
    <div className={styles.card}>
      <h2>{article.title}</h2>
      <p>{article.content.substring(0, 100)}...</p>
      <Link href={`/news/${article._id}`}>Leer más</Link>
    </div>
  );
}
