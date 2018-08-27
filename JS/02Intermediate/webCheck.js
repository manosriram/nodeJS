let email = 'mano123sriram';
let password = 'password1234';

let emailCheck = function(aString) {
    if (aString.includes(123) && aString.length > 6) {
        return true;
    }
    return false;
}

let passCheck = function(anotherString) {
    if (anotherString.includes(123) && anotherString.length > 6) {
        return true;
    }
    return false;
}

console.log(emailCheck(email));
console.log(passCheck(password));
