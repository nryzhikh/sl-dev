import { useState, useEffect, ReactNode } from 'react';
import { animated, useSpring } from '@react-spring/web';

interface AnimatedWrapperProps {
  isVisible: boolean;
  children: ReactNode;
}

const AnimationWrapper = ({ isVisible, children }: AnimatedWrapperProps): ReactNode | null => {
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

  return show ? (
    <animated.div style={{ ...animationProps, overflow: 'hidden', transformOrigin: 'top' }}>
      {children}
    </animated.div>
  ) : null;
};

export default AnimationWrapper;
