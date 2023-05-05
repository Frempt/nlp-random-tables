import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';

//firebase imports
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInAnonymously  } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC_CyOldAmog2wFRA7PSKfJGVziG6nvMuE",
  authDomain: "nlp-random-tables.firebaseapp.com",
  projectId: "nlp-random-tables",
  storageBucket: "nlp-random-tables.appspot.com",
  messagingSenderId: "16032403680",
  appId: "1:16032403680:web:9fff0dc3a1dbc705004085",
  measurementId: "G-H44VZWP175"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

class Results extends React.Component{
	
	constructor(props)
	{
		super(props);
		
		this.state = {result: ""};
	}
	
	render(){
		return (<div> {this.props.result} </div>);
	}
}

class Contents extends React.Component{

	constructor(props){
		super(props);
		
		this.state = { query:"", result:"" };
	}
	
	async  getResults()
	{
		const auth = getAuth();
		await signInAnonymously(auth);
		
		const objRef = collection(db, "object");
		
		const q = query(objRef, where("type", "==", this.state.query));
		const querySnapshot = await getDocs(q);
		
		var ret = [];
		
		querySnapshot.forEach((doc) => {
			var data = doc.data();
			ret.push(data.name);
		});
		
		var rand = Math.floor(Math.random() * ret.length);
		
		this.setState({result:ret[rand]});
	}
	
	render(){
		return (<body>
			<label>Give me a random ... </label>
			<input type="text" onChange={(e) => {this.setState({query:e.target.value})}} value={this.state.query}  />
			<button type="button" onClick={() => this.getResults()} >Go!</button>
			<p/>
			{this.state.result}
		  </body>);
	}
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          I will give you a random object of the type you seek
        </p>
      </header>
	  <Contents/>
    </div>
  );
}

export default App;
