import styles from './ConditionsPage.module.css';

export default function ConditionsPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Умови проживання</h1>
      </main>
      <div className={styles.bottomStrip} aria-hidden="true" />
    </div>
  );
}
