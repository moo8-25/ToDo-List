
tasks = []
function gettask() {
    retasks = JSON.parse(localStorage.getItem("tasks"))
    if (retasks == null) {
        tasks = []
    } else {
        tasks = retasks
    }
}


gettask()
var table = document.getElementById("tasks")
var add = document.getElementById("add")

table.innerHTML = ""
var index = 0
for (task of tasks) {
    var content = `
<div class="task ${task.isCompleted ? 'done' : ''}">
<div class="info">
    <h1>${task.title}</h1>
    <span class="material-symbols-outlined">
        calendar_month
    </span>
    <span> ${task.date}</span>
</div>
<div class="icons">
    <button onclick="deleteTask(${index})" class="circ"><span class="material-symbols-outlined">
        delete
    </span></button>
    ${task.isCompleted ? `<button  onclick=" check(${index})" class="circ" style="background-color: rgb(118 , 0 , 101)"><span class="material-symbols-outlined">
        cancel
    </span></button>` : `<button onclick="check(${index})" class="circ"><span class="material-symbols-outlined">
        check
    </span></button>`}
    <button  onclick=" Update(${index})" class="circ"><span class="material-symbols-outlined">
        edit
    </span></button>
    
</div>
</div>
`
    table.innerHTML += content
    index++
}
add.addEventListener("click", function () {

    var name = prompt("أدخل اسم المهمة")
    if (name) {
        var now = new Date();
        var day = `${now.getDate()} / ${(now.getMonth() + 1)} / ${now.getFullYear()}`;
        let obj = {
            "title": name,
            "date": day,
            "isCompleted": false
        }
        tasks.push(obj)
        setData()
        fill()
    }
})



function check(index) {
    tasks[index].isCompleted = !tasks[index].isCompleted
    setData()
    fill()
}


function Update(index) {
    var newName = prompt("أدخل الاسم الجديد ", `${tasks[index].title}`)
    if (newName) {
        var name = tasks[index]
        name.title = newName;
        setData()
        fill()
    }
}


function deleteTask(index) {
    var tName = tasks[index];
    var msg = confirm(` هل انت متأكد من حذف مهمة : ${tName.title}؟`)
    if (msg) {
        tasks.splice(index, 1)
        setData()
        fill()
    }
}


function fill() {
    table.innerHTML = ""
    var index = 0
    for (task of tasks) {
        var content = `
<div class="task ${task.isCompleted ? 'done' : ''}">
    <div class="info">
        <h1>${task.title}</h1>
        <span class="material-symbols-outlined">
            calendar_month
        </span>
        <span> ${task.date}</span>
    </div>
    <div class="icons">
        <button onclick="deleteTask(${index})" class="circ"><span class="material-symbols-outlined">
            delete
        </span></button>
        ${task.isCompleted ? `<button  onclick=" check(${index})" class="circ" style="background-color: rgb(118 , 0 , 101)"><span class="material-symbols-outlined">
            cancel
        </span></button>` : `<button onclick="check(${index})" class="circ"><span class="material-symbols-outlined">
            check
        </span></button>`}
        <button  onclick=" Update(${index})" class="circ"><span class="material-symbols-outlined">
            edit
        </span></button>
        
    </div>
</div>
`
        table.innerHTML += content
        index++
    }
}


function setData() {
    let tasksstring = JSON.stringify(tasks)
    localStorage.setItem("tasks", tasksstring)
}

function playSound() {
    const audio = new Audio("/videoplayback.m4a");
    audio.play();
}