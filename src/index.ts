type BestReturnType<T> =
  T extends Promise<infer U> ? U :
    T extends (...args: any) => Promise<infer U> ? U :
      T extends (...args: any) => infer U ? U :
        T

type FadeAsync<T> = {
  [K in keyof T]: T[K] extends (...args: infer P) => infer R
    ? (...args: P) => Wrap<BestReturnType<R>>
    : T[K]
}

type Gets<T, U> = Pick<T, {
  [K in keyof T]: T[K] extends U ? K : never
}[keyof T]>

type Wrap<T, K extends string = 'stream'> = FadeAsync<Gets<
  Omit<T, K>, Function
>>

export const streamAsync = <T>(source: T): Wrap<T> => {
  const promiseSource = source instanceof Promise
    ? source
    : Promise.resolve(source)

  return new Proxy(function () {} as any, {
    get(_, property) {
      const propertyVal = source[property]

      if ([ 'then', 'catch', 'finally' ].includes(
        property as string
      )) return new Proxy(function () {}, {
        apply(_, thisArg, argArray) {
          return Reflect.apply(propertyVal, source, argArray)
        }
      })

      return (...args) => streamAsync(promiseSource.then(t => t[property](args)))
    }
  })
}
