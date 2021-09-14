import React from 'react'
import {Link,Route} from 'react-router-dom'
import Home from './component/Home'
import JobForm from './component/JobForm'
import Admin from './component/Admin'

const App = (props)=>{

  return(
    <div>
      <ul style={{display:'flex',flexDirection:'row',justifyContent:'space-between',backgroundColor:'#6610f2',padding:'10px'}}>
        <li style={{listStyle:'none'}}><Link style={{textDecoration:'none',color:'white'}} to='/'>Home</Link></li>
        <li style={{listStyle:'none'}}><Link style={{textDecoration:'none',color:'white'}} to='/Applyforjob'>Applyforjob</Link></li>
        <li style={{listStyle:'none'}}><Link style={{textDecoration:'none',color:'white'}} to='Admin'>Admin</Link></li>
      </ul>
        <Route path='/' component={Home} exact={true}/>
        <Route path='/Applyforjob' component={JobForm}/>
        <Route path='/Admin' component={Admin}/>
      
    </div>
  )
}
export default App