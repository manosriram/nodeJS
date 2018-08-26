let globalMe = "A value...";

if (true) {
    var localMe = "added Value...";
    globalMe = "superman!";
    console.log(localMe);
    console.log(globalMe);
}

console.log(localMe);
console.log(globalMe);

