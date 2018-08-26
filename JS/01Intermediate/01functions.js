let newFunc = function(param1) {
    console.log("Hello There!!");
    console.log("Hello " + param1 + " Whats Up??");   
}

let mixName = function(fName,lName) {
    console.log(`Happy to have you ${fName} ${lName} !`);
    
}

let adder = function(num1,num2=90) {
    let num3;
    num3 = num1 + num2;
    return num3;
}

//newFunc("Mano");
//mixName("Mano","Sriram");
console.log(adder(10));




