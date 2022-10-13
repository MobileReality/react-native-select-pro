import type { ComponentProps } from 'react';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import type { OptionsList } from '../components/options-list';

type UseAnimationProps = Pick<
    ComponentProps<typeof OptionsList>,
    'animated' | 'animationDuration' | 'isOpened'
>;

export const useAnimation = ({ isOpened, animated, animationDuration }: UseAnimationProps) => {
    const ref = useRef(new Animated.Value(0));
    useEffect(() => {
        if (animated) {
            Animated.timing(ref.current, {
                toValue: isOpened ? 1 : 0,
                duration: animationDuration,
                useNativeDriver: true,
            }).start();
        }
    }, [isOpened, animated, animationDuration]);

    return ref.current;
};
