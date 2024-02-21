import { useSpring } from '@react-spring/web';

interface AnimatedVisibilityProps {
    isVisible: boolean;
}

const useAnimatedVisibility = ({isVisible} :AnimatedVisibilityProps) => {
    const animationStyles = useSpring({
        to: { opacity: isVisible ? 1 : 0 },
        from: { opacity: 0 },
        config: { tension: 180, friction: 50 },
      });
    
      return animationStyles;
};

export default useAnimatedVisibility;
