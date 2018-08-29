let mano = {
    name:'I am Arivazhagan Mano Sriram',
    age:18,
    isActive:false
}

let ammu = {
    name:'I am Ammu!!',
    age:24,
    isActive:true
}

let guru = {
    name:'I am Gururaj!',
    age:26,
    isActive:true
}

let users = new Map();

users.set('mano',mano);
users.set('ammu',ammu);
users.set('guru',guru);

// for (const t of users.values()) {
//     console.log(t.age);
// }

// for (const [key,value] of users.entries()) {
//     console.log(`Key : ${key}\nName-Value : ${value.name}`);
//     console.log(`Active : ${value.isActive}`);
//     console.log('\n');
// }


let arrOfArr = [['one',1],['two',2],['three',3]];

let newMap = new Map(arrOfArr);

for (const [key,value] of newMap.entries()) {
    console.log(`${key} -> ${value}`);
    
}