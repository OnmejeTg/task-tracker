import AddTask from './components/AddTask';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Head from './components/Head'
import Tasks from './components/Tasks'
import About from './components/About';

import { useState, useEffect } from 'react';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTask = async () => {
      const dataFromServer = await fetchTasks()
      setTasks(dataFromServer)
    }
    getTask()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE"
    })
    setTasks(tasks.filter((task) => (task.id !== id)))
  }

  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 100) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  const handleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updTask)
    })
    const data = await res.json()


    setTasks(tasks.map((task) => (task.id === id ? { ...task, reminder: data.reminder } : task)))
  }
  return (
    <Router>
      <div className='container'>
        <Head onShowAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />

        <Routes>
          <Route path='/' exact Component={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} reminder={handleReminder} /> : 'No tasks to show'}
            </>
          )} />
          <Route path='/about' Component={About} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
