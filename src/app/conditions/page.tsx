import Link from 'next/link';
import conditionsData from '@/data/conditions.json';
import styles from './ConditionsPage.module.css';

type ConditionsSection = (typeof conditionsData.sections)[number];

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function renderHighlightedText(text: string, phrases: string[]) {
  if (!phrases.length) {
    return text;
  }

  const sortedPhrases = [...phrases].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(
    `(${sortedPhrases.map((phrase) => escapeRegExp(phrase)).join('|')})`,
    'g'
  );
  const phraseSet = new Set(phrases);

  return text.split(pattern).map((part, index) =>
    phraseSet.has(part) ? <strong key={`${part}-${index}`}>{part}</strong> : part
  );
}

function renderSection(section: ConditionsSection) {
  return (
    <section key={section.id} className={styles.infoBlock}>
      <div className={styles.infoHeader}>
        <svg className={styles.icon} aria-hidden="true" focusable="false">
          <use href={`#${section.iconId}`} />
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
        section.items.map((item) => <p key={item}>{item}</p>)
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
            &larr; {conditionsData.backLinkLabel}
          </Link>

          <h1 className={styles.title}>{conditionsData.title}</h1>

          <section className={styles.panel}>
            <div className={styles.grid}>
              <div className={styles.leftColumn}>
                {conditionsData.intro.paragraphs.map((paragraph, index) => (
                  <p key={paragraph}>
                    {index === 0
                      ? renderHighlightedText(
                          paragraph,
                          conditionsData.intro.highlightPhrases ?? []
                        )
                      : paragraph}
                  </p>
                ))}

                <p>{conditionsData.intro.territoryTitle}</p>
                <ul>
                  {conditionsData.intro.territoryItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <p>{conditionsData.intro.kitchenTitle}</p>
                <ul>
                  {conditionsData.intro.kitchenItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <p>{conditionsData.intro.parkingText}</p>
              </div>

              <div className={styles.rightColumn}>
                {conditionsData.sections.map((section) => renderSection(section))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <div className={styles.bottomStrip} aria-hidden="true" />
    </div>
  );
}
