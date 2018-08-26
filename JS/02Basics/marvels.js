const numbers = ['One','Two','Three','Four','Five'];

// Removing the First Element..
let one = numbers.shift();
// console.log(numbers);

// Inserting an New Element..
numbers.unshift("New Element");
// console.log(numbers);

//Popping The Last Element..
numbers.pop();
//console.log(numbers);

// Pushing an Element at Last..
numbers.push("New Element at Last");
//console.log(numbers);

//Splicing..
numbers.splice(3,2,"Replaced!!");
console.log(numbers);





