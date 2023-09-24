/* eslint-disable react/prop-types */
import { useEffect } from 'react';

export function setWithExpiry(key, value, ttl) {
  const item = {
    value: value,
    expiry: new Date().getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getWithExpiry(key) {
  const itemString = window.localStorage.getItem(key);
  if (!itemString) return null;

  const item = JSON.parse(itemString);
  const isExpired = new Date().getTime() > item.expiry;

  if (isExpired) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}
const ErrorFallback = ({ error }) => {
  useEffect(() => {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    if (error?.message && chunkFailedMessage.test(error.message)) {
      if (!getWithExpiry('chunk_failed')) {
        setWithExpiry('chunk_failed', 'true', 10000);
        window.location.reload();
      }
    }
  }, [error]);
  return (
    <div className="w-screen h-screen flex justify-center items-center content-center">
      <p>Something went wrong.</p>
      <pre>{error?.message}</pre>
    </div>
  );
};

export default ErrorFallback;
