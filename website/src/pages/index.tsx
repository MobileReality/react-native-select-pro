import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';

import HomepageFeatures from '../components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
    return (
        <header className={clsx(styles.backgroundLogo)}>
            <div className={styles.buttons}>
                <Link
                    className={clsx(`button button--secondary button--lg ${styles.link}`)}
                    to="/docs/getting-started">
                    DOCS
                </Link>
            </div>
        </header>
    );
}

export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            description="Description will go into a meta tag in <head />"
            title={`Hello from ${siteConfig.title}`}>
            <HomepageHeader />
            <main>
                <HomepageFeatures />
            </main>
        </Layout>
    );
}
