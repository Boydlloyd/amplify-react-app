import logo from './logo.svg';
import './App.css';
import {Analytics} from 'aws-amplify';
import {useEffect} from 'react';


function App() {

  useEffect(()=>{
    Analytics.record('Home Page Visit')
    Analytics.record({
      name:"User SignIn",
      attributes:{
        username:"Wonder"
      }
    })
  }, [])



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. With Wonder!!
        </p>
      </header>
    </div>
  );
}

export default App;
