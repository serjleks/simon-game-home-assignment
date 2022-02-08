export const throttle = (callbackFn, timeout = 200) => {
  let state;
  let context = this;

  return (...args) => {
    if (!state) {
      state = true;

      callbackFn.apply(context, args);

      setTimeout(() => {
        state = false;
      }, timeout);
    }
  };
};
