// let a = ['first','second','third','fourth','fifth'];

// a.forEach(function(res,ind,donno) {
//     console.log(`Element ${ind+1} - ${res}`);
//     console.log(`${donno}`);
    
// })


const toDo = [];

toDo.unshift("Buy Bread.");
toDo.unshift("Complete 10 Lessons of JS");
toDo.unshift("Keep Trying...");
toDo.unshift("Word Hard.");

for (let t=0;t<toDo.length;t++) {
    console.log("Your Task No " + (t+1) + " is : " + toDo[t]);
}


