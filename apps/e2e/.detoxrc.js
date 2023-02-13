module.exports = {
    testRunner: {
        args: {
            config: 'e2e/config/jest.config.js',
            maxWorkers: process.env.CI ? 2 : undefined,
            _: ['e2e'],
        },
    },
    apps: {
        ios: {
            type: 'ios.app',
            binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/e2eApp.app',
            build: 'xcodebuild -workspace ios/e2eApp.xcworkspace -scheme e2eApp -sdk iphonesimulator -derivedDataPath ios/build',
        },
        'android.debug': {
            type: 'android.apk',
            binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
            build: 'cd android && ./gradlew assembleDebug  && ./gradlew assembleAndroidTest -DtestBuildType=debug && cd ..',
        },
        'android.release': {
            type: 'android.apk',
            binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
            build: 'cd android && ./gradlew assembleRelease && ./gradlew assembleAndroidTest -DtestBuildType=release && cd ..',
        },
    },
    devices: {
        simulator: {
            type: 'ios.simulator',
            device: {
                type: 'iPhone 12',
            },
        },
        emulator: {
            type: 'android.emulator',
            device: {
                avdName: 'Pixel_4_API_30',
            },
        },
    },
    configurations: {
        ios: {
            device: 'simulator',
            app: 'ios',
        },
        'android.emu.debug': {
            device: 'emulator',
            app: 'android.debug',
        },
        'android.emu.release': {
            device: 'emulator',
            app: 'android.release',
        },
    },
};
