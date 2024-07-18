import React, {useState} from 'react'
import Layout from '../../components/Layout/Layout.js'
import axios from 'axios';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "../../styles/AuthStyles.css"

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [answer, setAnswer] = useState();
    const navigate = useNavigate();
    //form function
    const handleSubmit = async(e) => {
        e.preventDefault();
        //we are getting all the value {name,email, password, address, phone}
        try{
           const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {name,email, password, phone, address, answer});
           if(res.data.success){
              toast.success(res.data.message)
              navigate('/login')
           }else{
            toast.error(res.data.message)
           }
        }catch (error){
          console.log(error);
          toast.error('Something went wrong')
        }
    };// by this our page will not refresh and page will remain single page application
  return(
    <Layout title="Register -Ecommerce App">
         <div className='form-container'>
            <form onSubmit={handleSubmit}>
            <h4 className="title">REGISTER FORM</h4>
  <div className="mb-3">
    <input 
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}  // whatever there is chane it will be detected by event e and will be set in the name/  
     className="form-control" id="exampleInputName" 
     placeholder='Enter Your Name'
     required
     autoFocus
     />
  </div>
  <div className="mb-3">
    <input type="email"
     value ={email} 
     onChange={(e) => setEmail(e.target.value)} 
     className="form-control" 
     id="exampleInputEmail"
     placeholder='Enter Your Email' 
     required
     />
  </div>
  <div className="mb-3">
    <input type="password" 
    value={password} 
    onChange={(e) => setPassword(e.target.value)} 
    className="form-control" id="exampleInputPassword1" 
     placeholder='Enter Your Password'
     required
     />
  </div>
  <div className="mb-3">
    <input type="text" 
    value={phone}
    onChange={(e) => setPhone(e.target.value)} 
     className="form-control" id="exampleInputPhone"  
      placeholder='Enter Your Phone'
      required
      />
      
  </div>
  <div className="mb-3">
    <input type="text" 
    value={address}  /* our input has been binded with state due to value  */
    onChange={(e) => setAddress(e.target.value)} 
    className="form-control"   id="exampleInputAddress" 
     placeholder='Enter Your Address' 
     required
     />
  </div>
  <div className="mb-3">
    <input type="text" 
    value={answer}  /* our input has been binded with state due to value  */
    onChange={(e) => setAnswer(e.target.value)} 
    className="form-control"   id="exampleInputsetAnswer" 
     placeholder='Your first school' 
     required
     />
  </div>
  <button type="submit" class="btn btn-primary">REGISTER</button>
</form>
         </div>
    </Layout>
   
  )
}

export default Register


// If will leave useState empty then will not be write anything in email , pass etc ,  But if we write something then we will not be able to erase it. hence we should work on "onChange" event

// we have to prevent the refresh page. it is the default behaviour of js , so we have to prevent it given below
// we have to create some constum function like 
//Now after that we have to get backened data so we have to install 'axios' from npm.js
/*funtion of 'axios'
1.we can get backende gata.
2 we can post data.
3. we can update
*/
//for notification we have to install 'react-toastify'  ex: like register successfully
/*now we have to secure our frontend. our backend is on some other server and our react is running on some other port.
so we will create .env file in react application i.e. in src file
*/
// REACT_APP_API = http://localhost:8000  this is our backened code we have to connect it with frontend
/*after that we will install 'concurrently' and 'cors' from npmjs website. its function is to run two command simulataneously in single application
 Note: We have to install in the node server not in the frontend i.e not in react application. i.e. installing in in Ecommerce app 2023
  by using following command: npm i concurrently cors
  NOTE: Here we are installing  cors package also so that we could not get any cross origin errors.
     corss origins occurs because if we have to connect more than one ports then in our case the ports
     are 8000 and 3000. so it is the chance to get some origin realted error.

  // after installation we will execute  the following command in package.json of server folder in the scripts
     "dev": "concurrently \"npm run server\" \"npm run client\""
    // before that we will enable cors in the server.js file by writing command: import cors from 'cors'
    //After that we are also creating command for client for accessing react application
    "client" : "npm start --prefix ./client",  // here we are using --prefix ./client because our react application is inside the client floder

*/


