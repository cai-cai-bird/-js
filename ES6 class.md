# Class

## es5语法糖

```
let Person = class Me{
    
    constructor (name,age){ //构造方法
      this.name = name; //this为实力实例对象
      this.age = age;
    }
    toString(){
      return this.name + "---" + this.age
    }
    getClassName(){
      return Me.name
    }
}


let s = new Person("菜菜",20)

console.log(s.name) //菜菜
console.log(s.toString())
console.log(s.__proto__ == Person.prototype) //true
console.log(s.__proto__.constructor == Person.prototype.constructor) //true
console.log(s.hasOwnProperty("name")) //true
console.log(s.hasOwnProperty("age")) //true
console.log(s.hasOwnProperty("toString")) //false
console.log(Object.keys(s)) //["name","age"]
console.log(Object.values(s)) //["菜菜",20]

let p = new Person("教师",30);

console.log(p.__proto__ == s.__proto__) //true

console.log(Person.name) //Me name属性总是返回紧跟在class关键字后面的类名。
console.log(p.getClassName()) // Me
console.log(Person.length) //2

```
## 私有方法 - 只限类的内部使用

1.定义私有方法用_表示,这样可以约定这是一个只限于内部使用的私有方法。但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法

```
class Person{
  constructor (name,age){
    this.name = name;
    this.age = age;
  }
  getKeys(obj){
    return Object.keys(obj)
  }
  _getName(){
    return this.name
  }
}

let p = new Person("菜菜",26)
console.log(p.getKeys(p)) //["name","age"]
// 这样还是可以访问到私有方法
console.log(p._getName()) //菜菜
```

2.将私有方法移出模块，因为模块内部的所有方法都是对外可见的

```
class Person{
  constructor(name,age){
    this.name = name;
    this.age = age;
  }
  foo(baz){
    return getName.call(this,baz)
  }
}

function getName(baz){
  this.name = baz
  return this.name
}

let p = new Person("菜菜",26)
console.log(p.foo("菜菜111")) //菜菜111
console.log(p) //Person {name: "菜菜111", age: 26}
```
foo是公有方法，内部调用了getName.call(this, baz)。这使得getName实际上成为了当前模块的私有方法

3.使用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值

```
let bar = Symbol("bar")
class Person{
  constructor(name,age){
    this.name = name;
    this.age = age;
  }
  [bar](name){
    return this.name = name
  }
  foo(name){
    this[bar](name)
    return this
  }
}


let p = new Person("菜菜",26)
console.log(p.foo("aa"))
```
## class 继承

大多数浏览器的ES5实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。Class作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。

（1）子类的__proto__属性，表示构造函数的继承，总是指向父类。

（2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。

```
class Person{
  constructor(name,age){
    this.name = name;
    this.age = age;
  }
  getName(){
    return this.name
  }
}
/*
ES5的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。
*/
class Teacher extends Person{
  constructor(name,age,sex){
    super(...arguments); // 调用父类的constructor(name, age)
    this.sex = sex
  }
}

let t = new Teacher("菜菜",25,"男")

console.log(JSON.stringify(t))//{"name":"菜菜","age":25,"sex":"男"}
console.log(t.getName()) //菜菜
console.log(t.__proto__.constructor === Teacher)//true
console.log(Teacher.prototype.constructor === Teacher) //true
console.log(Teacher.__proto__ === Person) //true
console.log(Person.prototype.__proto__ === Object.prototype) //true
console.log(Teacher.prototype.__proto__ === Person.prototype) //true
```
## 继承的目标

```
class A extends Object {
}

A.__proto__ === Object // true
A.prototype.__proto__ === Object.prototype // true




class A {
}

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true




class A extends null {
}

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === undefined // true
```

### Object.getPrototypeOf(子类的名字) === 父类的名字 方法可以用来从子类上获取父类。

```
Object.getPrototypeOf(Teacher) === Person
```

## static 静态方法

es6:
在原型方法前直接加static 
静态方法只能被类本身访问到 
在类内部只有静态方法 
在class内部没有静态属性
Person.age = 12 给类直接添加属性 静态属性

myProp = 42; 在类内部直接写等式 为实例属性
es7:
静态属性 
static myStaticProp = 42; 在内部可以这么定义静态属性


```
class Foo {
  constructor(){
    console.log(new.target === Foo) //new是从构造函数生成实例的命令  new.target属性，（在构造函数中）返回new命令作用于的那个构造函数
  }
  static classMethod() {
    return 'hello';
  }
  age:1
}

class Bar extends Foo {
}

console.log(Bar.classMethod()) //hello
console.log(Foo.age) //undefined
```

## 实例属性和静态属性和静态方法访问权限

```
class Foo {
  sex = "男" //实例属性
  constructor(){
    console.log(new.target) //Foo
  }
  static classMethod() { //静态方法
    return 'hello';
  }
  static age = 25 //静态属性
}

Foo.sex = "女" //静态属性

class Bar extends Foo {
  constructor(){
    super() 
    console.log(new.target) //Bar
  }
}

let f = new Foo()

console.log(Foo.classMethod()) //hello
console.log(Foo.age) //25
console.log(Foo.sex) //女
console.log("----------------------------")

//console.log(f.classMethod()) //实例没有静态方法
console.log(f.age) //undefined
console.log(f.sex) //男
console.log("----------------------------")

let b = new Bar()

console.log(Bar.classMethod()) //hello
console.log(Bar.age) //25
console.log(Bar.sex) //女
console.log("----------------------------")

//console.log(b.classMethod()) //hello
console.log(b.age) //undefined 
console.log(b.sex) //男 

/*
总结：
1.静态方法和静态属性只能通过 类名.属性（方法） 进行访问
2.类的实例访问静态方法报错
3.类的实例访问静态属性返回u
*/
```
