import logo from './logo.svg';
import './App.css';
import {Analytics,Auth,API} from 'aws-amplify';
import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries';
import {withAuthenticator, AmplifySignOut} from '@aws-amplify/ui-react';
import {useEffect,useState} from 'react';


function App() {
  const [username,setUsername]=useState('');
  const [todo,setTodo]=useState('');
  const [listTodo,setListTodo]=useState([]);
  const [postedTodo,setPostedTodo]=useState('');

  useEffect(()=>{
    async function getAllTodos(){
      const allTodos=await API.graphql({query:queries.listTodos});
      setListTodo(allTodos.data.listTodos.items);
    }


    Analytics.record('Home Page Visit')
    Analytics.record({
      name:"User SignIn",
      attributes:{
        username:"Wonder"
      }
    })

    Auth.currentAuthenticatedUser().then(user=>{
      setUsername(user.username);
    })

    getAllTodos();
  }, [postedTodo])


  const handleFormSubmit= async (e)=>{
    e.preventDefault(); 

    const todoDetails={
      name:username,
      description: todo
    }

    const newTodo=await API.graphql({query:mutations.createTodo, variables:{input:todoDetails}})
    setPostedTodo(newTodo);
    clearForm();


    function clearForm(){ 
      document.getElementById("create-form").reset();
    }

  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello {username}</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload. With Wonder!!
        </p>
        <AmplifySignOut/>

        <form onSubmit={handleFormSubmit} id="create-form">
          <input type="text" name="todo" onChange={e=>setTodo(e.target.value)}/>
          <button type="submit">Submit</button>
          
        </form>
        <p>Todo: {todo}</p>

        {listTodo && listTodo.map(item=>
          <li key={item.id}>
            {item.description}
          </li>
          )}
      </header>
    </div>
  );
}


export default withAuthenticator(App);
