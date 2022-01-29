export const errorFirst = (promise) => promise.then((x) => [null, x]).catch((x) => [x, {}]);

