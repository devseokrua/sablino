import Link from 'next/link';
import conditionsData from '@/data/conditions.json';
import styles from './ConditionsPage.module.css';

type ConditionsGroup = {
  title: string;
  subtitle?: string;
  items: string[];
};

type BaseSection = {
  id: string;
  title: string;
  iconId: string;
};

type ParagraphSection = BaseSection & {
  type: 'paragraphs';
  items: string[];
};

type ListSection = BaseSection & {
  type: 'list';
  items: string[];
};

type GroupsSection = BaseSection & {
  type: 'groups';
  groups: ConditionsGroup[];
};

type ConditionsSection = ParagraphSection | ListSection | GroupsSection;

type ConditionsData = {
  backLinkLabel: string;
  title: string;
  intro: {
    paragraphs: string[];
    territoryTitle: string;
    territoryItems: string[];
    kitchenTitle: string;
    kitchenItems: string[];
    parkingText: string;
  };
  sections: ConditionsSection[];
};

const data = conditionsData as ConditionsData;

function renderSection(section: ConditionsSection) {
  return (
    <section key={section.id} className={styles.infoBlock}>
      <div className={styles.infoHeader}>
        <svg className={styles.icon} aria-hidden="true" focusable="false">
          <use href={`/sprite.svg#${section.iconId}`} />
        </svg>
        <h2>{section.title}</h2>
      </div>

      {section.type === 'groups' ? (
        section.groups.map((group) => (
          <div key={group.title} className={styles.group}>
            <h3 className={styles.groupTitle}>{group.title}</h3>
            {group.subtitle ? (
              <p className={styles.groupSubtitle}>{group.subtitle}</p>
            ) : null}
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))
      ) : section.type === 'paragraphs' ? (
        <ul>
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <ul>
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function ConditionsPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          <Link href="/" className={styles.backLink}>
            &larr; {data.backLinkLabel}
          </Link>

          <h1 className={styles.title}>{data.title}</h1>

          <section className={styles.panel}>
            <div className={styles.grid}>
              <div className={styles.leftColumn}>
                {data.intro.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                <p>{data.intro.territoryTitle}</p>
                <ul>
                  {data.intro.territoryItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <p>{data.intro.kitchenTitle}</p>
                <ul>
                  {data.intro.kitchenItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <p>{data.intro.parkingText}</p>
              </div>

              <div className={styles.rightColumn}>
                {data.sections.map((section) => renderSection(section))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <div className={styles.bottomStrip} aria-hidden="true" />
    </div>
  );
}
