# How to use utility functions
functions that will be useful in many cases.

## List of constants
- **`EMPTY_ARR`** an empty array, same as  **`[]`**.
- **`EMPTY_OBJ`** an empty object, same as  **`{}`**.
- **`noop`** is a constant of function that's used to perform nothing an object , same as **`() => {}`**.
- **`noot`** an empty fragment, same as  **`<></>`**.



## List of functions
- **`assign(obj,...source)`** assign property to an object with sources property.
- **`define(obj,...source)`** similar to **`assign`** but this function is used to **clone** object before assign sources.
- **`interval(min,max)`** used to generate array with the range from **min** to **max**.
- **`shuffle(array)`** used to shuffle an array.

## List of components
- **`<Json>`** used to **stringify** an object same as **`{JSON.stringify(obj)}`**.
- **`<For each={arr}>`** used to loop through an array.
