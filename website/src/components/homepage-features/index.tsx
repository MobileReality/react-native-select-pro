import React from 'react';
import {
    FeatureItem,
    SingleFeature,
} from '@site/src/components/single-feature';

import styles from './index.module.css';

const featureList: FeatureItem[] = [
    {
        title: 'Customizable',
        image: '/img/customizable.svg',
        description: '',
    },
    {
        title: 'Cross Platform',
        image: '/img/cross-platform.svg',
        description: '',
    },
    {
        title: 'Accessible',
        image: '/img/accessibility.svg',
        description: '',
    },
];

export const HomepageFeatures = () => {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {featureList.map((props, index) => (
                        <SingleFeature key={index} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
};
