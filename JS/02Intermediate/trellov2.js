let myTodos = {
    meetings:0,
    meetDone:0,
    day:'Monday',
}

let addMeeting = function(todo, meet=0) {
    todo.meetings += meet;
}

let meetDone = function(todo, meet=0) {
    todo.meetDone -= meet;
}

let resetDay = function(todo) {
    todo.meetings = 0;
    todo.meetDone = 0;    
}

let getSummaryOfDay = function(todo) {
    todo.meetings += todo.meetDone;
    console.log(`You have ${todo.meetings} meetings today!`);
}

addMeeting(myTodos,6);
addMeeting(myTodos,10);
meetDone(myTodos,1);

console.log(getSummaryOfDay(myTodos));
console.log(myTodos);


