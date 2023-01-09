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
        description: 'You can customize a component using styles, props, and by overriding default props.',
    },
    {
        title: 'Cross-platform',
        image: '/img/cross-platform.svg',
        description: 'Works on Android and iOS (with bare React Native or Expo).',
    },
    {
        title: 'Different types',
        description: "You can use the basic, searchable, section, and multiselect.",
        image: '/img/different.svg',
    }
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
