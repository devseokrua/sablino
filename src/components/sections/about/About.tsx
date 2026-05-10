import Image from 'next/image';
import Container from '@/components/layout/container/Container';
import styles from './About.module.css';

const cards = [
  { src: '/about-1.webp', caption: 'Відпочинок біля озера' },
  { src: '/about-2.webp', caption: 'Затишні вечори біля вогню' },
  { src: '/about-3.webp', caption: 'Альтанки та пляж' },
];

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.top}>
        <Container>
          <div className={styles.topInner}>
            <div className={styles.left}>
              <h2 className={styles.title}>Садиба Саблінська</h2>
              <p className={styles.description}>
                Місце для тих, хто хоче відпочити серед природи, біля води та
                подалі від міського шуму.
                <br />
                Тут добре для сімейного відпочинку, вихідних із друзями або
                просто кількох спокійних днів на свіжому повітрі. Простір і тиша
                дозволяють по-справжньому переключитися та відновити сили.
              </p>
            </div>
          </div>
        </Container>

        <div className={styles.imageWrap}>
          <Image
            src="/about-main.webp"
            alt="Садиба «Саблінська»"
            fill
            sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), 55vw"
            className={styles.mainImage}
          />
        </div>
      </div>

      <div className={styles.bottom}>
        <Container>
          <div className={styles.cards}>
            {cards.map((card) => (
              <article key={card.caption} className={styles.card}>
                <Image
                  src={card.src}
                  alt={card.caption}
                  fill
                  sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1439px) 33vw, 400px"
                  className={styles.cardImage}
                />
                <div className={styles.overlay}>
                  <p className={styles.caption}>{card.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
