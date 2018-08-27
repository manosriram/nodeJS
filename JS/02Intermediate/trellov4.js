let myTodo = [{
    title:'Buy Bread',
    isDone:false,
},{
    title:'Code 8 Hours',
    isDone:true,
},{
    title:'Practice Competitive Programming',
    isDone:false,
}]

const findTodo = function(todo, title) {
    const index = todo.findIndex(function(todo1, index) {
        return todo1.title.toLowerCase() === title.toLowerCase();
    })
    console.log('\n');
    
    if (index >= 0)
    console.log(`Yes the Item "${todo[index].title.toLowerCase()}" is present at Index ${index}.`);

    else
    console.log("Element Not Found..");
    
    console.log('\n');
    
}

findTodo(myTodo, 'practice competitive programming');
