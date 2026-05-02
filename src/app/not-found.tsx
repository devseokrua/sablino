import Link from 'next/link';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          <Link href="/" className={styles.backLink}>
            &larr; повернутись на головну
          </Link>

          <section className={styles.panel} aria-labelledby="not-found-title">
            <p className={styles.code}>404</p>
            <h1 id="not-found-title" className={styles.title}>
              Сторінку не знайдено
            </h1>
            <p className={styles.text}>
              Сторінка, яку ви шукаєте, не існує або була переміщена.
            </p>
          </section>
        </div>
      </main>

      <div className={styles.bottomStrip} aria-hidden="true" />
    </div>
  );
}
