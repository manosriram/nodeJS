let callSearcher = document.getElementById('searcher');
callSearcher.addEventListener('click', searchTest);

let callAdder = document.getElementById('adder');
callAdder.addEventListener('click', addTest);

function searchTest() {
    let info = document.getElementById('getContent');
    // let unor = document.getElementById('list');
    let flag=0;
    let getE = document.querySelectorAll('li');

    for (let t = 0; t < getE.length; t++) {
        if (info.value == getE[t].textContent) {
            console.log(`Your Searched Element is found and it is present at Place ${t+1}...`);
            flag = 1;
            break;
        }
    }

    if (flag==0)
    console.log(`Your Searched Element is not found...Please ReCheck your query..`);
    
    info.value = null;
}

function addTest() {
    let info = document.getElementById('getContent');
    let unor = document.getElementById('list');

    let listEle = document.createElement('li');
    let head = document.createElement('h3');

    if (info.value != '') {
    listEle.textContent = info.value;
    head.appendChild(listEle);

    unor.appendChild(head);
    info.value = null;
    }
}

