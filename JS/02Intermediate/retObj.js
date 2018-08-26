let youTubeVideo = {
    length:15,
    creator:'Mano',
    channel:'Mano Sriram',
}

let changeVideoLength = function(obj1) {
    return {
        ret1: obj1.length+3,
        ret2: obj1.length-3,
        cool:`Too Cool Right??`,
    }
}

let getRet = changeVideoLength(youTubeVideo);
console.log('\n');
console.log(`Video Length Inititally is : ${youTubeVideo.length}.\n`);
console.log(`Video Length is then Increased to ${getRet.ret1}.\n`);
console.log(`Video Length is then Decreased to ${getRet.ret2}.\n`);
console.log(getRet.cool);console.log('\n');







