// //console.log(document.title);

// console.log(document.querySelectorAll('#idOne'));

//const myElement = document.querySelectorAll('.testClass')
// console.log(myElement);

const myElements = document.querySelectorAll('p');

myElements.forEach((p) => {
    p.textContent = 'I am Changed Using Arrow Function in the For each..'
})


const createEle = document.createElement('p');
createEle.textContent = 'I was added using js!!';

document.querySelector('body').appendChild(createEle);
