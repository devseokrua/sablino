import styles from './Loading.module.css';

export default function Loading() {
  return (
    <main className={styles.page} aria-live="polite">
      <section className={styles.panel}>
        <span className={styles.loader} aria-hidden="true" />
        <h1 className={styles.title}>Завантаження сторінки</h1>
        <p className={styles.text}>Готуємо інформацію про садибу.</p>
      </section>
    </main>
  );
}
