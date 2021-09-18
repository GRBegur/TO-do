const todoList = JSON.parse(sessionStorage.getItem("todoList"));

const folderArea = document.getElementById("list");
const nofolderArea = document.getElementById("noFolderArea");
const createNewButton = document.getElementById("createNew");

createNewButton.addEventListener("click",()=>{
    location.href = "index.html";
});

if (size(todoList)){
    for(let element in todoList){
        appendTOFolder(element,"custom-card");
    }
}else{
    appendTOFolder("No saved TO-do lists","row mt-4 no-folders");
}

function appendTOFolder(text,customClass){
    const div = document.createElement("div");
    const p = document.createElement("p");

    div.setAttribute("class",customClass);
    p.innerHTML = text;

    div.appendChild(p);

    if(customClass==="custom-card"){
        folderArea.appendChild(div);
        div.setAttribute("onclick","renderList(this)");
    }else{
        nofolderArea.appendChild(div);
    }
}

// .......................................................
    // <div class="customClass">
    //     <p>text</p>
    // </div>
// .............................................................

function renderList(event){
    const fileName = event.firstElementChild.innerHTML;
    const todoList = JSON.parse(sessionStorage.getItem("todoList"))[fileName];
    sessionStorage.setItem("currentList",JSON.stringify(todoList));
    sessionStorage.setItem("fileName",JSON.stringify(fileName));
    location.href = "index.html"
}


function size(todoList){
    let size = 0;
    for(let i in todoList){
        size++;
        if (size>0){
            return true;
        }
    }
    return false; 
}