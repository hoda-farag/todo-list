let textInput = document.querySelector(".text");
let submit = document.querySelector(".sub");
let entryDiv = document.querySelector(".entry")

let emptyArray=[]; //empty array for entry

getDataFromLocalStorage();
if(localStorage.getItem("taskes")){
    emptyArray=JSON.parse(localStorage.getItem("taskes"));
}
//function to check if the entry empty
submit .onclick =function(){
    if(textInput.value !==""){
        addTaskToArray(textInput.value); //add the new massege to array
        textInput.value=""; //empty teh box after finshed
    };
};
// Click On Task Element
entryDiv.addEventListener("click", (e) => {
    // Delete Button
    if (e.target.classList.contains("del")) {
      // Remove Task From Local Storage
      deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
      // Remove Element From Page
      e.target.parentElement.remove();
    }
    // Task Element
    if (e.target.classList.contains("task")) {
      // Toggle Completed For The Task
      toggleStatusTaskWith(e.target.getAttribute("data-id"));
      // Toggle Done Class
      e.target.classList.toggle("done");
    }
  });
//function take tasks
 function addTaskToArray(taskText){
     const task = {
         id:Date.now(),
         title: taskText,
         completed:false,
     };
     //add new task in array
     emptyArray.push(task);
     addElemntsToPageFrom( emptyArray);
     //Add to local storge
addDataToLocalStorageFrom(emptyArray);
 }
 //creat div for additional taskes
 function addElemntsToPageFrom( emptyArray){
    entryDiv.innerHTML="";
    emptyArray.forEach((task) => {
        let div=document.createElement("div");
        div.className="task";
        //check if task is done
        if(task.completed){
            div.className = "task Done";
        }
        div.setAttribute("data-id",task.id);
        div.appendChild(document.createTextNode(task.title));
        //create span "delete button"
        let span = document.createElement("span");
        span.className="del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        entryDiv.appendChild(div);
    });
 }
 function addDataToLocalStorageFrom(emptyArray){
     window.localStorage.setItem("tasks" , JSON.stringify(emptyArray));
 }
 function getDataFromLocalStorage(){
     let data=window.localStorage.getItem("tasks" );
     if (data){
         let tasks=JSON.parse(data);
         addElemntsToPageFrom(tasks);
     }
 }
 function deleteTaskWith(taskId) {
   
    emptyArray = emptyArray.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(emptyArray);
  }
  
  function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < emptyArray.length; i++) {
      if (emptyArray[i].id == taskId) {
        emptyArray[i].completed == false ? (emptyArray[i].completed = true) : (emptyArray[i].completed = false);
      }
    }
    addDataToLocalStorageFrom(emptyArray);
  }
            