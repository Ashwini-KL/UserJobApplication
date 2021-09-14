import React,{useState} from 'react'
import axios from 'axios'
import  validator  from 'validator'

const JobForm = (props)=>{
    const [fullName,setFullName] = useState('')
    const [email,setEmail] = useState('')
    const [contactNum,setContactNum] = useState('')
    const [jobTitle,setJobTitle] = useState('')
    const [experience,setExperience] = useState('')
    const [skills,setSkills] = useState('')
    const [formErrors,setFormErrors] = useState('')
    const errors={}

    const handleChange = (e)=>{

        const attr = e.target.name
        if(attr==='fullName')
        {
            setFullName(e.target.value)
        }
        else if(attr==='email')
        {
            setEmail(e.target.value)
        }
        else if(attr==='contactNum')
        {
            setContactNum(e.target.value)
        }
        else if(attr==='jobTitle')
        {
            console.log('t',e.target.value)
            setJobTitle(e.target.value)
        }
        else if(attr==='experience')
        {
            setExperience(e.target.value)
        }
        else if(attr==='skills')
        {
            setSkills(e.target.value)
        }
    }

    const validation = ()=>{
        if(fullName.trim().length==0)
        {
            errors.fullName='name cannot be empty'
        }
        if(email.trim().length==0)
        {
            errors.email='email cannot be empty'
        }
        else if(!validator.isEmail(email))
        {
            errors.email='email is not valid'
        }
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        validation()
        if(Object.keys(errors).length==0)
        {
            setFormErrors({})
            const formData ={
                name:fullName,
                email:email,
                phone:contactNum,
                skills:skills,
                jobTitle:jobTitle,
                experience:experience
            }
            console.log('data',formData)
          
            axios.post('http://dct-application-form.herokuapp.com/users/application-form',formData)
            .then((response)=>{
                const result=response.data
                console.log(result)
            })
            .catch((err)=>{
                alert(err.message)
            })
            setFullName('')
            setEmail('')
            setJobTitle('')
            setSkills('')
            setContactNum('')
            setExperience('')
            
        }
        else
        {
            console.log('err',errors)
            setFormErrors(errors)
        }
       
    }
    return(
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <h1>Apply for job</h1>
            <form onSubmit={handleSubmit} style={{backgroundColor:'white',padding:'20px'}}>
                <label>FullName</label>
                <input type='text'value={fullName} name='fullName' style={{marginLeft:'50px',marginBottom:'10px',textAlign:'justify'}} onChange={handleChange}/>
                {formErrors.fullName&&<span>{formErrors.fullName}</span>}
                <br/>

                <label >Email Address</label>
                <input type='text' value={email} name='email'style={{marginLeft:'20px',marginBottom:'10px'}} onChange={handleChange}/>
                {formErrors.email&&<span>{formErrors.email}</span>}
                <br/>

                <label>Contact Number </label>
                <input type='Number'value={contactNum} name='contactNum' onChange={handleChange} style={{marginLeft:'5px',marginBottom:'10px'}}/>
                <br/>

                <label>Applying for job</label>
                <select value={jobTitle} name='jobTitle'onChange={handleChange} style={{marginLeft:'10px',marginBottom:'10px'}}>
                    <option>select Jobtitle</option>
                    <option>Front-End Developer</option>
                    <option>Node js Developer</option>
                    <option>MEAN Stack Developer</option>
                    <option>FULL Stack Developer</option>
                </select>
                <br/>

                <label>Experience</label>
                <input type='text'value={experience} name='experience' onChange={handleChange}style={{marginLeft:'45px',marginBottom:'10px'}}/>
                <br/>

                <label>Technical skills</label>
                <textarea value={skills} name='skills'onChange={handleChange}style={{marginLeft:'20px'}}></textarea>
                <br/>
                <input type='submit' value='send Application' style={{marginTop:'10px',backgroundColor:'#3366ff',color:'white'}}/>

            </form>
        </div>
    )
}
export default JobForm