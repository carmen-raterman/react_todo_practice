import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid';


const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  //useState returns an array, so we can destructure it and return an empty array to use
  //todos is all of our todos inside out Todo state and the second element setTodos is a function that allows us to update our todos
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  //BUILD IN SAVING FOR OUR APP
  //this is for storing out Todos
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)

  }, [])

  //this is to get our todos
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  
  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }


  function handleAddTodo(e) {
    const name = todoNameRef.current.value

    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  //returning some HTML here for list, return our list of TODOs
  //we are returning a component inside of the application
  //it is JSX which is reacts version of HTML, allows you to embed components inside other components
  //you can't put two JSX elements inside of here, it can only return one thing so need to wrap it around in a fragment or "<> </>"
  return (
    <>
    {/* this step in line 18 is called props, all of our components have props we can pass to them, pass them like passing attributes to an HTML element.... what is before the equals sign can be ANYTHING but whatever you name it has to be passed into TodoList({ todos }) in the TodoList.js file */}
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}> Add Todo </button>
      <button onClick={handleClearTodos}> Clear Completedd  </button>
      <div> {todos.filter(todo => !todo.complete).length} left to do </div>
    </>

  );
}

export default App;
