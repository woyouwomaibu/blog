<template><h2 id="单线程的javascript" tabindex="-1"><a class="header-anchor" href="#单线程的javascript" aria-hidden="true">#</a> 单线程的Javascript</h2>
<p>JavaScript 语言的一大特点就是单线程。JavaScript 的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript 的主要用途是与用户互动，以及操作 DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript 同时有两个线程，一个线程在某个 DOM 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？所以，为了避免复杂性，从一诞生，JavaScript 就是单线程，这已经成了这门语言的核心特征，将来也不会改变。<br>
为了利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程，但是子线程完全受主线程控制，且不得操作 DOM。所以，这个新标准并没有改变 JavaScript 单线程的本质。</p>
<h2 id="微任务和宏任务" tabindex="-1"><a class="header-anchor" href="#微任务和宏任务" aria-hidden="true">#</a> 微任务和宏任务</h2>
<p>MicroTask（微任务）：Process.nextTick（Node独有）、Promise、Object.observe(废弃)、MutationObserver<br>
MacroTask（宏任务）：script全部代码、setTimeout、setInterval、setImmediate（浏览器暂时不支持，只有IE10支持，具体可见MDN）、I/O、UI Rendering</p>
<h2 id="关于事件循环" tabindex="-1"><a class="header-anchor" href="#关于事件循环" aria-hidden="true">#</a> 关于事件循环</h2>
<p>所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。主线程之外，还存在2个任务队列(task queue)，微任务队列和宏任务队列。当主线程的同步队列执行完毕，就会去微队列取任务，直到微队列清空。然后检查宏队列，去宏队列取任务，并且每一个宏任务执行完毕都会去微队列跑一遍，看看有没有新的微任务，有的话再把微任务清空。这样依次循环，便称之为Event Loop。</p>
<h2 id="为何需要事件循环" tabindex="-1"><a class="header-anchor" href="#为何需要事件循环" aria-hidden="true">#</a> 为何需要事件循环</h2>
<p>因为 JavaScript 是单线程的。单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。为了协调事件（event），用户交互（user interaction），脚本（script），渲染（rendering），网络（networking）等，用户代理（user agent）必须使用事件循环。</p>
<h2 id="举例分析" tabindex="-1"><a class="header-anchor" href="#举例分析" aria-hidden="true">#</a> 举例分析</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'script start'</span><span class="token punctuation">)</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'setTimeout-200'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'setTimeout'</span><span class="token punctuation">)</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'inner-setTimeout'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise1'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise2'</span><span class="token punctuation">)</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise3'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise4'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise5'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'script end'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><p>运行结果为</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>script start
promise2
script end
promise3
promise5
promise4
setTimeout
promise1
inner-setTimeout
setTimeout-200
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>来仔细分析一下浏览器是如何执行的</p>
<ul>
<li>首先顺序执行完主进程上的同步任务，第一句console.log，new Promsie()，然后是最后一句console.log。这里要注意new Promsie()的时候是同步，立即执行。</li>
<li>再主线程同步任务完成后，检查下微任务队列，发现此队列不为空，执行第一个promise的then回调，输出 'promise3'，然后执行第二个promise的then回调，输出'promise5'，由于第一个promise的.then()的返回依然是promise，所以第二个.then()会放到microtask队列继续执行，输出 'promise4'，此时microtask队列为空，进入下一个事件循环。</li>
<li>微任务清空之后，开始检查下宏任务队列，发现有2个setTimeout的回调函数，先取出setTimeout-0到主线程执行，打印'setTimeout'。执行完后继续检查微任务队列，输出promise1，微任务执行完发现里面还有setTimeout的回调函数，执行打印'inner-setTimeout'。</li>
<li>然后继续检查microtask队列，发现为空，进入下一个事件循环，检查宏任务队列，将setTimeout-200取出到主线程执行，输出'setTimeout-200'。至此，代码执行结束。</li>
</ul>
<h2 id="进阶之async-await" tabindex="-1"><a class="header-anchor" href="#进阶之async-await" aria-hidden="true">#</a> 进阶之async/await</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">async1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"async1 start"</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> <span class="token function">async2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"async1 end"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">async2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"async2"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"script start"</span><span class="token punctuation">)</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"setTimeout"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>

<span class="token function">async1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"promise1"</span><span class="token punctuation">)</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"promise2"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"script end"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>运行结果为</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="先稍微讲一下async-await。" tabindex="-1"><a class="header-anchor" href="#先稍微讲一下async-await。" aria-hidden="true">#</a> 先稍微讲一下async/await。</h3>
<p>async 做一件什么事情？<br>
带async关键字的函数，它使得你的函数的返回值必定是promise对象，也就是说如果async关键字函数返回的不是promise，会自动用Promise.resolve()包装，如果async关键字函数显式地返回promise，那就以你返回的promise为准。<br>
await 在等什么？<br>
await等的是右侧「表达式」的结果。等到之后，对于await来说，分2个情况。如果它等到的是一个promise对象，await也会暂停async后面的代码，先执行async外面的同步代码，等着Promise对象 fulfilled，然后把resolve的参数作为await表达式的运算结果。如果不是promise , await会阻塞后面的代码，先执行async外面的同步代码，同步代码执行完，再回到async内部，把这个非promise的东西，作为await表达式的结果。</p>
<h3 id="开始分析" tabindex="-1"><a class="header-anchor" href="#开始分析" aria-hidden="true">#</a> 开始分析</h3>
<ul>
<li>首先执行主线程的同步任务，打印'script start',然后执行async1(), 它也是同步的，只是返回值是Promise，打印'async1 start'。</li>
<li>接着遇到await，执完行async2，跳出async1()，执行外面的同步代码，打印'promise1',将.then放入事件循环的微任务队列，继续执行同步任务，打印'script end'。</li>
<li>执行完外面的同步代码后，回到async1()内部继续执行后面的代码，打印'async1 end'。同步任务结束，开始检查微任务队列，执行promise.then()。</li>
<li>微任务队列空了之后，取宏任务队列的setTimeout到主线程执行，打印'setTimeout',至此，代码全部执行完毕。</li>
</ul>
<h2 id="关于event-loop值的细读的文章" tabindex="-1"><a class="header-anchor" href="#关于event-loop值的细读的文章" aria-hidden="true">#</a> 关于Event Loop值的细读的文章</h2>
<p><a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/" target="_blank" rel="noopener noreferrer">https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/<OutboundLink/></a></p>
</template>
