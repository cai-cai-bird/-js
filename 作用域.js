getName();              // 5 直接调用那么就是访问当前上文作用域内的叫getName的函数 变量声明提升

// 声明了一个叫Foo的 函数
function Foo() {
    // 注意它没有var声明，所以先向当前Foo函数作用域内寻找getName变量，没有。再向当前函数作用域上层，即外层作用域内寻找是否含有getName变量，找到了，也就是 window 中的 `function() {console.log(4);}` 函数，将此变量的值赋值为 `function() {console.log(1);}`。
    // 注意：此处若依然没有找到会一直向上查找到 window 对象，若 window 对象中也没有 getName 属性，就在 window 对象中创建一个 getName变量。
    getName = function () {
        console.log(1);
    };
    var getAge = function () {
        console.log('age');
    };
    return this;    // this的指向是由所在函数的调用方式决定的。返回的是 window对象
}

// 为Foo创建了一个叫getName的 静态属性 存储了一个 匿名函数
Foo.getName = function () {
    console.log(2);
};

// 为Foo的 原型对象 新创建了一个叫getName的 匿名函数
Foo.prototype.getName = function () {
    console.log(3);
};

// 通过 函数变量表达式 创建了一个getName的函数    这个把下面那个函数覆盖了
var getName = function () {
    console.log(4);
};

// 声明一个叫getName函数            这个函数被提升了     
function getName() {
    console.log(5);
}

Foo.getName();              // 2 访问Foo函数上存储的静态属性
getName();                  // 4 直接调用那么就是访问当前上文作用域内的叫getName的函数
/**
 * 一个是变量作用域问题，一个是this指向问题。
 * Foo():先执行了Foo函数，然后调用Foo函数的返回值对象的getName属性函数。此处实际上是将外层作用域内的getName函数修改了。此处的直接调用方式，this指向window对象。
 * .getName():相当于 window.getName()
 */
Foo().getName();            // 1
// 直接调用getName函数，相当于 window.getName()
getName();                  // 1
/**
 * js的运算符优先级问题
 * 参考链接：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
 */
new Foo.getName();          // 2 点（.）的优先级高于new操作。 实际执行为:new (Foo.getName)();
/**
 * 构造函数的返回值
 * 返回的是this，而this在构造函数中本来就代表当前实例化对象，遂最终Foo函数返回实例化对象。
 * 之后调用实例化对象的getName函数，因为在Foo构造函数中没有为实例化对象添加任何属性，遂到当前对象的原型对象（prototype）中寻找getName，找到了。
 */
new Foo().getName();        // 3 new 优先级高于 函数调用。 实际执行为:(new Foo()).getName()
new new Foo().getName();    // 3 最终实际执行为:new ((new Foo()).getName)();
Foo().getAge;               // undefined 局部作用域