import React,{useState} from 'react'
import {Form ,Container, Button, Alert, Row, Col} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css"
import {FaPlus, FaTrash} from "react-icons/fa"
const TodoList = () => {

    const initialData = JSON.parse(localStorage.getItem("todos"));
    const[addTodo,setAddTodo] = useState([...initialData]) ;//yo chai todo add garna ko lagi use gareko state
    const[text,setText] = useState("");//yo chai todoma use garney data add garna ko lagi use gareko state

    const addTask=()=>{
        const newTodo=[
            ...addTodo,//yo chai previous add gareko task lai pani display garna ko lagi ho
            {data:text,
            date:new Date().toLocaleString().split(",")[0],
             iscompleted:false}];

            setText("");
            setAddTodo(newTodo);
            localStorage.setItem("todos",JSON.stringify(newTodo)) // esle chai array ma vayeko data lai string ma convert garcha
    }

    const todoCompletionOnToggle=(idx)=>{

      const newTodo =  addTodo.map((todo,index)=>{
            if(index===idx) return {...todo, iscompleted:!todo.iscompleted} //...todo le chai previous entered gareko data lai pani dekhahucha
            else return todo;
        })
        setAddTodo(newTodo);
        localStorage.setItem("todos",JSON.stringify(newTodo));
    }

    const deleteTodo=(idx)=>{
       const response = window.confirm("Do you want to delete this Todo?");
       if(response){
        const newTodo = addTodo.filter((_,index)=>{
            return index === idx ? false
            : true;  //edi vayeko data ko index ra hamilai chainey index same vayo vaney filter garcha
        })
        setAddTodo(newTodo);
        localStorage.setItem('todos',JSON.stringify(newTodo));
       }
   
    }
  return (
    <Container className='mt-4 text-center' >
        <h2 className='text-success text-uppercase'>Todo List</h2>
        <Form.Control type="text" value={text} onChange={(e)=>setText(e.target.value)}
        onKeyPress={(e)=>(e.key=== "Enter"?addTask():null)}
        />
    <br/>
        <Button variant="info" onClick={addTask}>
        {""}
        <FaPlus/>
           <label className='ms-3'>Add</label> 
        </Button>
        <br/>
        <br/>
        {addTodo.length>0?addTodo.map((todo,index)=>{
            return(
                
            <Row >
                <Col xs={10}>
                 <Alert 
            variant={todo.iscompleted ? "danger" : "success"}
            style={{
                cursor:"pointer",
                textDecoration:todo.iscompleted? "line-through":"none",}}
            className='text-start'
             onClick={()=>todoCompletionOnToggle(index)}><b>{todo.data}</b><br/>
            <small>{todo.date}</small><br/>
            {todo.iscompleted}
           
            </Alert>
            </Col>
                    {/*  es pachi chai delete btn ko lagi*/}
            <Col className='mt-3'>
                <FaTrash 
                style={{cursor:"pointer"}}
                size="40" color="red" onClick={()=>deleteTodo(index)}/>
            </Col>
            </Row>
          
            )
        }): "no data for todos"}
    </Container>
  )
}

export default TodoList