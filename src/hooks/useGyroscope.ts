import { useState, useEffect, useRef } from 'react';

interface GyroscopeData {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
  isSupported: boolean;
}

export function useGyroscope(): GyroscopeData {
  const [data, setData] = useState<GyroscopeData>({
    alpha: null,
    beta: null,
    gamma: null,
    isSupported: false,
  });
  const permissionAsked = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      setData({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
        isSupported: true,
      });
    };

    const initGyroscope = async () => {
      if (permissionAsked.current) return;
      permissionAsked.current = true;

      // iOS 13+ requires permission
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function'
      ) {
        try {
          const permission = await (
            DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }
          ).requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, true);
          }
        } catch {
          // Permission denied or not available
        }
      } else {
        // Android or older iOS
        window.addEventListener('deviceorientation', handleOrientation, true);
        // Test if it's actually supported
        setTimeout(() => {
          setData(prev => ({ ...prev, isSupported: true }));
        }, 500);
      }
    };

    initGyroscope();

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  return data;
}
