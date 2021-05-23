# stream async

do async method by stream code style.

## how to use

### install in nodejs

```shell
npm install stream-async
# or
yarn add stream-async
```

### use

* simple by class

```js
import { streamAsync } from 'stream-async'
class A {
  foo = 1
  async asyncFun() {
    this.foo += 1
    return this
  }
}
const a = streamAsync(new A())
a.asyncFun().asyncFun()
console.log(a.foo)
// there will output `3`
```

* flexible by class

```js
import { streamAsync } from 'stream-async'
class A {
  stream = streamAsync(this)
  foo = 1
  fun () {
    this.foo += 1
    return this
  }
  async asyncFun() {
    this.foo += 1
    return this
  }
  async asyncFun0(x) {
    this.foo += x
    return this
  }
}
const a = new A()
a.stream
  .asyncFun()
  .fun()
  .asyncFun()
  .asyncFun0(10)

console.log(a.foo)
// there will output `14`
```
