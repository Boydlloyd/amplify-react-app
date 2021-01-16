import logo from './logo.svg';
import './App.css';
import {Analytics,Auth,API} from 'aws-amplify';
import * as mutations from './graphql/mutations';
import {withAuthenticator, AmplifySignOut} from '@aws-amplify/ui-react';
import {useEffect,useState} from 'react';




function App() {

  const [username,setUsername]=useState('');
  const [todo,setTodo]=useState('');

  useEffect(()=>{
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
  }, [])


  const handleFormSubmit= async (e)=>{
    e.preventDefault(); 

    const todoDetails={
      name:username,
      description: todo
    }

    const newTodo=await API.graphql({query:mutations.createTodo, variables:{input:todoDetails}})
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello {username}</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload. With Wonder!!
        </p>
        <AmplifySignOut/>

        <form onSubmit={handleFormSubmit}>
          <input type="text" name="todo" onChange={e=>setTodo(e.target.value)}/>
          <button type="submit">Submit</button>
        </form>
        <p>Todo: {todo}</p>
      </header>
    </div>
  );
}


export default withAuthenticator(App);
