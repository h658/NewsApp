import './App.css'
import React  from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Route, Routes,
  
} from "react-router-dom";
import { useState} from 'react';
import LoadingBar from 'react-top-loading-bar'

const App=(props)=> {
  const pageSize=15;

  const[progress,setProgress]=useState(0)

    return (
      <div>
         <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
      />
  <Routes>
        <Route exact path="/" 
       element= {<News setProgress={setProgress} key="general" pageSize={pageSize} country={props.country} category="general"/> }/>
         <Route exact path="/business" 
         element=  {<News setProgress={setProgress} key="business" pageSize={pageSize} country={props.country} category="business"/>} />
         <Route exact path="/entertainment" 
         element=  {<News setProgress={setProgress} key="entertainment" pageSize={pageSize} country={props.country} category="entertainment"/>} />
         <Route exact path="/health"
         element= { <News setProgress={setProgress} key="health" pageSize={pageSize} country={props.country} category="health"/>} />
         <Route exact path="/science"
         element= {<News setProgress={setProgress} key="science" pageSize={pageSize} country={props.country} category="science"/>} />
         <Route exact path="/sports"
         element= {<News setProgress={setProgress} key="sports" pageSize={pageSize} country={props.country} category="sports"/>} />
         <Route exact path="/technology" 
         element= {<News setProgress={setProgress} key="technology" pageSize={pageSize} country={props.country} category="technology"/> }/>
     

            
          
  </Routes>
        
       
        </Router>
      </div>
    )
  }

export default App;