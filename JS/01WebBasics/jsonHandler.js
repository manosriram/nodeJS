const cricketer = {
    name:'Virat',
    age:28,
    isActive:true,
}

let objToString = JSON.stringify(cricketer);

console.log(typeof objToString);

localStorage.setItem('cricketer',objToString);

