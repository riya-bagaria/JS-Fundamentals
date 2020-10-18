// This is a binding when a function is executed. It value depends on the calling site.
// Each function has the "this" binding
// There are four rules of this
//--------------------------------------------------------------------------------
//------------------------ Rule 1 (Default Binding) ------------------------------
//-------------------------------------------------------------------------------- 
// Standalone function call. How to find that default binding gets applied?
// If function is called with un-decorated function reference
function foo1 () {
	console.log(this.a);
}
var a = 1;
foo1(); //1

// If strict mode is added in the function - the global object is not eligible for default binding
//--------------------------------------------------------------------------------
function bar1(){
	"use strict";
	console.log(this.a);
}
var a = 1;
//bar1(); // TypeError: Cannot read property 'a' of undefined

//--------------------------------------------------------------------------------
// Don't get confused here
function baz1() {
	console.log( this.a );  // This works fine, doesn't depend on the called function strict mmode
}

var a = 2;

(function(){
	"use strict";
	//console.log("this", this.a) // This will thrown an error as the function is in strict mode
	baz1(); // 2
})();

//--------------------------------------------------------------------------------
//------------------------ Rule 2 Implicit Binding--------------------------------
//--------------------------------------------------------------------------------
function functionA (){
	console.log(this); // {b:1, functionA:functionA}
}
var obj  = {b:1, functionA:functionA};
obj.functionA(); 

// Only the last object property reference matter
function foo2() {
	console.log( this.a );
}
const obj2 = {
	a: 42,
	foo2: foo2
};
const obj1 = {
	a: 2,
	obj2: obj2
};
obj1.obj2.foo2(); // 42

// Lost implicity binding
function fun1 (){
    console.log(this);
}
const object1 = {a:1, fun1:fun1};
const b = object1.fun1;
b(); // Window object

//--------------------------------------------------------------------------------
//------------------------ Rule 3 Explicit Binding -------------------------------
//--------------------------------------------------------------------------------
// Apply, call, bing
function baz2 () {
    console.log(this);
}
baz2.call({a:1}) //{a: 1}

//--------------------------------------------------------------------------------
//------------------------ Rule 4 new binding ------------------------------------
//--------------------------------------------------------------------------------
function foo3(a) {
	this.a = a;
}

var bar2 = new foo3( 2 );
console.log( bar2.a ); // 2

// precedence order
// Explicit binding - Implicit binding - Default binding
function foo4 () {console.log(this)} 
const object2 = {a:1, b:2, foo:foo4}
object2.foo.call({c:1}) //{c: 1} Explicit binding is more precedent than implicit binding

// New vs implicit
function a (name) {this.a=name}
const obj4 = {a:11, b:12}
const obj5 = {a:15, b:15, newfun : a};
const newobject1 = new obj5.newfun ("riya")
console.log(newobject1);   //{a: "riya"} new binding has more precedent than implict binding
console.log(obj5);         //{a: 15, b: 15, newfun: ƒ}

// New vs explicit binding
//console.log(new obj5.newfun.apply(obj4)); //  obj5.newfun.apply is into a constructor. Same with the call
function randomfunc (value) {this.value=value}
const randomObj = {value: "value"};
const randomvar = randomfunc.bind(randomObj);
randomvar("riya") //{value: "riya"}
const test = new randomvar("bagaria")
console.log(test); //randomfunc {value: "bagaria"}
console.log(randomObj); //{value: "riya"}

//--------------------------------------------------------------------------------
//------------------------ Exception Cases ---------------------------------------
//--------------------------------------------------------------------------------
// If we pass first argument as null or undefined in apply, call and bind
// It will bind to global object
// Why would a person pass null or undefined. May be to seprade array using apply.
// Alternate ...[a,b] spread operator
// Or, currying the function using bind
function foz() {
	console.log( this.a );
}

let a = 2;
foz.call( null ); // 2

//--------------------------------------------------------------------------------
//------------------------ Fat Arow function -------------------------------------
//--------------------------------------------------------------------------------
// Lexical scoping
// Example 1
const fatArrow = () => {console.log(this.a)}
var a = 4;
fatArrow.call({a:"abc"})  // 4

//Example 2
function foo() {
	// return an arrow function
	return (a) => {
		// `this` here is lexically adopted from `foo()`
		console.log( this.a );
	};
}

var obj1 = {
	a: 2
};

var obj2 = {
	a: 3
};

var bar = foo.call( obj1 );
bar.call( obj2 ); // 2, not 3!
console.log(obj2);