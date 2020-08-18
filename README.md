# JS-Fundamentals
- primitive type - passed by value
Boolean, null, undefined, String, and Number
- Object - Passed by reference
Array, Function, and Object

# Pass by value - 
- When we assign these variables to other variables using =, we copy the value to the new variable. 
- Changing one does not change the other

# Pass by reference
- Variables that are assigned a non-primitive value are given a reference to that value. That reference points to the object’s location in memory. The variables don’t actually contain the value.
- arr = [], we’ve created an array in memory. The variable arr receives is the address of the array
- When we re-assign a value to the variable. We are changing the address of the variable. The older address of the variable is dangling. The garbage collector collect this reference and it is no longer accessible
- ===, == both check the reference
- If we want to check if the two object has the same property. Best way is to convert them into string and then compare