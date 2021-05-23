import { use } from 'chai'
import { streamAsync } from 'stream-async'
import cap from 'chai-as-promised'

use(cap)

const logger = t => new Proxy(t, {
  get(target, p) {
    console.log(
      'logger.get:', target, p
    )
    return t[p]
  },
  apply(target, thisArg, argArray) {
    console.log(
      'logger.apply:', target, thisArg, argArray
    )
    return Reflect.apply(target, thisArg, argArray)
  }
})

describe('basic support', function () {
  class A {
    stream = streamAsync(this)
    foo = 1
    get bar() {
      return this.foo + 1
    }
    fun() {
      this.foo += 1
      return this
    }
    async asyncFun() {
      this.foo += 1
      return this
    }
  }
  it('should await fun by chain.', async () => {
    const a = new A(), x = Promise.resolve(a)
    console.log(
      await x.then(
        (...args) => x.then(a => a.asyncFun.apply(a, args))
      ).then(
        (...args) => x.then(a => a.asyncFun.apply(a, args))
      ).then(
        a => a.foo
      )
    )

    console.log(
      await a.stream.fun().asyncFun()
    )
  })
})
