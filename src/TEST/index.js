descriptor = {
  configurable: true,
  enumerable: true,
  initializer: function initializer() {
    return 3.14
  },
  writable: true,
}

descriptor = {
  configurable: true,
  enumerable: true,
  value: function () {},
  writable: true,
}

function readonly(target, key, descriptor) {
  descriptor.writable = false
  return descriptor
}

decoratorName(target, key, descriptor)

let descriptor = {
  configurable: true,
  enumerable: true,
  initializer: function initializer() {
    return 3.14
  },
  writable: true,
}

function shouldComponentUpdate(nextProps, nextState) {
  return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
}

function pureRender(component) {
  if (component.prototype.shouldComponentUpdate !== undefined) {
    console.error('不能装饰已经实现shouldComponentUpdate的组件');
  }

  component.prototype.shouldComponentUpdate = shouldComponentUpdate;
  return component;
}

@pureRender
class MyComponent extends React.Component {}

/**
 * 包装 react 组件
 * @param target
 */
function observer(target) {
  target.prototype.componentWillMount = function() {
    targetCWM && targetCWM.call(this)
    ReactMixin.componentWillMount.call(this)
  }
}

var ReactMixin = {
  componentWillMount: function() {
      autorun(() => {
          this.render();
          this.forceUpdate();
      });
  }
};

function addColor(color) {
  return function(target) {
    target.color = color
  }
}

@addColor('red')
class ColorGround {
  @readonly count = 3

  outColor() {
    console.log(this.color);
  }
}


function log(target, key, descriptor) {
  const desc = Object.getOwnPropertyDescriptors(target.prototype)
  for (const key in desc) {
    if (key === 'constructor') continue
    const fn = desc[key].value
    if (typeof fn === 'function') {
      Object.defineProperty(target.prototype, key, {
        value(...args) {
          console.log(`before run fn: ${key}`)
          return fn.apply(this, args)
        },
      })
    }
  }
}

@log
class Num {
  @readonly PI = 3.14

  add(x, y) {
    return x + y
  }
}

const n = new Num()
n.PI = 3
console.log(n.add(3, 4))
