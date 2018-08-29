let obj = {
    title:'Mano Sriram',
    value:098,
    func() {
        return `This is Mano Sriram and the function func is called and the value is ${this.value}`;
    },
}

console.log(obj.func());
