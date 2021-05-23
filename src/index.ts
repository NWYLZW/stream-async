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

export const streamAsync = <T>(source: T) => {
  const promiseSource = Promise.resolve(source)
  return new Proxy(source as Wrap<T>, {
    get(_, property) {
      const propertyVal = source[property]
      console.log(
        source, property, propertyVal, typeof propertyVal
      )

      if ([ 'then', 'catch', 'finally' ].includes(
        property as string
      )) return new Proxy(function () {}, {
        apply(_, thisArg, argArray) {
          return Reflect.apply(propertyVal, source, argArray)
        }
      })

      return (...args) => streamAsync(promiseSource.then(
        t => t[property].apply(t, args)
      ))
    }
  })
}
