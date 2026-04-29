import housesData from '@/data/houses.json';
import housePricesData from '@/data/house-prices.json';
import HouseCard from './HouseCard';
import styles from './Houses.module.css';

type HouseType = 'house' | 'gazebo';

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
};

type HousesData = {
  title: string;
  items: HouseItem[];
};

type PriceItem = {
  value: string;
  label: string;
  draft: boolean;
};

type HousePricesData = {
  currency: string;
  defaultLabel: string;
  prices: Record<string, PriceItem>;
};

export default function Houses() {
  const houses = housesData as HousesData;
  const housePrices = housePricesData as HousePricesData;

  return (
    <section id="houses" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{houses.title}</h2>

        <div className={styles.grid}>
          {houses.items.map((house) => {
            const price = housePrices.prices[house.priceId];

            return (
              <HouseCard
                key={house.id}
                slug={house.slug}
                type={house.type}
                title={house.title}
                coverImage={house.coverImage}
                summaryLines={house.summaryLines}
                priceValue={price?.value ?? 'Ціну уточнюйте'}
                priceLabel={price?.label ?? housePrices.defaultLabel}
                buttonLabel={house.buttonLabel}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
