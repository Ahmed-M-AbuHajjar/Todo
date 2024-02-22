import React, { useState } from "react";
import AddTodo from "../Add-Todo/Add-Todo";
import TodoList from "../Todo-List/Todo-List";

 
export default function Home() {
  // State to track if the add todo component is open
  const [isAdding, setIsAdding] = useState(false);

  // Function to handle click event for adding todo 
  const handleAddClick = () => {
    setIsAdding(true);
  };
  
  // Function to handle closing the add todo component
  const handleCloseAdd = () => {
    setIsAdding(false);
  };


    return(
        <>
        <div className="fixed bottom-4 right-4">
        <button onClick={handleAddClick} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Add Todo
        </button>
      </div>
          <TodoList/>
          {isAdding && <AddTodo onClose={handleCloseAdd} />}
      
        </>
    )
}

