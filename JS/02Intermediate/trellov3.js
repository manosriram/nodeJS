// let object1 = {
//     number: 20,
//     incNum: function() {
//         this.number+=1;
//         console.log(`number is now ${this.number}.`);
//     }
// }

// object1.incNum();

let myTodos = {
    meetings:0,
    meetdone:0,
    day:'Monday',
    
    
    addMeetings: function(meet) {
        this.meetings += meet;
    },

    resetDay: function() {
        this.meetdone = 0;
        this.meetings = 0;
    },

    meetdone1: function(meet) {
        this.meetdone -= meet;
    },

    getSummary: function() {
        this.meetings = this.meetings + this.meetdone;
        return `You have ${this.meetings} Meetings!!`;
    },
}

myTodos.addMeetings(4);
myTodos.addMeetings(5);
myTodos.meetdone1(4);
console.log(myTodos.getSummary());
myTodos.resetDay();
console.log(myTodos.getSummary());




