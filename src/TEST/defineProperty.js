const obj = {}

Object.defineProperty(obj, 'a', {
  enumerable: true,
  configurable: true,
  get() {
    console.log('get a:');
    return 2
  },

  set(newValue) {
    let value = obj.a
    if (newValue === value) {
      return
    }
    console.log('set a:');
    value = newValue

  }
})


const obj2 = {
  a: 1
}

const proxyTarget = new Proxy(obj2, {
  get(target, key) {
    console.log(`get ${key}:`)
    return Reflect.get(target, key)
  },

  set(target, key, value) {
    console.log(`set ${key}: ${value}`)
    Reflect.set(target, key, value)
  }
})
console.log(proxyTarget.a); // get a: 1
proxyTarget.a = 101 // set a: 101
console.log(proxyTarget.a); // get a: 101
