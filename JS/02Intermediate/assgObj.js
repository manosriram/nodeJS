let lco = {
    author:'Hitesh Choudhary',
    price:799,
    name:'NODEJS',
    desc:'Node.JS Course Bootcamp!!'
}

let changePrice = function(obj1) {
    console.log(`Price of Course = ${obj1.price}`);
    
}

// console.log(`Hey,There is a new Course named ${lco.name} at a price of ${lco.price} by ${lco.author} with a description : ${lco.desc}`);

changePrice(lco);
