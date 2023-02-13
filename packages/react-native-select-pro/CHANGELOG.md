# @mobile-reality/react-native-select-pro

## 2.1.0

### Minor Changes

-   [#183](https://github.com/MobileReality/react-native-select-pro/pull/183) [`ec20b60`](https://github.com/MobileReality/react-native-select-pro/commit/ec20b60c3a5c0358a9ad3c06a92925882c5572da) Thanks [@kkaplinski](https://github.com/kkaplinski)! - Add theme property with light, dark and none themes.

### Patch Changes

-   [#185](https://github.com/MobileReality/react-native-select-pro/pull/185) [`5bee57c`](https://github.com/MobileReality/react-native-select-pro/commit/5bee57cf8acf7378ffc2ddc0a62d0d0c58faee70) Thanks [@irekrog](https://github.com/irekrog)! - reduce the bundle size by changing from an enum to a union type

## 2.0.0

### Major Changes

-   [#180](https://github.com/MobileReality/react-native-select-pro/pull/180) [`780db33`](https://github.com/MobileReality/react-native-select-pro/commit/780db33a4f7912f6a52205c7efac0819a5101e89)

We are excited to announce the release of the new version React Native Select Pro after months of hard work and development.

This release includes:

-   new props and bug fixes,
-   improved TypeScript support,
-   enhanced performance,
-   refactored source code.

We have also rewritten the documentation to be more detailed and easier to understand.

More info you can find out here: https://mobilereality.github.io/react-native-select-pro/docs/react-native-select-pro-v2

Thanks for contributing to this release:

-   [@irekrog](https://github.com/irekrog)

-   [@kkaplinski](https://github.com/kkaplinski)

-   [@MykhailoButkevych-MR](https://github.com/MykhailoButkevych-MR)

-   [@pwujek](https://github.com/pwujek7)

## 1.13.1

### Patch Changes

-   [#131](https://github.com/MobileReality/react-native-select-pro/pull/131) [`e3b4c04`](https://github.com/MobileReality/react-native-select-pro/commit/e3b4c04499b87c788504758021a0b3250a8b5c50) Thanks [@irekrog](https://github.com/irekrog)! - options list position with `presentationStyle="pageSheet"`

## 1.13.0

### Minor Changes

-   [#99](https://github.com/MobileReality/react-native-select-pro/pull/99) [`1ca307d`](https://github.com/MobileReality/react-native-select-pro/commit/1ca307d49e865df5103d42bcc6ce6e214574b899) Thanks [@kkaplinski](https://github.com/kkaplinski)! - Now you can pass second available data structure - Section List:

    ```jsx
    import React from 'react';
    import { View } from 'react-native';
    import { Select } from '@mobile-reality/react-native-select-pro';

    const SomeComponent = () => {
        return (
            <View>
                <Select
                    options={
                        [
                            {
                                title: 'sometitle',
                                data: { value: 'somevalue', label: 'somelabel' },
                            },
                        ];
                    }
                />
            </View>
        )
    };
    ```

## 1.12.1

### Patch Changes

-   [#97](https://github.com/MobileReality/react-native-select-pro/pull/97) [`35fbd39`](https://github.com/MobileReality/react-native-select-pro/commit/35fbd391e2679b1159b6a01923ccb293a46bdc3c) Thanks [@kkaplinski](https://github.com/kkaplinski)! - fix: android e2e tests

## 1.12.0

### Minor Changes

-   [#92](https://github.com/MobileReality/react-native-select-pro/pull/92) [`788396b`](https://github.com/MobileReality/react-native-select-pro/commit/788396bea04b61b005168c0774e83d6264527122) Thanks [@kkaplinski](https://github.com/kkaplinski)! - add `textInputProps` for search input

*   [#93](https://github.com/MobileReality/react-native-select-pro/pull/93) [`08749a0`](https://github.com/MobileReality/react-native-select-pro/commit/08749a0de51ff397e9aac87f76436215deef6a8e) Thanks [@kkaplinski](https://github.com/kkaplinski)! - add custom select arrow icon prop `customSelectControlArrowIconSource`

## 1.11.1

### Patch Changes

-   [#88](https://github.com/MobileReality/react-native-select-pro/pull/88) [`71cbbaa`](https://github.com/MobileReality/react-native-select-pro/commit/71cbbaa1408ae3dd13aed0e586308f31c8fbf90d) Thanks [@irekrog](https://github.com/irekrog)! - fix app crash when a word does not exist

## 1.11.0

### Minor Changes

-   [#83](https://github.com/MobileReality/react-native-select-pro/pull/83) [`d656aa9`](https://github.com/MobileReality/react-native-select-pro/commit/d656aa986da11f95d31dbb0a727c71f9fcb2f3ec) Thanks [@kkaplinski](https://github.com/kkaplinski)! - add onRemove callback

## 1.10.1

### Patch Changes

-   [#76](https://github.com/MobileReality/react-native-select-pro/pull/76) [`89ecb85`](https://github.com/MobileReality/react-native-select-pro/commit/89ecb85b6d39b09ebf5e64facd4937e189789083) Thanks [@irekrog](https://github.com/irekrog)! - scroll to selected option works properly now

## 1.10.0

### Minor Changes

-   55eaa05: \* update dependencies by @irekrog

    ### Breaking Changes during development

    -   This repository is now a monorepo using `pnpm workspaces` and `turborepo`, divided on:
        -   src/packages/
            -   react-native-select-pro - main package published on npm
        -   src/apps/
            -   e2e - e2e testing
            -   expo - expo app to development
    -   `pnpm` instead `yarn`
    -   `changesets` instead `release-it`

-   7398480: chore: new version

### Patch Changes

-   1045d1b: fix: build dist files by @irekrog
-   196bb3c: fix readme
-   64e0e64: chore: update readme

## 1.10.0-next.2

### Patch Changes

-   1045d1b: fix: build dist files by @irekrog

## 1.10.0-next.1

### Patch Changes

-   fix readme

## 1.10.0-next.0

### Minor Changes

-   55eaa05: update dependencies by @irekrog

### Breaking Changes during development

-   This repository is now a monorepo using `pnpm workspaces` and `turborepo`, divided on:
-   src/packages/
    -   react-native-select-pro - main package published on npm
    -   src/apps/
    -   e2e - e2e testing
    -   expo - expo app to development
        -   `pnpm` instead `yarn`
        -   `changesets` instead `release-it`

## Previous version here:

https://github.com/MobileReality/react-native-select-pro/releases
