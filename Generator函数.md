# Generator函数

Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象

下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行

## yield

由于 Generator 函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield表达式就是暂停标志

```
function* gener(){
  yield 1+2
}
var a = gener();
console.log(a)
console.log(a.next())
console.log(a.next())

输出结果：

GeneratorFunctionPrototype {
  "_invoke": [Function invoke]
}
Object {
  "done": false,
  "value": 3
}
Object {
  "done": true,
  "value": undefined
}
```
Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身
```
function* gen(){
  yield 1+1
}
var g = gen()
g[Symbol.iterator]() == g //true


function *foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);//1 2 3 4 5
}

//Generater实现斐波那契数列
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

for (let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n);
}
//获取Generator值
function* numbers () {
  yield 1
  yield 2
  return 3
  yield 4
}

// 扩展运算符
[...numbers()] // [1, 2]

// Array.from 方法
Array.from(numbers()) // [1, 2]

// 解构赋值
let [x, y] = numbers();
x // 1
y // 2

// for...of 循环
for (let n of numbers()) {
  console.log(n)
}
// 1
// 2

//Generator.prototype.return() 终结Generator
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }
```

## 协程

###  解释

多个线程互相协作，完成异步任务

### 运行流程

1)第一步，协程A开始执行。

2)第二步，协程A执行到一半，进入暂停，执行权转移到协程B。

3)第三步，（一段时间后）协程B交还执行权。

4)第四步，协程A恢复执行


