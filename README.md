# stream async

<p align="center">
  <a href="https://github.com/NWYLZW/stream-async/actions/runs/524142045">
    <img src="https://github.com/NWYLZW/stream-async/workflows/publish%20to%20npm/badge.svg?sanitize=true" alt="Build Status">
  </a>
  <a href="https://npmcharts.com/compare/stream-async?minimal=true">
    <img src="https://img.shields.io/npm/dm/stream-async.svg?sanitize=true" alt="Downloads">
  </a>
  <br>
  <a href="https://www.npmjs.com/package/stream-async">
    <img src="https://img.shields.io/npm/v/stream-async.svg?sanitize=true" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/stream-async">
    <img src="https://img.shields.io/npm/l/stream-async.svg?sanitize=true" alt="License">
  </a>
</p>

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
