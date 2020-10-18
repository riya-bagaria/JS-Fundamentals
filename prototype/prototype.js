// Source
// https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch5.md
// https://medium.com/@ajmeyghani/interview-questions-1145e3763bce
/**
 * Proptotype is the internal property of the Object which is reference to an another object.
 * The top end of prototype chain is built in Object.Prototype. Where all the propeties desceds like toString etc
 */
const object1 = {a: 1};
// It create prototype link
const object2 = Object.create(object1);
object2.b = 2;  // {b:2, _proto_: {a:1}}
object2.a = "change";
// It creates proptotype link to object2
const object3 = Object.create(object2);
object3.c = 3;

// Chain lookup process
console.log(object1); //{a:1}
console.log(object2); //{b:2, _proto_: {a:1}} 
console.log(object3); //{c:3, _proto_: {b:2, _proto_: {a:1}}}

for (var k in object3) {
	console.log(k, object3[k]);   //c 3 b 2 a change
}

("a" in object3); // true


// ------------------------------------------------------------------------------------------------
// ---------------------------Setting and Shadowing Properties  -----------------------------------
// ------------------------------------------------------------------------------------------------
// Shadow property - If a property is assigned to a object which is not directly present on the object.
// But it is available on the higher prototype chain. The property get added to the object itself.
// Propety will be availbe directly on the object and it prototype which result in shadowing the propety.
// While accessing the propety it never lookup the property to the highter prototype chain as it is available 
// directly on the object, which means it is shadowing the property.

// There are different senarios when the property is not directly available on the object but at hight prototype level

// ------------------------------------------------------------------------------------------------
// ------------------------------------------- Senario 1 ------------------------------------------
// When propety is not directly available on the object and available at higher prototype level 
// and not marked as read only - The property gets added directly to the object
// ------------------------------------------------------------------------------------------------
// enumerable - iteratable
const myObject1 = {a:1};
const myObject2 = Object.create(myObject1);
myObject2.a=3;
console.log("shadowing senario 1");
// To check if a property is readyOnly or not
console.log(Object.getOwnPropertyDescriptor(myObject1, "a")); // {configurable: true, enumerable: true, value: 1, writable: true}
console.log("myobject1", myObject1); // {a:1}
console.log("myobjcet2", myObject2); // {a:3}



// ------------------------------------------------------------------------------------------------
// ------------------------------------------- Senario 2 ------------------------------------------
// When propety is found higher on the [[Prototype]] chain and marked read only. 
// Setting the existing property or shadowning the property dosen't take place.
// In strict mode, it results to an error
// ------------------------------------------------------------------------------------------------

const senario2Object1 = {a:1, b:2};
// Make a property ready only
Object.defineProperty(senario2Object1, "a", {value: "a", writable: false});
console.log(Object.getOwnPropertyDescriptor(senario2Object1, "a")); // {value: "a", writable: false, enumerable: true, configurable: true}
const senario2Object2 = Object.create(senario2Object1);

console.log(senario2Object1.a) //a
senario2Object1.a ="b"; // It doesn't set the property directly to the object or modify at the higher level.
console.log(senario2Object1.a) //a

// ------------------------------------------------------------------------------------------------
// ------------------------------------------- Senario 3 ------------------------------------------
// If a foo is found higher on the [[Prototype]] chain and it's a setter, then the setter will always
// be called. No foo will be added to (aka, shadowed on) myObject, nor will the foo setter be redefined.
// ------------------------------------------------------------------------------------------------
const setterExampleObj1 = {a: 1, set currentA (value) {this.a = value+1}};
setterExampleObj1.currentA = 3;
console.log("setterExampleObj1", setterExampleObj1); // {a:4}
const setterExampleObj2 = Object.create(setterExampleObj1);
setterExampleObj2.currentA = 9;
console.log(setterExampleObj2) // {a: 10}


// ------------------------------------------------------------------------------------------------
// If you want to shadow in Senario 2, it can be done by Object.defineProperty(..)
// It is restricted by = operator for assigning
// ------------------------------------------------------------------------------------------------
const senario2AlternateObject1 = {a:1, b:2};
// Make a property ready only
Object.defineProperty(senario2AlternateObject1, "a", {value: "a", writable: false});
console.log(Object.getOwnPropertyDescriptor(senario2AlternateObject1, "a")); // {value: "a", writable: false, enumerable: true, configurable: true}
const senario2AlternateObject2 = Object.create(senario2AlternateObject1);
Object.defineProperty(senario2AlternateObject2, "a", {value: "value a"});
console.log(senario2AlternateObject2); // {a: "value a"}


// ------------------------------------------------------------------------------------------------
// ----------------------------------- Implict Shadowing ------------------------------------------
// ------------------------------------------------------------------------------------------------
// Be careful
const proto1 = {a:1};
const proto2 = Object.create(proto1);
proto1.hasOwnProperty("a");  //true
proto2.hasOwnProperty("a");  //false
proto2.a++;
console.log("proto1",proto1);
console.log("proto2",proto2);
console.log(proto2.hasOwnProperty("a"));



// Constructor 
function Foo() {}
console.log(Foo.prototype.constructor === Foo); //True
const newObj1 = new Foo();
// It actually prototype linked. Whenever newObj constructor is called if property is not found it delegate to Foo
console.log(newObj1.constructor === Foo) // True, It doesn't mean the constructor is copied from foo.

console.log(Foo.prototype === Object.getPrototypeOf(newObj1)); // Side effect of initiating an object



http://julien.richard-foy.fr/blog/2011/10/30/functional-inheritance-vs-prototypal-inheritance/
103 https://andersonguelphjs.github.io/OReilly_JavaScript_The_Good_Parts_May_2008.pdf







//deferential inheritance
//prototypal inheritace
