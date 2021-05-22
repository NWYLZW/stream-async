import { expect, use } from 'chai'
import { streamAsync } from 'stream-async'
import cap from 'chai-as-promised'

use(cap)

describe('basic support.', function () {
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
  it('should await fun by chain.', () => {
    const a = new A()
    console.log(
      a.stream.asyncFun().asyncFun
    )
  })
})
