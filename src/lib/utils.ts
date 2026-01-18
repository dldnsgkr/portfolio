export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
) {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}
