import { expect, use } from 'chai'
import { streamAsync } from 'stream-async'
import cap from 'chai-as-promised'

use(cap)

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
    async asyncFun0(x) {
      this.foo += +x
      return this
    }
  }
  it('should await async fun.', async () => {
    const a = new A()
    await a.stream
      .fun()
      .asyncFun()
      .fun()
    expect(a.foo).to.eq(4)
  })
  it('should await async fun with params.', async () => {
    const a = new A()
    await a.stream
      .asyncFun()
      .asyncFun0(10)
      .asyncFun0(10)
    expect(a.foo).to.eq(22)
  })
})
