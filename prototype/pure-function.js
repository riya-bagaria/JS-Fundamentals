// ------------------------------------------------------------------------------------------------
// ------------------------------------- Not Pure Function  ---------------------------------------
// ------------------------------------------------------------------------------------------------
const obj1 = {
	a: "a",
	b: "b" 
}; 

// Pass by refrence
const notPureFunction = (obj) => {
	//Change obj1 property value
	obj.a ="abc";
	// Assign a new reference to obj. Obj1 is dangling and not accessible
	obj = {c:1};

	return obj;
}

console.log("Not pure function", obj1)  // {a: "abc", b: "b"}
notPureFunction (obj1);   //  {c:1}



// ------------------------------------------------------------------------------------------------
// ------------------------------------- Pure Function  -------------------------------------------
// ------------------------------------------------------------------------------------------------
const obj2 = {
	a: "a",
	b: "b" 
}; 

// Pass by refrence
const pureFunction = (obj) => {
	// Alternate
	// let obj2 = {...obj};
	// let obj2 =Object.assign(obj)
	//Problem - serialisation of function
	let obj2 = JSON.parse(JSON.stringify(obj));
	obj2.a ="abc";
	obj2 = {c:1};

	return obj2;
}

pureFunction (obj2);   //  {c:1}
console.log("Pure function", obj2)  // {a: "a", b: "b"}