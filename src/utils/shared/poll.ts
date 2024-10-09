interface Params {
  fn: (args?: any) => any;
  validate: (args?: any) => boolean;
  interval: number;
  maxAttempts: number;
}
type Resolve = (value: unknown) => void;
type Reject = (reason?: any) => void;

export const poll = ({ fn, validate, interval, maxAttempts }: Params) => {
  let attempts = 0;

  const executePoll = async (resolve: Resolve, reject: Reject) => {
    const result = await fn();
    attempts++;

    if (validate(result)) {
      return resolve(result);
    } else if (maxAttempts && attempts === maxAttempts) {
      return reject(new Error('Exceeded max attempts'));
    } else {
      setTimeout(executePoll, interval, resolve, reject);
    }
  };

  return new Promise(executePoll);
};
