import {useState, useEffect} from 'react';
import {GiAirplane, GiBlackFlag} from 'react-icons/gi';
import {SiYourtraveldottv} from 'react-icons/si';
import axios from 'axios';

function Register(){
    const loginFormStyle = {height: "500px"};
    const [first_name, set_First_name] = useState("");
    const [last_name, set_Last_name] = useState("");
    const [country_id, setCountry_id] = useState("");
    const [bio, setBio] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [admin, setAdmin] = useState("");
    const [avatar, setAvatar] = useState("");

    const [countries, setCountries] = useState([]);

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log({
            first_name: first_name,
            last_name: last_name,
            country_id: country_id,
            username: username,
            password: password,
            admin: "N",
            bio: bio,
            avatar: avatar,
            email: email
        })
        axios.post("http://localhost:8080/users/addUser", {
            first_name: first_name,
            last_name: last_name,
            country_id: country_id,
            username: username,
            password: password,
            admin: "N",
            bio: bio,
            avatar: avatar,
            email: email
        },  {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            window.location = "/login";
        }).catch(function(error){
            console.log(error);
        })
    
    }

    const getCountries = () =>{
        axios.get(`http://localhost:8080/countries/getAllCountries`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setCountries(response.data);
        }).catch(function(error){
            console.log(error);
        })
    }

    useEffect(()=> getCountries(), []);

    const avatarList = [
        "https://cdn-icons.flaticon.com/png/512/4440/premium/4440953.png?token=exp=1650779013~hmac=56552d0ee67c46db2296628f354df936",
        "https://cdn-icons-png.flaticon.com/512/921/921026.png",
        "https://cdn-icons.flaticon.com/png/512/3641/premium/3641963.png?token=exp=1650767581~hmac=250929c8d863de553124d7c11d2619ab",
        "https://cdn-icons.flaticon.com/png/512/4532/premium/4532517.png?token=exp=1650767773~hmac=a8583301e86167a3f9161d8e50cbec98",
        "https://cdn-icons.flaticon.com/png/512/3521/premium/3521769.png?token=exp=1650768024~hmac=d6c0a812d222281fb67550d08e6decb0",
        "https://cdn-icons-png.flaticon.com/512/4329/4329445.png",
        "https://cdn-icons-png.flaticon.com/512/921/921036.png",
        "https://cdn-icons-png.flaticon.com/512/921/921089.png",
        "https://cdn-icons.flaticon.com/png/512/4202/premium/4202832.png?token=exp=1650767637~hmac=a78e05bf742b868e6f2a3eeaadb42b17",
        "https://cdn-icons-png.flaticon.com/512/921/921053.png",
        "https://cdn-icons.flaticon.com/png/512/4478/premium/4478408.png?token=exp=1650767915~hmac=b7e7ab4fffa1f9612ec522cefa6ff225",
        "https://cdn-icons.flaticon.com/png/512/4440/premium/4440969.png?token=exp=1650767991~hmac=7cb15003f7247110290eb8b10bca9d0a"
    ];

    const imgStyle= {width: "50px", height: "50px"};
    const textareaStyle = {height: "100px"};

    return(
        <div className="row justify-content-center mt-5 mb-5" style={loginFormStyle}>
            
            <div className="col-10 col-sm-8 col-md-8 col-lg-8 col-xl-8 border  mb-5" >
                <div align="center">
                    <h4 className="lead mt-4">Register</h4>
                    <small>
                        to continue to
                        World Citizen
                    </small>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row justify-content-center mt-4  mb-5">
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-4" >
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput"  placeholder="First name" value={first_name} onChange={(e)=> set_First_name(e.target.value)}/>
                                <label htmlFor="floatingInput">First Name</label>
                            </div>
                        </div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-4" >
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput"  placeholder="Last name" value={last_name} onChange={(e)=> set_Last_name(e.target.value)}/>
                                <label htmlFor="floatingInput">Last Name</label>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-3">
                            <div className="form-floating mb-3">
                                <select defaultValue="Select Country" className="form-select" aria-label="Default select example" value={country_id} onChange={(e)=> setCountry_id(e.target.value)}>
                                    <option value="Select Country" selected>Select Country</option>
                                    {countries.map((country, i)=>(
                                    <option value={country.id}>{country.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-3" >
                            <div className="form-floating mb-3">
                                <div className="form-control" style={textareaStyle}>
                                    <div onChange={(e)=> setAvatar(e.target.value)} className="row ">
                                    {avatarList.map((avatar, i)=>(
                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 mt-2">
                                            <div class="form-check">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={avatar}/>
                                            <img src={avatar} width="20" height="20"/>
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                                <label htmlFor="floatingInput">Avatar</label>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-4" >
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="floatingInput"  placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                                <label htmlFor="floatingInput">Email</label>
                            </div>
                        </div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-4" >
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control " id="floatingInput"  placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                                <label htmlFor="floatingInput ">Username</label>
                            </div>
                        </div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-4" >
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="floatingInput"  placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                                <label htmlFor="floatingInput">Password</label>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-4" >
                            <div class="form-floating">
                                        <textarea class="form-control" placeholder="Bio" id="floatingTextarea2" style={textareaStyle} value={bio} onChange={(e)=> setBio(e.target.value)}></textarea>
                                        <label for="floatingTextarea2">Bio</label>
                            </div>
                        </div>
                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mt-4" align="center">
                            <button type="submit" className="btn btn-outline-dark btn-block">Register</button>
                            <small className="d-block mt-3">Already have an account? <a href="/login">Login</a></small>
                        </div>
                    </div>
                </form>
                
            </div>
        </div>
    )
}

export default Register;