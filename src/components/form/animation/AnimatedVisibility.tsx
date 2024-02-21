import { useState, useEffect, ComponentType, ReactElement } from 'react';
import { animated, useSpring } from '@react-spring/web';

interface AnimatedVisibilityProps {
  isVisible: boolean;
  [key: string]: any;
}

const AnimatedVisibility = (WrappedComponent: ComponentType<AnimatedVisibilityProps>) => 
  ({ isVisible, ...props }: any): ReactElement | null => {
    
    const [show, setShow] = useState<boolean>(isVisible);
    const animationProps = useSpring({
        to: {
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
        },
        from: { opacity: 0, transform: 'scaleY(0)' },
        config: { tension: 200, friction: 20 }, 

    });

    useEffect(() => {
        if (isVisible) {
            setShow(true);
        } else {
            const timeoutId = setTimeout(() => setShow(false), 400);
            return () => clearTimeout(timeoutId);
        }
    }, [isVisible]);

    return (
        show ? <animated.div style={{...animationProps, overflow: 'hidden', transformOrigin: 'top'}}>
            <WrappedComponent {...props} />
        </animated.div> : null
    );
};

export default AnimatedVisibility;
