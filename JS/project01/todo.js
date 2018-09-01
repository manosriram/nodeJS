let adder = document.getElementById('add');
adder.addEventListener('click',addItem);

let remover = document.getElementById('remove');
remover.addEventListener('click', removeItem);

let removeEverything = document.getElementById('removeAll');
removeEverything.addEventListener('click', removeAll);

let ul = document.getElementById('list');
var li;

function addItem() {
    var getD1 = document.getElementById('moveAwe1');
    var getD = getD1.value;

    if (getD === '')
    return false;

    else {

    let listE = document.createElement('li');
    ul.appendChild(listE);
    let listE1 = document.createElement('input');
    listE1.type = 'checkbox';
    listE1.setAttribute('id', 'checked')
    listE1.id = 'checked';
    let lab = document.createElement('label');
    lab.textContent = getD;
    listE.appendChild(listE1);
    listE.appendChild(lab);
    ul.insertBefore(li,ul.childNodes[0]);
    
    }
}




function removeItem() {
li = ul.children;

for (let index = 0; index < li.length; index++) {
    while (li[index] && li[index].children[0].checked) {
        ul.removeChild(li[index]);
    }
}
}

function removeAll() {
    li = ul.children;
    let count=0;
    while (li[count] && li[count].children[0] && count < li.length) {
        ul.removeChild(li[count]);
        count++;
    }
}