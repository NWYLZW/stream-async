type BestReturnType<T> =
  T extends Promise<infer U> ? U :
    T extends (...args: any) => Promise<infer U> ? U :
      T extends (...args: any) => infer U ? U :
        T

type Wrap<T> = {
  [K in keyof T]: T[K] extends (...args: infer P) => infer R
    ? (...args: P) => Wrap<BestReturnType<R>>
    : T[K]
}

export const streamAsync = <T>(t: T) => {
  const promise = Promise.resolve<T>(t)

  return new Proxy(t as Wrap<T>, {
    get(_, property, receiver) {
      const val = t[property], type = typeof val
      console.log(
        property, type
      )
      if (type !== 'function') return val

      return streamAsync(t[property])
    },
    apply(fun, thisArg, args) {
      return streamAsync(promise.then(
        t => Reflect.apply(t, thisArg, args)
      ))
    }
  })
}
