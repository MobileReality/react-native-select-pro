import type { ComponentProps } from 'react';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import type { OptionsList } from '../components/options-list';
import { ANIMATION_DURATION } from '../constants/styles';

type UseAnimationProps = Pick<ComponentProps<typeof OptionsList>, 'animation' | 'isOpened'>;

export const useAnimation = ({ isOpened, animation }: UseAnimationProps) => {
    const ref = useRef(new Animated.Value(0));

    useEffect(() => {
        if ((typeof animation === 'number' && animation === 0) || animation) {
            Animated.timing(ref.current, {
                toValue: isOpened ? 1 : 0,
                duration: typeof animation === 'boolean' ? ANIMATION_DURATION : animation,
                useNativeDriver: true,
            }).start();
        }
    }, [isOpened, animation]);

    return animation ? ref.current : null;
};
