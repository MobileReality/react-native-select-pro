import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { HomepageFeatures } from '@site/src/components/homepage-features';
import { HomepageHeader } from '@site/src/components/homepage-header';
import Layout from '@theme/Layout';

export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            description="React Native dropdown (select) component developed by Mobile Reality"
            title={`${siteConfig.title}`}
        >
            <HomepageHeader />
            <main>
                <HomepageFeatures />
            </main>
        </Layout>
    );
}
