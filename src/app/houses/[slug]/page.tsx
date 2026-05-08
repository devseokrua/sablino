import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import housesData from '@/data/houses.json';
import housePricesData from '@/data/house-prices.json';
import BookingModalTrigger from '@/components/booking/BookingModalTrigger';
import ResponsiveCallLink from '@/components/ui/responsive-call-link/ResponsiveCallLink';
import { getHouseGallery } from '@/utils/getHouseGallery';
import HouseGallery from './HouseGallery';
import styles from './HouseDetailsPage.module.css';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type HouseType = 'house' | 'gazebo';

type HouseFeature = {
  iconId: string;
  text: string;
};

type HouseDetails = {
  subtitle: string;
  gallery: string[];
  features: HouseFeature[];
};

type HouseItem = {
  id: string;
  slug: string;
  priceId: string;
  type: HouseType;
  title: string;
  coverImage: string;
  summaryLines: string[][];
  buttonLabel: string;
  draft: boolean;
  details?: HouseDetails;
};

type HousesData = {
  title: string;
  items: HouseItem[];
};

type ExtraGuestPrice = {
  value: string;
  label: string;
  text: string;
};

type PeriodPriceItem = {
  label: string;
  value: string;
};

type PriceItem = {
  value: string;
  label: string;
  includedGuestsText?: string;
  extraGuest?: ExtraGuestPrice | null;
  periodPrices?: PeriodPriceItem[];
  draft: boolean;
};

type HousePricesData = {
  currency: string;
  defaultLabel: string;
  prices: Record<string, PriceItem>;
};

const houses = housesData as HousesData;
const prices = housePricesData as HousePricesData;

const fallbackTitle = 'Будинки та альтанки';
const fallbackDescription =
  'Огляд будинків та альтанок у садибі «Саблінська». Адреса: Кіровоградська область, Суботцівська ОТГ, с. Шаблине, вул. Набережна, 25. Телефон: +38 (096) 756-60-91.';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const house = houses.items.find((item) => item.slug === slug);

  if (!house) {
    return {
      title: fallbackTitle,
      description: fallbackDescription,
      openGraph: {
        title: fallbackTitle,
        description: fallbackDescription,
        type: 'website',
        images: ['/og-image.jpg'],
      },
      twitter: {
        card: 'summary_large_image',
        title: fallbackTitle,
        description: fallbackDescription,
        images: ['/og-image.jpg'],
      },
    };
  }

  const itemLabel = house.type === 'gazebo' ? 'Альтанка' : 'Будинок';
  const title = house.title;
  const description = `${itemLabel} «${house.title}» у садибі «Саблінська». Адреса: Кіровоградська область, Суботцівська ОТГ, с. Шаблине, вул. Набережна, 25. Телефон: +38 (096) 756-60-91.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: ['/og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
    },
  };
}

export function generateStaticParams() {
  return houses.items.map((house) => ({
    slug: house.slug,
  }));
}

export default async function HouseDetailsPage({ params }: PageProps) {
  const { slug } = await params;

  const house = houses.items.find((item) => item.slug === slug);

  if (!house) {
    notFound();
  }

  const price = prices.prices[house.priceId];
  const priceValue = price?.value ?? 'Ціну уточнюйте';
  const priceLabel = price?.label ?? prices.defaultLabel;
  const galleryImages = getHouseGallery(house.slug);
  const safeGalleryImages = galleryImages.length ? galleryImages : [house.coverImage];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          <Link href={`/#house-${house.slug}`} className={styles.backLink}>
            &larr; повернутись до будинків
          </Link>

          <div className={styles.grid}>
            <section className={styles.left}>
              <HouseGallery images={safeGalleryImages} title={house.title} />

              {price?.periodPrices?.length ? (
                <div className={styles.periodPriceGrid}>
                  {price.periodPrices.map((item) => {
                    const normalizedMatch = item.value.match(
                      /^(.*?)(?:\s*)грн\s*\/\s*доба$/i,
                    );
                    const hasUnit = Boolean(normalizedMatch);
                    const amount = hasUnit
                      ? normalizedMatch?.[1].trim() ?? item.value
                      : item.value;

                    return (
                      <div key={item.label} className={styles.periodPriceCard}>
                        <div className={styles.periodPriceValueRow}>
                          <p className={styles.periodPriceValue}>{amount}</p>
                          {hasUnit ? (
                            <p className={styles.periodPriceUnit}>грн/доба</p>
                          ) : null}
                        </div>
                        <p className={styles.periodPriceLabel}>
                          {item.label.toLowerCase()}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className={styles.priceGrid}>
                  <div
                    className={`${styles.priceCard} ${
                      price?.extraGuest ? '' : styles.priceCardSingle
                    }`}
                  >
                    <div className={styles.priceRow}>
                      <span className={styles.priceValue}>{priceValue}</span>
                      <span className={styles.priceLabel}>{priceLabel}</span>
                    </div>

                    {price?.includedGuestsText ? (
                      <p className={styles.priceNote}>{price.includedGuestsText}</p>
                    ) : null}
                  </div>

                  {price?.extraGuest ? (
                    <div className={styles.priceCard}>
                      <div className={styles.priceRow}>
                        <span className={styles.priceValue}>+{price.extraGuest.value}</span>
                        <span className={styles.priceLabel}>{price.extraGuest.label}</span>
                      </div>

                      <p className={styles.priceNote}>{price.extraGuest.text}</p>
                    </div>
                  ) : null}
                </div>
              )}
            </section>

            <section className={styles.right}>
              {house.details ? (
                <>
                  <div className={styles.detailsTop}>
                    <h1 className={styles.title}>{house.title}</h1>
                    <div className={styles.featuresPanel}>
                      <p className={styles.subtitle}>{house.details.subtitle}:</p>
                      <ul className={styles.features}>
                        {house.details.features.map((feature) => (
                          <li
                            key={`${feature.iconId}-${feature.text}`}
                            className={styles.featureItem}
                          >
                            <svg
                              className={styles.icon}
                              aria-hidden="true"
                              focusable="false"
                            >
                              <use href={`/sprite.svg#${feature.iconId}`} />
                            </svg>
                            <span>{feature.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={styles.actions}>
                    <ResponsiveCallLink className={styles.actionLink}>
                      <svg
                        className={styles.actionIcon}
                        aria-hidden="true"
                        focusable="false"
                      >
                        <use href="/sprite.svg#icon-phone" />
                      </svg>
                      (096) 756-60-91
                    </ResponsiveCallLink>
                    <BookingModalTrigger className={styles.actionLink}>
                      <svg
                        className={styles.actionIcon}
                        aria-hidden="true"
                        focusable="false"
                      >
                        <use href="/sprite.svg#icon-booking" />
                      </svg>
                      Забронювати
                    </BookingModalTrigger>
                  </div>
                </>
              ) : (
                <>
                  <h1 className={styles.title}>{house.title}</h1>
                  <p className={styles.placeholder}>
                    Деталі для цього об’єкта будуть додані пізніше.
                  </p>
                </>
              )}
            </section>
          </div>
        </div>
      </main>

      <div className={styles.bottomStrip} aria-hidden="true" />
    </div>
  );
}

