/**
 * Returns true is the current environment is a browser environment
 */
const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

/**
 * Parses JWToken and returns json
 */
const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => {
        const temp = `00${c.charCodeAt(0).toString(16)}`;
        return `%${temp.slice(-2)}`;
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};

/**
 * Invoke a manual event loop await
 * Eg. to wait 2 seconds
 * await wait(2000)
 */
const wait = (ms = 100) => {
  return new Promise<void>((resolve) => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      resolve();
    }, ms);
  });
};

// create an array of n entries with values
const arr = [...Array(101).keys()].map((n) => ({ label: `${n}%`, value: n }));

// Generate a random alphanumerical string of length 11
Math.random().toString(36).substring(2);

// Get the current page's query parameters as an object
document.location.search
  .replace(/(^\?)/, '')
  .split('&')
  .reduce((o, n) => {
    const qp = n.split('=');
    o[qp[0]] = qp[1];
    return o;
  }, {});

// sequence generator
Array.from({ length: 100 });

// random from array
const getRandom = (arr) => arr[Math.floor(Math.random() * (arr.length + 1))];
