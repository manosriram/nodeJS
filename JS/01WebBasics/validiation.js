// function getValue() {
//     let val = document.getElementById('formOne').value;

//     if (!isNaN() || val > 1 && val <20)
//     console.log(`Value Submitted is ${val}`);

//     else
//     console.log('Not a Valid Input..');
   
// }

function changeP() {
    let val1 = document.getElementById('idOne');
    let val2 = document.getElementById('formOne');
    val1.textContent = val2.value;
    val2.value = null;
    
    // val1.textContent = 'This paragraph has been changed Onclick!!';   
}

function check() {
    let p1 = document.getElementById('pass1');
    let p2 = document.getElementById('pass2');

    if (p1.value == p2.value)
    console.log("Passwords Match...Access Granted..");

    else
    console.log("Passwords Dont Match..Please Try Again...");
    
}