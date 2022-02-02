/**
 * Returns true is the current environment is a browser environment
 */
const isBrowser =
  typeof window !== "undefined" && typeof window.document !== "undefined";

/**
 * Parses JWToken and returns json
 */
const parseJwt = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => {
        const temp = `00${c.charCodeAt(0).toString(16)}`;
        return `%${temp.slice(-2)}`;
      })
      .join("")
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
