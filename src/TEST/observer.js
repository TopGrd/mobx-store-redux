const proxies = new WeakMap()
const observers = new WeakMap()
let currentObserver = null

function isObject(obj) {
  return typeof obj === 'object'
}

function observable(obj) {
  const dynamicObservableObject = new Proxy(obj, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver)
      if (currentObserver) {
        registerObserver(target, key)
        if (isObject(result)) {
          return proxies.get(result) || observable(result)
        }
      }

      return proxies.get(result) || result
    },

    set(target, key, value, receiver) {
      if (key === 'length' || value !== Reflect.get(target, key, receiver)) {
        Reflect.set(target, key, value, receiver)
        queueObserverFuncs(target, key)
      }

      return true
    },
  })

  proxies.set(obj, dynamicObservableObject)

  return dynamicObservableObject
}

function registerObserver(target, key) {
  const observerMap = observers.get(target)
  if (observerMap) {
    let observerFunc = observerMap.get(key)
    if (!observerFunc) {
      const set = new Set()
      observerMap.set(key, set)
      observerFunc = set
    }

    observerFunc.add(currentObserver)
    observerMap.set(key, observerFunc)
  } else {
    const map = new Map()
    const set = new Set()
    set.add(currentObserver)
    map.set(key, set)
    observers.set(target, map)
  }
}

function isObservable(obj) {
  return proxies.get(obj)
}

function autorun(func) {
  currentObserver = func
  func()
  currentObserver = null
}

function queueObserverFuncs(target, key) {
  observers
    .get(target)
    .get(key)
    .forEach(func => func())
}

const user = observable({
  name: 'jack',
  teacher: {
    man: 'jas'
  }
})

autorun(() => console.log(`${user.name} is man ${user.teacher.man} is sss`))

user.teacher.man = 'mike'
