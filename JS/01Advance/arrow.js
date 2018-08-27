let assignmentObject = [{
    title:'Buy Bread!',
    isDone:true,
}, {
    title:'Code',
    isDone:true,
}, {
    title:'Competitive Programming',
    isDone:false,
}, {
    title:'Algorithms',
    isDone:false,
}, {
    title:'Code Hackathon',
    isDone:false,
}, {
    title:'Data Structures',
    isDone:true,
}]

let cnt=0;

let notDone = assignmentObject.filter((todo) => {

if (todo.isDone===false) {
cnt++;
return console.log(`Title ${cnt} : ${todo.title}.`);
}
})

console.log(notDone);