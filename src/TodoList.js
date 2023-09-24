//type in RFC with the es7+ extenstion and it gives you the code for creating a function components as the name of the file
import React from 'react'
import Todo from './Todo'

//react manages states inside of your application, and when that state changes it re-renders things for us
//want to store all of our Todos in a state so everytime we change a todo, add a todo, delete a todo, it'll re-render our entire component tree
export default function TodoList({ todos, toggleTodo }) {
  return (
        /* we want to map over our array and print a list of our current todos, we do this by creating a Todo component (Todo.js) */
        todos.map(todo => {
            return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
        })
  )
}
