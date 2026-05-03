'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Container from '@/components/layout/container/Container';
import Button from '@/components/ui/button/Button';
import gallery from '@/data/gallery.json';
import styles from './Gallery.module.css';

const BATCH_SIZE = 5;

type GalleryItem = {
  src: string;
  alt: string;
};

export default function Gallery() {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const hasMore = visibleCount < gallery.length;

  const visibleBatches = useMemo(() => {
    const items = (gallery as GalleryItem[]).slice(0, visibleCount);
    const batches: GalleryItem[][] = [];

    for (let index = 0; index < items.length; index += BATCH_SIZE) {
      batches.push(items.slice(index, index + BATCH_SIZE));
    }

    return batches;
  }, [visibleCount]);

  const showMorePhotos = () => {
    setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, gallery.length));
  };

  return (
    <section id="gallery" className={styles.gallery}>
      <Container>
        <div className={styles.inner}>
          <h2 className={styles.title}>Галерея</h2>

          <div className={styles.batches}>
            {visibleBatches.map((batch) => (
              <div key={batch[0].src} className={styles.batch}>
                <div className={styles.sideColumn}>
                  {batch[0] && (
                    <div className={`${styles.photoFrame} ${styles.sidePhoto}`}>
                      <Image
                        src={batch[0].src}
                        alt={batch[0].alt}
                        fill
                        sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 220px, (max-width: 1439px) calc((100vw - 112px) / 3), 400px"
                        className={styles.image}
                      />
                    </div>
                  )}

                  {batch[1] && (
                    <div className={`${styles.photoFrame} ${styles.sidePhoto}`}>
                      <Image
                        src={batch[1].src}
                        alt={batch[1].alt}
                        fill
                        sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 220px, (max-width: 1439px) calc((100vw - 112px) / 3), 400px"
                        className={styles.image}
                      />
                    </div>
                  )}
                </div>

                {batch[2] && (
                  <div className={styles.centerColumn}>
                    <div className={`${styles.photoFrame} ${styles.centerPhoto}`}>
                      <Image
                        src={batch[2].src}
                        alt={batch[2].alt}
                        fill
                        sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 220px, (max-width: 1439px) calc((100vw - 112px) / 3), 400px"
                        className={styles.image}
                      />
                    </div>
                  </div>
                )}

                <div className={styles.sideColumn}>
                  {batch[3] && (
                    <div className={`${styles.photoFrame} ${styles.sidePhoto}`}>
                      <Image
                        src={batch[3].src}
                        alt={batch[3].alt}
                        fill
                        sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 220px, (max-width: 1439px) calc((100vw - 112px) / 3), 400px"
                        className={styles.image}
                      />
                    </div>
                  )}

                  {batch[4] && (
                    <div className={`${styles.photoFrame} ${styles.sidePhoto}`}>
                      <Image
                        src={batch[4].src}
                        alt={batch[4].alt}
                        fill
                        sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 220px, (max-width: 1439px) calc((100vw - 112px) / 3), 400px"
                        className={styles.image}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className={styles.actions}>
              <Button type="button" onClick={showMorePhotos}>
                більше фото
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
