# stream async

do async method by stream code style.

## how to use

### install

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
  async asyncFun() {
    this.foo += 1
    return this
  }
}
const a = new A()
a.stream.asyncFun().asyncFun()
console.log(a.foo)
// there will output `3`
```
