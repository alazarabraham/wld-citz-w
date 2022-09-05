import {useState} from 'react';
import {GiAirplane, GiBlackFlag} from 'react-icons/gi';
import {SiYourtraveldottv} from 'react-icons/si';
import axios from 'axios';
import { useSnackbar } from 'material-ui-snackbar-provider'

function Login(){
    const snackbar = useSnackbar()
    const loginFormStyle = {height: "500px"};
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:8080/login", {
            username: username,
            password: password,
        },  {withCredentials: true})
        .then(function(response){
            console.log(response.data.user);
            window.location = "/";
            snackbar.showMessage("Successfully logged in")

        }).catch(function(error){
            console.log(error);
        })
    
    }
    return(
        <div className="row justify-content-center mb-5 mt-5" style={loginFormStyle}>
            <div className="col-10 col-sm-8 col-md-5 col-lg-5 col-xl-4 border" align="center">
            <img className='mt-4 rounded' src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1280px-World_map_-_low_resolution.svg.png' width="75"/>
                <h4 className="lead mt-4">Sign in</h4>
                <small>
                    to continue to
                    World Citizen

                </small>
                <form onSubmit={handleSubmit}>
                    <div className="row justify-content-center mt-4">
                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mt-4" align="center">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput"  placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                                <label htmlFor="floatingInput">Username</label>
                            </div>
                        </div>
                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mt-3" align="center">
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="floatingInput"  placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                                <label htmlFor="floatingInput">Password</label>
                            </div>
                        </div>
                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mt-4" align="center">
                            <button type="submit" className="btn btn-outline-dark btn-block">Login</button>
                            <small className="d-block mt-3">Don't have an account? <a href="/register">Register</a></small>
                        </div>
                    </div>
                </form>
                
            </div>
        </div>
    )
}

export default Login;