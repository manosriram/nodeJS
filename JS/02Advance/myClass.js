class Student {
    constructor(firstName,middleName,lastName,credit) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.credit = credit;
    }
    
    getFullName() {
        return (this.firstName + this.middleName + this.lastName);   
    }

    editName(newName) {
        const myName = newName.split(' ');
        //  console.log(myName);
        this.firstName = myName[0];
        this.middleName = '';
        this.lastName = myName[1];
        //  return (this.firstName + this.lastName);
    }

    middleNameEdit(newName1) {
        const newMid = newName1.split(' ');
        this.firstName = newMid[0];
        this.middleName = newMid[1];
        this.lastName = newMid[2];
    }
}

class anotherStudent extends Student {
    constructor(firstName,middleName,lastName,credit) {
        super(firstName,middleName,lastName,credit);
        console.log("Child Class Consructor has been Called!!");
    }

    favTech(name) {
        console.log(`Fav. Tech Person is ${name}`);
    }
}

const student1 = new anotherStudent('Arivazhagan','Mano','Sriram',99);

//  let fullName = student1.firstName + student1.lastName;
/*
console.log(`Full Name of the Student is ${student1.getFullName()}`);
student1.editName('Steve Jobs');
console.log(`New Name of the Student is ${student1.getFullName()}`);
student1.middleNameEdit('Steven Paul Jobs');
console.log(`New Name of the Student is ${student1.getFullName()}`);
*/

student1.favTech('Steve Jobs');





