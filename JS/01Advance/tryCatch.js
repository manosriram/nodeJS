const convertToRupees = (dlr) => {
    if (typeof dlr === 'number')
    return dlr*64;
    else
    throw Error('Type must be of Integer.');
}

try {
    console.log(convertToRupees('lnflaks'));
} catch (error) {
    console.log(error);
    
}

console.log('I wont run if the program crashes...');
