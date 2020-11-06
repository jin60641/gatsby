/**
 * adds an callback param to the original function
 * @param {function} fn
 * @returns {function}
 */
module.exports = function wrapCallback<T>(
  fn: () => Promise<T>
): () => Promise<T> {
  return function (...args): Promise<T> {
    let cb
    if (typeof args[args.length - 1] === `function`) {
      cb = args.pop()
    }

    const promise = fn.apply(this, args)

    if (typeof cb === `function`) {
      promise.then(
        value => setImmediate(cb, null, value),
        err => setImmediate(cb, err)
      )
    }

    return promise
  }
}
