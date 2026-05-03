'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './HouseGallery.module.css';

type HouseGalleryProps = {
  images: string[];
  title: string;
};

export default function HouseGallery({ images, title }: HouseGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const canShowControls = images.length > 1;

  const scrollPrev = () => {
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    emblaApi?.scrollNext();
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {images.map((src, index) => (
            <div className={styles.slide} key={`${src}-${index}`}>
              <Image
                src={src}
                alt={`${title} - фото ${index + 1}`}
                fill
                className={styles.image}
                sizes="(max-width: 767px) calc(100vw - 24px), (max-width: 1023px) calc(100vw - 48px), (max-width: 1439px) calc((100vw - 128px) / 2), 624px"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {canShowControls ? (
        <>
          <button
            type="button"
            className={`${styles.arrowButton} ${styles.arrowLeft}`}
            onClick={scrollPrev}
            aria-label="Попереднє фото"
          >
            <svg aria-hidden="true" focusable="false">
              <use href="/sprite.svg#icon-arrow-left" />
            </svg>
          </button>

          <button
            type="button"
            className={`${styles.arrowButton} ${styles.arrowRight}`}
            onClick={scrollNext}
            aria-label="Наступне фото"
          >
            <svg aria-hidden="true" focusable="false">
              <use href="/sprite.svg#icon-arrow-right" />
            </svg>
          </button>
        </>
      ) : null}
    </div>
  );
}
