// try {
//   Promise.reject('12312')
// } catch(e)  {
//   console.log(e, 'e')
// }

// const p1 = Promise.resolve(111);
// p1.then().then(val => {
//   console.log(val, 'val');
// })

// Promise.resolve(Promise.resolve(1)).then(val => console.log(val));
// Promise.resolve(2).then(val => console.log(val))

// Promise.resolve().then(() => Error('devna')).then(val => console.log(val, 'resolved'), err => console.log(err, 'rejected'))
// Promise.resolve().then(() => {throw 'devan'}).then(val => console.log(val, 'resolved'), err => console.log(err, 'rejected'))
// 一下错误写法
// Promise.resolve().then(() => (return 1)).then(val => console.log(val, 'val'));
// Promise.reject(1).then(null, a => 100).then(val => console.log(val, 'resolved'), err => console.log(err, 'rejected'))
// Promise.resolve(Promise.reject(1)).then(a => console.log(a, 'resolved'), b => console.log(b, 'rejected'));

// let p1 = new Promise(() => {});
// let p2 = p1.catch();
// console.log(p2)
// console.log(p2 === p1)

/*let p1 = Promise.resolve('foo');
// 重点finally方法
let p2 = p1.finally(); 
let p3 = p1.finally(() => undefined);  
let p4 = p1.finally(() => Promise.resolve());
let p5 = p1.finally(() => 'bar');
let p6 = p1.finally(() => Promise.resolve('bar'));
let p7 = p1.finally(() => Error('foo'));
*/
/**
 *  onFinally 被设计为一个状态
无关的方法，所以在大多数情况下它将表现为父期约的传递。对于已解决状态和被拒绝状态都是如此
如果返回的是一个待定的期约，或者 onFinally 处理程序抛出了错误（显式抛出或返回了一个拒
绝期约），则会返回相应的期约（待定或拒绝）
 */
/*
let p8 = p1.finally(() => {throw 'devan'});
let p9 = p1.finally(() => new Promise(()=> {}));
setTimeout(console.log,0,p2) // Promise <resolved>: foo
setTimeout(console.log,0,p3) // Promise <resolved>: foo
setTimeout(console.log,0,p4) // Promise <resolved>: foo
setTimeout(console.log,0,p5) // Promise <resolved>: foo
setTimeout(console.log,0,p6) // Promise <resolved>: foo
setTimeout(console.log,0,p7) // Promise <resolved>: foo
setTimeout(console.log,0,p8) // Promise <resolved>: foo
setTimeout(console.log,0,p9) // Promise { <pending> }
*/
/*
let p = new Promise((resolve, reject) => {
  try {
    throw Error('foo');
  } catch(e) {}
  resolve('bar')
})

setTimeout(console.log,0, p);
*/
/*
Promise.all([Promise.reject(1)]).catch(err => {
  console.log(err);
})
*/
debugger
class TrackablePromise extends Promise{
  constructor(executor) {
    console.log('1111111111')
    const notifyHandlers = [];
    super((resolve,reject) => {
      return executor(resolve, reject, status => {
        notifyHandlers.map(handler => handler(status))
      })
    });
    this.notifyHandlers = notifyHandlers;
  }

  notify(notifyHandler) {
    this.notifyHandlers.push(notifyHandler);
    return this;
  }
}

let p = new TrackablePromise((resolve, reject, notify) => {
  function countDown(x) {
    if(x > 0) {
      notify(`${20 * x}% remaining`);
      setTimeout(() => countDown(x -1), 1000)
    } else {
      resolve();
    }
  }
  countDown(5);
})
debugger
p.notify(x => setTimeout(console.log, 0, 'progress:', x));
p.then(() => setTimeout(console.log,0,'completed'))