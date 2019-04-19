$.util.debounce = (callback, interval = 200) => {
  let debounceTimeout = null;
  return () => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    debounceTimeout = setTimeout(callback, interval);
  };
};
