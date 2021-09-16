

const input = document.getElementById("input");
const addButton = document.getElementById("input-btn1");
const list = document.getElementById("list-append-area");
const deleteButton = document.getElementById("input-btn2");

input.addEventListener("keyup", readInput);
addButton.addEventListener("click",readInput);
deleteButton.addEventListener("mouseup",clearSelectedElements);


function clearSelectedElements(){
    const selectedElements = document.querySelectorAll(".strike-through");
    selectedElements.forEach((element)=>{
        remove(element.parentElement);
    });
}


function readInput(event){

    if (event.type=="click" && input.value !== ""){
        appendElement(input.value);
        input.value = "";
    }
    if(event.type=="keyup" && input.value !== "" && event.keyCode===13){
        appendElement(input.value);
        input.value = "";
    }
}   


function appendElement(string){
    const divP = document.createElement("div");
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");

    divP.setAttribute("class","row pb-3 justify-row");
    divP.setAttribute("draggable","true")
    div1.setAttribute("class","col-sm-2 input-button-col")
    div2.setAttribute("class","col-sm-8 input-colP")
    div3.setAttribute("class","col-sm-2 input-button-col")
    
    divP.appendChild(div1)
    divP.appendChild(div2)
    divP.appendChild(div3)

    const buttonT = document.createElement("button");
    const buttonC = document.createElement("button");
    const para = document.createElement("p");

    buttonT.setAttribute("class","input-btnt")
    buttonC.setAttribute("class","input-btnc")
    
    const img1 = document.createElement("img");
    const img2 = document.createElement("img");

    img1.setAttribute("src","images/tick.png");
    img1.setAttribute("class","input-button-img");
    img1.setAttribute("draggable","false")
    
    img2.setAttribute("src","images/close.png");
    img2.setAttribute("class","input-button-img");
    img2.setAttribute("draggable","false")

    buttonT.appendChild(img1);
    buttonC.appendChild(img2);

    div1.appendChild(buttonT);
    div3.appendChild(buttonC);
   
    para.setAttribute("class","todo-text");
    para.innerHTML = string;
    div2.appendChild(para);  

    list.appendChild(divP);
    buttonT.setAttribute("onClick","strike(this)");
    buttonC.setAttribute("onClick","remove(this.parentElement.parentElement)");
    divP.addEventListener("dragstart",dragFunction);
}

function strike(event){
    event.parentElement.nextElementSibling.classList.toggle("strike-through");
}

function remove(event){
    event.classList.add("remove-element-transition");
    event.addEventListener("transitionend",function (eventi){
        eventi.target.classList.add("remove-element");
    });
}

        // <div class="row pt-5 justify-row" draggable="true">
        //     <div class="col-sm-2 input-button-col">
        //         <button class="input-btnt"><img src="images/tick.png" class="input-button-img"></button>
        //     </div>
        //     <div class="col-sm-8" id="input-col">
        //         <p class="todo-text">Lorem ipsum dolor sit amet.</p> 
        //     </div>
        //     <div class="col-sm-2 input-button-col">
        //         <button class="input-btnc"><img src="images/close.png" class="input-button-img"></button>
        //     </div>
        // </div>


function dragFunction(event){
    
    event.target.classList.add("dragging");

    event.target.addEventListener("dragend",()=>{
        event.target.classList.remove("dragging");
    })
}


list.addEventListener("dragover",(eventi)=>{
    eventi.preventDefault();
    const position = getPosition(eventi.clientY)
    //console.log(position);
    const dragging = document.querySelector(".dragging");
    if(position === null){
        list.insertBefore(dragging,list.firstElementChild);
    }else{
        list.insertBefore(dragging,position.nextElementSibling);
    }
});

function getPosition(yOffset){
    const listItems = [...list.querySelectorAll('[draggable="true"]:not(.dragging,.remove-element)')];
    //console.log(listItems)
    return listItems.reduce((closest,child)=>{
        const box = child.getBoundingClientRect();
        const offset = yOffset - box.top - (box.height/2);
        //console.log(offset,yOffset,box.top,box.height);
        if(offset>0 && closest.offset>0 && offset<closest.offset){
            return {offset: offset, element: child};
        }else if(offset>0 && offset>closest.offset){
            return {offset: offset, element: child};
        }else{
            return closest;
        }
    }, {offset: Number.NEGATIVE_INFINITY, element: null}).element;
}
