const MAX_RETRIES = 3;
const RETRY_INTERVAL = 3000;

const lazy = (pr: Promise<any>): Promise<any> => {
  const doSomethingAsync = (
    promise: Promise<any>,
    retryCount: number = 0
  ): Promise<any> => {
    return promise.catch(err => {
      retryCount += 1;
      if (retryCount <= MAX_RETRIES) {
        const delayedFetch = new Promise(resolve => {
          const timeoutId = setTimeout(() => {
            clearTimeout(timeoutId);
            resolve(doSomethingAsync(pr, retryCount));
          }, RETRY_INTERVAL);
        });
        return delayedFetch;
      }

      throw err;
    });
  };

  return doSomethingAsync(pr);
};

export default lazy;