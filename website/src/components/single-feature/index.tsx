import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '@site/src/components/homepage-features/index.module.css';
import clsx from 'clsx';

export type FeatureItem = {
    title: string;
    image: string;
    description: JSX.Element | string;
};

export const SingleFeature = ({ title, image, description }: FeatureItem) => {
    const imageUrl = useBaseUrl(image);

    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <img alt={title} className={styles.featureSvg} src={imageUrl} />
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
};
