import React from 'react';
import Link from '@docusaurus/Link';
import styles from '@site/src/pages/index.module.css';
import clsx from 'clsx';

export const HomepageHeader = () => {
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
};
