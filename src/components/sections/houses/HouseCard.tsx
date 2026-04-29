import Image from 'next/image';
import Button from '@/components/ui/button/Button';
import styles from './HouseCard.module.css';

type HouseCardProps = {
  slug: string;
  type: 'house' | 'gazebo';
  title: string;
  coverImage: string;
  summaryLines: string[][];
  priceValue: string;
  priceLabel: string;
  buttonLabel: string;
};

export default function HouseCard({
  slug,
  type,
  title,
  coverImage,
  summaryLines,
  priceValue,
  priceLabel,
  buttonLabel,
}: HouseCardProps) {
  const isGazebo = type === 'gazebo';

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={coverImage}
          alt={title}
          fill
          sizes="(min-width: 1376px) 624px, (max-width: 600px) calc(100vw - 24px), (max-width: 900px) calc(100vw - 48px), min(100vw - 64px, 1312px)"
          className={styles.image}
        />
      </div>

      <div className={styles.titleBar}>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>

      <div className={styles.infoPanel}>
        <div className={styles.summary}>
          {summaryLines.map((line, lineIndex) => (
            <p key={`${slug}-summary-${lineIndex}`} className={styles.summaryLine}>
              {line.map((part, partIndex) => (
                <span key={`${slug}-summary-${lineIndex}-${partIndex}`}>
                  {partIndex > 0 ? (
                    <span className={styles.separator} aria-hidden="true">
                      {' '}
                      •{' '}
                    </span>
                  ) : null}
                  {part}
                </span>
              ))}
            </p>
          ))}
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <div
          className={`${styles.priceBlock} ${
            isGazebo ? styles.priceBlockCompact : ''
          }`}
        >
          <div
            className={`${styles.priceRow} ${
              isGazebo ? styles.priceRowCompact : ''
            }`}
          >
            <span
              className={`${styles.priceValue} ${
                isGazebo ? styles.priceValueCompact : ''
              }`}
            >
              {priceValue}
            </span>
            <span
              className={`${styles.priceLabel} ${
                isGazebo ? styles.priceLabelCompact : ''
              }`}
            >
              {priceLabel}
            </span>
          </div>
          <Button href={`/houses/${slug}`} className={styles.cardButton}>
            {buttonLabel}
          </Button>
        </div>
      </div>
    </article>
  );
}
