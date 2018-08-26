// && - AND Operator
// || - OR Operator

let verified = false;
let loggedIn  = true;
let hasPayment = true;
let isGuest = false;

if (verified && hasPayment && loggedIn) {
    console.log("Has Access to his Courses...");
} else if (verified || isGuest) {
    console.log("Allow Free Previews...");
} else {
    console.log("Please Verify Your Email..");
}
