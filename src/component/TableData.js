import React from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import moment from 'moment'

const TableData=(props)=>{

    const {table,updateApplicationStatus} = props

    const handleViewDetails=(id)=>{
      axios.get(`http://dct-application-form.herokuapp.com/users/application-form/${id}`)
      .then((response)=>{
        const result=response.data
        console.log(result)
        swal({
          title: result.name,
          text: `Contact Number : ${result.phone}\n 
                 email : ${result.email}\n
                 skills : ${result.skills}\n
                 Experience : ${result.experience}`,
          button: 'close'
                  
                
        })
      })
      .catch((err)=>{
        alert(err.message)
      })
    }

    const handleShortedList = (id)=>{
      axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`,{
        'status':'shortlisted'
      })
      .then((response)=>{
        const result=response.data
        console.log('shortlist',result)
        updateApplicationStatus(result)
      })
    }

    const handleRejectedList = (id)=>{
      axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`,{
        'status':'rejected'
      })
      .then((response)=>{
        const result=response.data
        console.log('rejected',result)
        updateApplicationStatus(result)
      })
    }

    return(
        <div style={{backgroundColor:'white'}}>
            <table border='1' align='center'>
              <thead>
                <tr>
                    <th>Name</th>
                    <th>Technical</th>
                    <th>experience</th>
                    <th>Date</th>
                    <th>viewDetails</th>
                    <th>Update Application Status</th>
                </tr>
              </thead>
                <tbody>
                    {table.map((data)=>{
                      return<tr key={data._id}>
                                <td>{data.name}</td>
                                <td>{data.skills}</td>
                                <td>{data.experience}</td>
                                <td>{moment(data.createdAt).format('DD/MM/YYYY')}</td>
                                <td><button style={{backgroundColor:'cornflowerblue',color:'white'}}onClick={()=>handleViewDetails(data._id)}>viewDetails</button></td>
                                <td>
                                  {
                                    data.status =='applied'?
                                    (<div>
                                      <button style={{backgroundColor:'green',color:'white'}} onClick={()=>handleShortedList(data._id)}>shortList</button>
                                      <button style={{backgroundColor:'red',color:'white'}} onClick={()=>handleRejectedList(data._id)}>Reject</button> 
                                    </div>    
                                    ):   
                                     data.status=='shortlisted'?
                                     <button style={{backgroundColor:'green',color:'white'}}>shortList</button>:<button style={{backgroundColor:'red',color:'white'}}>Reject</button>
                                  }  
                                </td>
                      </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default TableData