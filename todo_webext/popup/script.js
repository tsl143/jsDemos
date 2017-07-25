//variable for holding todos
var todos = [];
var todosHolder = document.getElementById('todosHolder');


//get the time values from browser local storage
var gettingItem = browser.storage.local.get('tslTodos');

// localstorage returns promise
gettingItem.then((res) => {

  try{
    if(res.tslTodos.length > 0){
      res.tslTodos.forEach((entry)=>{
        todos.push(entry);
      });    
    }
  }catch(e){}

  setupTodos();
});

function setupTodos(){

  if(todos.length > 0){
    todos.forEach((entry)=>{
      insertTodo(entry);
    });
    setupBadge(todos.length);
  }
}

function insertTodo(entry){

      let tempChild = document.createElement('div');
      
      if(entry.done !== 0){
        tempChild.className="IAmDone row";
        
      }else{
        tempChild.className="row";
      }

      tempChild.innerHTML = `<div class="removeTodo">&#x1f5d1;</div><div class="checkTodo">&#x2713;</div><div class="toggleTodo">${entry.task}</div>`;
      tempChild.setAttribute('data-isDone',entry.done);
      tempChild.setAttribute('data-id',entry.key);

      todosHolder.appendChild(tempChild);

}

function pushIntoStore(obj){
  let len = todos.length + 1;
  let index = "I"+len;

  obj.key = index;
  todos.push(obj);
  return obj;

}

function toggleTodo(ele){
  let parentNode = ele.parentNode;
  let dataId = parentNode.getAttribute('data-id');
  let dataIsDone = parentNode.getAttribute('data-isDone');

  if(parseInt(dataIsDone, 10)!==0){
    parentNode.className = "row";
    parentNode.setAttribute('data-isDone',0);
  }else{
    parentNode.className = "IAmDone row";
    parentNode.setAttribute('data-isDone',1);
  }
  toggleTodoInMemory(dataId,dataIsDone);
}

function removeTodo(ele){

  let parentNode = ele.parentNode;
  let dataId = parentNode.getAttribute('data-id');
  removeTodoFromMemory(dataId);
  parentNode.remove(dataId);  
}

function removeTodoFromMemory(dataId){
    todos = todos.filter((item) => item.key !== dataId);
    resetMemory();
}

function toggleTodoInMemory(dataId,dataIsDone){

  var mapTodos = todos.map(function(entry) {
    if(entry.key == dataId)
      entry.done = dataIsDone != 1 ? 1:0;
    return entry; 
  });
  resetMemory();
}

function saveToDo() {

  let todoVal = document.getElementsByTagName('textarea')[0].value;

  if(todoVal.trim().length>0){
    obj = pushIntoStore({task:todoVal, done:0});
    insertTodo(obj);
    document.getElementsByTagName('textarea')[0].value = "";

    resetMemory();
  }
}

function resetMemory() {
  browser.storage.local.set({tslTodos:todos});
  setupBadge(todos.length);
}

document.querySelector('body').addEventListener('click', function(event) {
  if (event.target.className === 'removeTodo')
    removeTodo(event.target);

  if (event.target.className === 'toggleTodo')
    toggleTodo(event.target);

  if (event.target.className === 'addTask')
    saveToDo();

});

function setupBadge(count){
  browser.runtime.sendMessage({
    action: 'setBadge',
    data: count
  });  
}

document.querySelector('textarea').addEventListener('keyup',function(event) {
  if(event.keyCode == 13)
    saveToDo();
});
