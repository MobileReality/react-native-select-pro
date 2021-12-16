import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';

import styles from './HomepageFeatures.module.css';

type FeatureItem = {
    title: string;
    image: string;
    description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    {
        title: 'Customizable',
        image: '/img/customizable.svg',
        description: (
            <>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
            </>
        ),
    },
    {
        title: 'Cross Platform',
        image: '/img/cross-platform.svg',
        description: (
            <>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
            </>
        ),
    },
    {
        title: 'Accessibility',
        image: '/img/accessibility.svg',
        description: (
            <>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
            </>
        ),
    },
];

function Feature({ title, image, description }: FeatureItem) {
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
}

export default function HomepageFeatures(): JSX.Element {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
