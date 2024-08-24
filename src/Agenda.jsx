import React, { useState } from 'react';

function Agenda(){
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState([]);

  function input(event){
    setNewTask(event.target.value);
  }

  function add(){
    if(newTask.trim() != ""){
      setTasks(t=>[...t, { text: newTask, checked: false }]);
      setNewTask("");
    }
  }

  function remove(i){
    const updatedTasks = tasks.filter((element, j) => j != i);
    setTasks(updatedTasks);
  }

  function up(i){
    if (i > 0){
      const updatedTasks = [...tasks];
      [updatedTasks[i], updatedTasks[i - 1]] = [updatedTasks[i - 1], updatedTasks[i]];
      setTasks(updatedTasks);
    }
  }

  function down(i){
    if (i < tasks.length - 1){
      const updatedTasks = [...tasks];
      [updatedTasks[i], updatedTasks[i + 1]] = [updatedTasks[i + 1], updatedTasks[i]];
      setTasks(updatedTasks);
    }
  }

  function done(i){
    const updatedTasks = [...tasks]; 
    updatedTasks[i].checked = !updatedTasks[i].checked;
    setTasks(updatedTasks);
  }

  function favorite(event){
    const updatedTasks = [...tasks]; 
    const li = event.target.parentNode;
    li.classList.toggle("top");
    setTasks(updatedTasks);
  }

  return(
    <>
      <div className="agenda">
        <h1>Agendots 📅</h1>
        <hr></hr>
        <div>
          <input type="text" placeholder="Evento" value={newTask} onChange={input}/>
          <button className="add" onClick={add}>➕</button>
        </div>
        <ol>
          {tasks.map((task, i) => (<li className={task.checked ? "checked" : "list"} key={i}>
            <span className="text">{task.text}</span>
            <button className="done" onClick={()=>done(i)}>✅</button>
            <button className="del" onClick={()=>remove(i)}>⛔</button>
            <button className="updown" onClick={()=>up(i)}>🔼</button>
            <button className="updown" onClick={()=>down(i)}>🔽</button>
            <button className="top" onClick={(event)=>favorite(event)}>⭐</button>
          </li>))}
        </ol>
      </div>
    </>
  );
}

export default Agenda