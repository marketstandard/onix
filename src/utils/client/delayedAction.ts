export const delayedAction = (delay: number, callback: () => void): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          callback();
          resolve();
        });
      });
    }, delay);
  });
};
