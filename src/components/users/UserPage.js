import axios from 'axios';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {BiWorld, BiPencil} from 'react-icons/bi';
import {GoLocation} from 'react-icons/go';
import {FiUser} from 'react-icons/fi';
import {GrUserAdmin, GrLanguage} from 'react-icons/gr';
import {GiBlackFlag} from 'react-icons/gi';
import {BsPencil, BsPencilSquare} from 'react-icons/bs';
import {AiOutlineUser} from 'react-icons/ai';
import { useSnackbar } from 'material-ui-snackbar-provider'

function UserPage({userId, getLoggedInUser}){
    const snackbar = useSnackbar()
    const {id} = useParams();

    const [user, setUser] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [countries, setCountries] = useState([]);
    const [bookPostCount, setBookPostCount] = useState([]);
    const [filmPostCount, setFilmPostCount] = useState([]);
    const [historyPostCount, setHistoryPostCount] = useState([]);

    //language form fields
    const [languageName, setLanguageName] = useState("");

    //country form fields 
    const [countryName, setCountryName] = useState("");
    const [flag, setFlag] = useState("");
    const [language_id, setLanguage_id] = useState("");
    const [capital, setCapital] = useState("");
    const [banner_img, setBanner_img] = useState("");

    //update avatar form field
    const [updateAvatar, setUpdateAvatar] = useState("");

    //update user form fields
    const [first_name, set_First_name] = useState("");
    const [last_name, set_Last_name] = useState("");
    const [country_id, setCountry_id] = useState("");
    const [bio, setBio] = useState("");
    const [email, setEmail] = useState("");

    //avatars
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
    const getUser = () =>{
        axios.get(`http://localhost:8080/users/getUserInfo/${id}`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setUser(response.data[0]);
            set_First_name(response.data[0].first_name);
            set_Last_name(response.data[0].last_name);
            setCountry_id(response.data[0].country_id);
            setBio(response.data[0].bio);
            setEmail(response.data[0].email);
        }).catch(function(error){
            console.log(error);
        })
    }
    const getUserBookPostCount = () =>{
        axios.get(`http://localhost:8080/users/getUserBookPostCount/${id}`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setBookPostCount(response.data[0]);
        }).catch(function(error){
            console.log(error);
        })
    }
    const getUserFilmPostCount = () =>{
        axios.get(`http://localhost:8080/users/getUserFilmPostCount/${id}`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setFilmPostCount(response.data[0]);
        }).catch(function(error){
            console.log(error);
        })
    }
    const getUserHistoryPostCount = () =>{
        axios.get(`http://localhost:8080/users/getUserHistoryPostCount/${id}`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setHistoryPostCount(response.data[0]);
        }).catch(function(error){
            console.log(error);
        })
    }
    const getLanguages = () =>{
        axios.get(`http://localhost:8080/languages/getAllLanguages`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setLanguages(response.data);
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

    function getUserRole(admin){
        if(admin == "Y"){
            return "Admin";
        }else if(admin == "N"){
            return "User";
        }
    }

    function getUserRoleIcon(admin){
        if(admin == "Y"){
            return <GrUserAdmin/>;
        }else if(admin == "N"){
            return <FiUser/>;
        }
    }

    function getAdminButtons(admin){
        if(admin == "Y"){
            return <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mb-5">
            <div className="row justify-content-end mt-4">
                <div class="d-grid gap-2 d-flex justify-content-end">
                    <button className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#addLanguageModal">+ Language</button>
                    <button  type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#addCountryModal">+ Country</button>

                </div>
            </div>                
        </div>
        }
    }

    

    //handle submit functions
    const addLanguageSubmit = (e)=>{
        e.preventDefault();
        console.log({
            name: languageName
        });
        axios.post("http://localhost:8080/languages/addLanguage", {
            name: languageName
        }).then(function(response){
            console.log(response);
            setLanguages([]);
            getLanguages();
            document.getElementById("closeAddLanguageModal").click();
            snackbar.showMessage("Language successfully added");

        }).catch(function(error){
            console.log(error);
        });
    };
    const addCountrySubmit = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:8080/countries/addCountry", {
            name: countryName,
            flag: flag,
            language_id: language_id,
            capital: capital,
            banner_img: banner_img
        }).then(function(response){
            console.log(response);
            document.getElementById("closeAddCountryModal").click();
            snackbar.showMessage("Country successfully added");

        }).catch(function(error){
            console.log(error);
        });
    }  

    const updateProfileSubmit = (e)=>{
        e.preventDefault();
        console.log({
            first_name: first_name,
            last_name: last_name,
            bio: bio,
            email: email
        })
        axios.put(`http://localhost:8080/users/updateUser/${id}`,{
            first_name: first_name,
            last_name: last_name,
            bio: bio,
            email: email
        }).then(function(response){
            console.log(response);
            setUser([]);
            getUser();
            document.getElementById("closeUpdateUserModal").click();
            snackbar.showMessage("Profile successfully updated");

        }).catch(function(error){
            console.log(error);
        });
    }  

    useEffect(()=> getUser(), []);
    useEffect(()=> getLanguages(), []);
    useEffect(()=> getUserBookPostCount(), []);
    useEffect(()=> getUserFilmPostCount(), []);
    useEffect(()=> getUserHistoryPostCount(), []);
    useEffect(()=> getCountries(), []);

    //update submits
    const updateAvatarSubmit = (e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/users/updateAvatar/${userId}`, {
            avatar: updateAvatar
        }, {withCredentials: true}).then(function(response){
            console.log(response);
            setUser([]);
            getUser();
            document.getElementById("closeUpdateAvatarModal").click();
            getLoggedInUser();
            snackbar.showMessage("Avatar successfully updated");

        }).catch(function(error){
            console.log(error);
        });
    }  

    function showUpdateAvatarIcon(id){
        if(userId != undefined && userId != null){
            if(userId == id){
             return <a style={editAvatarButton} className="position-absolute text-decoration-none text-secondary" type="button" data-bs-toggle="modal" data-bs-target="#updateAvatarModal"><BsPencilSquare/></a>   
            }
        }
    }


    function showEditProfileButton(id){
        if(userId != undefined && userId != null){
            if(userId == id){
             return <div class="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
             <button  type="button" className="btn btn-outline-dark float-end" data-bs-toggle="modal" data-bs-target="#updateUserModal">Edit profile</button>
             </div>
            }
        }
    }


    const avatarContainerStyle = {height: "350px"}
    const avatarStyle = {height: "20%", width: "28%"}
    const editAvatarButton = {zIndex: "1"};
    const textareaStyle = {height: "100px"};

    return(
        <div>
        <div className="row justify-content-center mb-5">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="row justify-content-center">
                    {showEditProfileButton(user.id)}

                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " style={avatarContainerStyle}>
                        <div className="row justify-content-center">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-7 " >
                            <div className="container rounded-circle mt-4" style={avatarStyle} >
                                <img src={user.avatar}  className="w-100 mw-80 mh-60 h-60 p-4 rounded-circle position-relative"/>
                                {showUpdateAvatarIcon(user.id)}
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 " >
                            <p className="lead  text-center">{user.first_name} {user.last_name}</p>  
                            <div className="row justify-content-center">
                                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center">
                                    <small className="lead ">{bookPostCount.books_posted_count}</small>
                                    <small className=" d-block">Books posted</small>
                                </div>
                                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center">
                                    <small className="lead ">{filmPostCount.films_posted_count}</small>
                                    <small className=" d-block">Films posted</small>
                                </div>
                                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center">
                                    <small className="lead ">{historyPostCount.history_posted_count}</small>
                                    <small className=" d-block">Historical topics posted</small>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            {getAdminButtons(user.admin)}
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mt-3">
                <div className="row">
                    <div className="col-10 col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
                        <small className="d-block mt-3 fw-bold">Bio:</small>
                        <small className="d-block mt-3">{user.bio} </small>
                        <small className="d-block mt-3 fw-bold"><BiWorld/> From {user.country_name}</small>
                        <small className="d-block mt-3 fw-bold">{getUserRoleIcon(user.admin)} Role: {getUserRole(user.admin)}</small>

                    </div>
                    <div className="col-10 col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
                        <small className="d-block mt-3 fw-bold">Email:</small>
                        <small className="d-block mt-3">{user.email} </small>

                    </div>
                </div>

            </div>
        </div>
        <div className="mymodals">
            {/* Add country modal */}
            <div className="modal fade" tabindex="-1" role="dialog" id="addCountryModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content rounded-5 shadow">
                    <div className="modal-header p-5 pb-4 border-bottom-0">
                        <h2 className="fw-bold mb-0"><GiBlackFlag/> Add Country</h2>
                        <button type="button" className="btn-close" id="closeAddCountryModal" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body p-5 pt-0">
                        <form className="" onSubmit={addCountrySubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control rounded-4" id="floatingInput" placeholder="Country name" value={countryName} onChange={(e)=> setCountryName(e.target.value)}/>
                            <label for="floatingInput">Country name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control rounded-4" id="floatingInput" placeholder="Capital" value={capital} onChange={(e)=> setCapital(e.target.value)}/>
                            <label for="floatingInput">Capital</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control rounded-4" id="floatingInput" placeholder="Flag Image URL" value={flag} onChange={(e)=> setFlag(e.target.value)}/>
                            <label for="floatingInput">Flag Image URL</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control rounded-4" id="floatingInput" placeholder="Country Banner Image URL" value={banner_img} onChange={(e)=> setBanner_img(e.target.value)}/>
                            <label for="floatingInput">Country Banner Image URL</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select defaultValue="Select Language" className="form-select" aria-label="Default select example" value={language_id} onChange={(e)=> setLanguage_id(e.target.value)}>
                                <option value="Select Language" selected>Language</option>
                                {languages.map((language, i)=>(
                                <option value={language.id}>{language.name}</option>
                                ))}
                            </select>
                        </div>
                        <button className="w-100 mb-2 btn btn-lg rounded-4 btn-dark" type="submit">Save</button>                   
                        </form>
                    </div>
                    </div>
                </div>
            </div>
            {/* Add language modal */}
            <div className="modal fade" tabindex="-1" role="dialog" id="addLanguageModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content rounded-5 shadow">
                    <div className="modal-header p-5 pb-4 border-bottom-0">
                        <h2 className="fw-bold mb-0"><GrLanguage/> Add Language</h2>
                        <button type="button" className="btn-close" id="closeAddLanguageModal" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body p-5 pt-0">
                        <form className="" onSubmit={addLanguageSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control rounded-4" id="floatingInput" placeholder="Language name" value={languageName} onChange={(e)=> setLanguageName(e.target.value)}/>
                            <label for="floatingInput">Language name</label>
                        </div>
                        <button className="w-100 mb-2 btn btn-lg rounded-4 btn-dark" type="submit">Save</button>                   
                        </form>
                    </div>
                    </div>
                </div>
            </div>
            {/* update avatar modal */}
            <div className="modal fade" tabindex="-1" role="dialog" id="updateAvatarModal" aria-hidden="true">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content rounded-5 shadow">
                    <div className="modal-header p-5 pb-4 border-bottom-0">
                        <h2 className="fw-bold mb-0"><AiOutlineUser/> Update Avatar</h2>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeUpdateAvatarModal"></button>
                    </div>

                    <div className="modal-body p-5 pt-0">
                        <form className="" onSubmit={updateAvatarSubmit}>
                        <div onChange={(e)=> setUpdateAvatar(e.target.value)} className="row">
                            {avatarList.map((avatar, i)=>(
                                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 mt-2">
                                    <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={avatar}/>
                                    <img src={avatar} width="100" height="100"/>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-100 mb-2 btn btn-lg rounded-4 btn-dark mt-4" type="submit">Save</button>                   
                        </form>
                    </div>
                    </div>
                </div>
            </div>
            {/* update user modal */}
            <div className="modal fade" tabindex="-1" role="dialog" id="updateUserModal" aria-hidden="true">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content rounded-5 shadow">
                    <div className="modal-header p-5 pb-4 border-bottom-0">
                        <h2 className="fw-bold mb-0"><AiOutlineUser/> Edit profile</h2>
                        <button type="button" className="btn-close" id="closeUpdateUserModal" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body p-5 pt-0">
                        <form className="" onSubmit={updateProfileSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control rounded-4" id="floatingInput" placeholder="First name" value={first_name} onChange={(e)=> set_First_name(e.target.value)}/>
                            <label for="floatingInput">First name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control rounded-4" id="floatingInput" placeholder="Last name" value={last_name} onChange={(e)=> set_Last_name(e.target.value)}/>
                            <label for="floatingInput">Last name</label>
                        </div>
                        {/* <div className="form-floating mb-3">
                            <select className="form-select" aria-label="Default select example" value={country_id} onChange={(e)=> setCountry_id(e.target.value)}>
                                {countries.map((country, i)=>(
                                <option selected value={country.id}>{country.name}</option>
                                ))}
                            </select>
                        </div> */}
                        <div class="form-floating">
                                    <textarea class="form-control" placeholder="Bio" id="floatingTextarea2" style={textareaStyle} value={bio} onChange={(e)=> setBio(e.target.value)}></textarea>
                                    <label for="floatingTextarea2">Bio</label>
                        </div>
                        <div className="form-floating mb-3 mt-4">
                            <input type="email" className="form-control rounded-4" id="floatingInput" placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                            <label for="floatingInput">Email</label>
                        </div>
                        <button className="w-100 mb-2 btn btn-lg rounded-4 btn-dark mt-4" type="submit">Save</button>                   
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default UserPage;