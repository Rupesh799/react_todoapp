import React from 'react'
import TodoList from './TodoList'
const App = () => {
  return (
    <>
    <TodoList/>
    </>
  )
}

export default App


///hooks can't be used in loops, condition and also in nested  functions
// hooks should be used in top level in react(app kholida first ma hooks hunu parxa ani functional componenet vitra matra garnas milxa)