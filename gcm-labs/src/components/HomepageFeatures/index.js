import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const LabList = [
  {
    number: '01',
    title: 'Discover and Inventory CBOM',
    tools: 'Quantum Safe Explorer (QSE) with IBM Bob',
    description:
      'Scan your environment to discover cryptographic assets and generate a Cryptography Bill of Materials (CBOM).',
    to: '/docs/lab-01-discover-cbom-qse/',
  },
  {
    number: '02',
    title: 'Analysis, Policy & Migration',
    tools: 'Guardium Cryptography Manager (GCM) + HashiCorp Vault',
    description:
      'Analyze cryptographic risk, define quantum-safe policies, and manage the migration of cryptographic assets.',
    to: '/docs/lab-02-analysis-policy-migration/',
  },
  {
    number: '03',
    title: 'Adaptive Remediation',
    tools: 'Quantum Safe Remediator (QSR)',
    description:
      'Automatically remediate legacy applications to use quantum-safe cryptography with minimal code changes.',
    to: '/docs/lab-03-adaptive-remediation-qsr/',
  },
];

function LabCard({number, title, tools, description, to}) {
  return (
    <div className={clsx('col col--3', styles.labCardCol)}>
      <div className={styles.labCard}>
        <div className={styles.labNumber}>Lab {number}</div>
        <Heading as="h3" className={styles.labTitle}>{title}</Heading>
        <p className={styles.labTools}>{tools}</p>
        <p className={styles.labDescription}>{description}</p>
        <Link className="button button--primary button--sm" to={to}>
          Start Lab →
        </Link>
      </div>
    </div>
  );
}

function ResourcesCard() {
  return (
    <div className={clsx('col col--3', styles.labCardCol)}>
      <div className={styles.labCard}>
        <div className={clsx(styles.labNumber, styles.resourcesBadge)}>Resources</div>
        <Heading as="h3" className={styles.labTitle}>Event Resources</Heading>
        <p className={styles.labTools}>Leave Behind Material</p>
        <p className={styles.labDescription}>
          Browse event materials, product documentation, and additional learning content for the bootcamp.
        </p>
        <Link className="button button--outline button--primary button--sm" to="/docs/resources/">
          Explore →
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.labs}>
      <div className="container">
        <div className="row">
          {LabList.map((props, idx) => (
            <LabCard key={idx} {...props} />
          ))}
          <ResourcesCard />
        </div>
      </div>
    </section>
  );
}
