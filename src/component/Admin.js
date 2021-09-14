import axios from 'axios'
import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import TableData from './TableData.js'

const Admin = (props)=>{

  const [users,setUsers] = useState([])
  const [table,setTable] = useState([])

  useEffect(()=>{
    axios.get('http://dct-application-form.herokuapp.com/users/application-forms')
        .then((response)=>{
          const result=response.data
          console.log(result)
          setUsers(result)
        })
  },[])

  const handleFrontEnd =()=>{
    let frontEnd = users.filter((ele)=>{
      if(ele.jobTitle == 'Front-End Developer')
      {
        return ele
      }
    })
    console.log(frontEnd)
    setTable(frontEnd)
  }
  
  const handleNodeJsDev=()=>{
    let NodeJs = users.filter((ele)=>{
      if(ele.jobTitle == 'Node.js Developer')
      {
        return ele
      }
    })
    console.log(NodeJs)
    setTable(NodeJs)
  }

  const handleMeanStackDev=()=>{
    let meanStackDev = users.filter((ele)=>{
      if(ele.jobTitle == 'MEAN Stack Developer')
      {
        return ele
      }
    })
    console.log(meanStackDev)
    setTable(meanStackDev)
  }

  const handleFullStackDev=()=>{
    let fullStackDev = users.filter((ele)=>{
      if(ele.jobTitle == 'FULL Stack Developer')
      {
        return ele
      }
    })
    console.log( fullStackDev)
    setTable(fullStackDev)
  }

  const updateApplicationStatus = (data)=>{

    const statusUpdate = table.map((user)=>{
      if(user._id==data._id)
      {
        console.log('up',{...user,...data})
        return {...user,...data}
      }
      else
      {
        return {...user}
      }
    })
    setTable(statusUpdate)
  }

  return(
    <div style={{backgroundColor:'white'}}>
      <h1 style={{textAlign:'center'}}>Admin Dashboard</h1>
      <ul style={{display:'flex',flexDirection:'row',marginLeft:'20px',justifyContent:'center'}}>
        <li style={{marginLeft:'20px',listStyle:'none'}}><Link to='/Admin'style={{textDecoration:'none'}}  onClick={handleFrontEnd}>Front-End Developer</Link></li>
        <li style={{marginLeft:'20px',listStyle:'none'}}><Link to='/Admin' style={{textDecoration:'none'}} onClick={handleNodeJsDev}>Node.js Developer</Link></li>
        <li style={{marginLeft:'20px',listStyle:'none'}}><Link to='/Admin' style={{textDecoration:'none'}} onClick={handleMeanStackDev}>Mean Stack Developer</Link></li>
        <li style={{marginLeft:'20px',listStyle:'none',marginBottom:'20px'}}><Link to='/Admin'style={{textDecoration:'none'}} onClick={handleFullStackDev}>Full Stack Developer</Link></li>
      </ul>
  
      <TableData table={table} updateApplicationStatus={updateApplicationStatus}/>
                                    
      
    </div>
  )
}
export default Admin