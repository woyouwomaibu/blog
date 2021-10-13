---
title: 浏览器中的的Event Loop
date: 2020-04-09
tags:
 - Javascript
description: JavaScript 语言的一大特点就是单线程。单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。为了协调事件（event），用户交互（user interaction），脚本（script），渲染（rendering），网络（networking）等，用户代理（user agent）必须使用事件循环。
---

## 单线程的Javascript
JavaScript 语言的一大特点就是单线程。JavaScript 的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript 的主要用途是与用户互动，以及操作 DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript 同时有两个线程，一个线程在某个 DOM 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？所以，为了避免复杂性，从一诞生，JavaScript 就是单线程，这已经成了这门语言的核心特征，将来也不会改变。  
为了利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程，但是子线程完全受主线程控制，且不得操作 DOM。所以，这个新标准并没有改变 JavaScript 单线程的本质。
## 微任务和宏任务
MicroTask（微任务）：Process.nextTick（Node独有）、Promise、Object.observe(废弃)、MutationObserver  
MacroTask（宏任务）：script全部代码、setTimeout、setInterval、setImmediate（浏览器暂时不支持，只有IE10支持，具体可见MDN）、I/O、UI Rendering
## 关于事件循环
所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。主线程之外，还存在2个任务队列(task queue)，微任务队列和宏任务队列。当主线程的同步队列执行完毕，就会去微队列取任务，直到微队列清空。然后检查宏队列，去宏队列取任务，并且每一个宏任务执行完毕都会去微队列跑一遍，看看有没有新的微任务，有的话再把微任务清空。这样依次循环，便称之为Event Loop。
## 为何需要事件循环  
因为 JavaScript 是单线程的。单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。为了协调事件（event），用户交互（user interaction），脚本（script），渲染（rendering），网络（networking）等，用户代理（user agent）必须使用事件循环。
## 举例分析
``` js
console.log('script start')

setTimeout(function () {
    console.log('setTimeout-200');
}, 200)

setTimeout(function () {
    console.log('setTimeout')
    setTimeout(function () {
        console.log('inner-setTimeout')
    });
    Promise.resolve().then(function () {
        console.log('promise1')
    });
})

new Promise(function(resolve, reject) {
    console.log('promise2')
    resolve()
    }).then(function () {
    console.log('promise3')
}).then(function () {
    console.log('promise4')
})

Promise.resolve().then(function () {
    console.log('promise5')
});

console.log('script end')
```
运行结果为
```
script start
promise2
script end
promise3
promise5
promise4
setTimeout
promise1
inner-setTimeout
setTimeout-200
```
来仔细分析一下浏览器是如何执行的  
+ 首先顺序执行完主进程上的同步任务，第一句console.log，new Promsie()，然后是最后一句console.log。这里要注意new Promsie()的时候是同步，立即执行。  
+ 再主线程同步任务完成后，检查下微任务队列，发现此队列不为空，执行第一个promise的then回调，输出 'promise3'，然后执行第二个promise的then回调，输出'promise5'，由于第一个promise的.then()的返回依然是promise，所以第二个.then()会放到microtask队列继续执行，输出 'promise4'，此时microtask队列为空，进入下一个事件循环。  
+ 微任务清空之后，开始检查下宏任务队列，发现有2个setTimeout的回调函数，先取出setTimeout-0到主线程执行，打印'setTimeout'。执行完后继续检查微任务队列，输出promise1，微任务执行完发现里面还有setTimeout的回调函数，执行打印'inner-setTimeout'。  
+ 然后继续检查microtask队列，发现为空，进入下一个事件循环，检查宏任务队列，将setTimeout-200取出到主线程执行，输出'setTimeout-200'。至此，代码执行结束。
## 进阶之async/await
``` js
async function async1() {
    console.log("async1 start")
    await async2()
    console.log("async1 end")
}

async function async2() {
    console.log("async2")
}

console.log("script start")

setTimeout(function() {
    console.log("setTimeout")
}, 0)

async1()

new Promise(function(resolve) {
    console.log("promise1")
    resolve();
}).then(function() {
    console.log("promise2")
})

console.log("script end")
```
运行结果为
```
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
```
### 先稍微讲一下async/await。  
async 做一件什么事情？  
带async关键字的函数，它使得你的函数的返回值必定是promise对象，也就是说如果async关键字函数返回的不是promise，会自动用Promise.resolve()包装，如果async关键字函数显式地返回promise，那就以你返回的promise为准。  
await 在等什么？  
await等的是右侧「表达式」的结果。等到之后，对于await来说，分2个情况。如果它等到的是一个promise对象，await也会暂停async后面的代码，先执行async外面的同步代码，等着Promise对象 fulfilled，然后把resolve的参数作为await表达式的运算结果。如果不是promise , await会阻塞后面的代码，先执行async外面的同步代码，同步代码执行完，再回到async内部，把这个非promise的东西，作为await表达式的结果。
### 开始分析
+ 首先执行主线程的同步任务，打印'script start',然后执行async1(), 它也是同步的，只是返回值是Promise，打印'async1 start'。
+ 接着遇到await，执完行async2，跳出async1()，执行外面的同步代码，打印'promise1',将.then放入事件循环的微任务队列，继续执行同步任务，打印'script end'。
+ 执行完外面的同步代码后，回到async1()内部继续执行后面的代码，打印'async1 end'。同步任务结束，开始检查微任务队列，执行promise.then()。
+ 微任务队列空了之后，取宏任务队列的setTimeout到主线程执行，打印'setTimeout',至此，代码全部执行完毕。
## 关于Event Loop值的细读的文章
<https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/>







