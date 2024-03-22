// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = <F extends (...args: any[]) => any>(
  func: F,
  delay: number,
): F => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return ((...args: Parameters<F>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as F;
};

export default debounce;
