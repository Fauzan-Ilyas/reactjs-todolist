import { useEffect, useRef, useState } from 'react'
import './App.css'
import Form from './components/Form.jsx'
import ToDoList from './components/ToDoList.jsx'
import { ST } from 'next/dist/shared/lib/utils.js';

function App() {
  const newTask = useRef('');
  const STORAGE = 'TODOLIST_APP';
  const [taskList, setTaskList] = useState(()=>{
    return JSON.parse(localStorage.getItem(STORAGE)) || [];
  })

  const [taskCompleted, setTaskCompleted] = useState(0)

  useEffect(()=>{
    localStorage.setItem(STORAGE, JSON.stringify(taskList));
    const completed = taskList.filter((item) => item.completed == true)
    setTaskCompleted(completed.length)
  },[taskList])

  function setId() {
    if (taskList == '') {
      return 1;
    } else {
      return taskList[0].id + 1
    }
  }

  function addTask(event) {
    event.preventDefault()
    if (newTask.current.value == '') {
      alert(`isi dulu`);
      return false
    } 
    const data = {
      id: setId(),
      task: newTask.current.value,
      completed: false
    }
    newTask.current.value = ''
    setTaskList([...taskList, data])
    }

    function setCompleted(id) {
      let taskItem = []
      taskList.map((item,index) => {
        if (item.id == id) {
          taskItem[index]={...item, completed: !item.completed}
        } else {
          taskItem[index] = item
        }
      })
      setTaskList(taskItem)
    }

    function move(currentIndex, updateIndex) {
      const currentData = taskList[currentIndex];
      const updateData = taskList[updateIndex];
   
      taskList[currentIndex] = { ...currentData, id: updateData.id };
      taskList[updateIndex] = { ...updateData, id: currentData.id };
   
      const newList = [...taskList];
      setTaskList(newList);
    }

    function remove(id) {
      if(window.confirm('Apakah anda yakin ingin menghapus data ini?')) {
        setTaskList(taskList.filter((item) => item.id !== id))
      }
    }
  
  return (
    <>
      <Form addTask={addTask} newTask={newTask} taskCompleted={taskCompleted} taskList={taskList}/>
      <ToDoList taskList={taskList} setCompleted={setCompleted} move={move} remove={remove}/>
    </>
  )
}

export default App