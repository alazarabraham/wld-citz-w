import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {BsBook, BsHeartFill, BsThreeDots} from 'react-icons/bs';
import {IoPersonOutline} from 'react-icons/io5';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import { useSnackbar } from 'material-ui-snackbar-provider';
import {FcSearch} from 'react-icons/fc';
import $ from 'jquery'; 

function HistoryTopics({userId}){
    const snackbar = useSnackbar();
    const [historyTopics, setHistoryTopics] = useState([]);
    const [countries, setCountries] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [keyword, setKeyword] = useState("");


    //history topic form fields 
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [country_id, setCountry_id] = useState("");

  

    const getHistoryTopics = () =>{
        axios.get(`http://localhost:8080/historyTopics/getAllHistoryTopicInfo`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setHistoryTopics(response.data);
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


    useEffect(()=> getHistoryTopics(), []);
    useEffect(()=> getCountries(), []);

    //handle submits
    const addHistoryTopicSubmit = (e)=>{
        e.preventDefault();
        if(userId != undefined){
            setErrorMsg("");
            console.log({
                name: name,
                description: description,
                user_id: userId,
                country_id: country_id
            });
            axios.post("http://localhost:8080/historyTopics/addHistoryTopic", {
                name: name,
                description: description,
                user_id: userId,
                country_id: country_id
            }).then(function(response){
                console.log(response);
                setHistoryTopics([]);
                getHistoryTopics();
                document.getElementById('closeHistoryTopicModal').click();
                snackbar.showMessage("Topic successfully added");
            }).catch(function(error){
                console.log(error);
            });
        }else if(userId == undefined){
            setErrorMsg(<small className="text-danger text-center mt-3">Please login to add a historical topic</small>)
        }
    };


    function isPlural(num){
        if(num == 1){
            return "";
        }else{
            return "s";
        }
    }
    const cardStyle ={height: "300px"};
    const descriptionStyle ={height: "80px", textOverflow: "ellipsis", overflow: "hidden"};
    const textareaStyle = {height: "100px"};
    return(
        <div>
        <div className="row justify-content-center">
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                <h4 className="fs-2">Historical Topics</h4>
                <small>Explore unique history topics posted by our users</small>
            </div>
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                <div className="row justify-content-end mt-4">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#addhistoryTopicModal"><AiOutlinePlusCircle className="mb-1"/> Add Historical Topic</button>
                    </div>
                </div> 
            </div>
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mt-4">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-6">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Search historical topics..." aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={(e)=> {
                                        axios.post(`http://localhost:8080/historyTopics/getAllHistoryTopicInfoSearch`, {
                                            keyword: e.target.value
                                        })
                                        .then(function(response){
                                            console.log(response);
                                            setHistoryTopics(response.data);
                                            // snackbar.showMessage("Topic successfully added");
                                        }).catch(function(error){
                                            console.log(error);
                                        });
                                    }}/>
                                <span  disabled class="input-group-text"><FcSearch size={25}/></span>
                            </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 mt-3">
            <div className="row justify-content-center">
            {historyTopics.map((historyTopic, i)=>(
                    <div className="col-10 col-sm-10 col-md-8 col-lg-6 col-xl-6 mt-3">
                        <div class="card mt-4" style={cardStyle}>
                            <div class="card-body">
                                <div className="row">
                                    <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                        <small className="lead"><Link className="link-dark text-decoration-none fw-bold" to={`/historyTopic/${historyTopic.id}`}>{historyTopic.name}</Link></small>
                                        <small className="d-block history-topics-preview">{historyTopic.description}</small>
                                        <Link to={`/historyTopic/${historyTopic.id}`} className="text-decoration-none text-dark"><BsThreeDots/></Link>
                                        <small className="d-block mt-4"><Link className="link-dark text-decoration-none fw-bold" to={`/country/${historyTopic.country_id}`}>{historyTopic.country_name}</Link> <img src={historyTopic.flag} width="20"/></small>
                                        <small className="d-block">Posted by: <span className="fw-bold"><Link className="link-dark" to={`/profile/${historyTopic.userId}`}>{historyTopic.username}</Link></span></small>
                                        <small className="d-block"><BsHeartFill className="text-danger"/> {historyTopic.total_likes} like{isPlural(historyTopic.total_likes)}</small>

                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div> 
                ))}
            </div>
        </div>
        </div>
        <div className="my modals">
        {/* Add book modal */}
        <div className="modal fade" tabindex="-1" role="dialog" id="addhistoryTopicModal" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content rounded-5 shadow">
                    <div className="modal-header p-5 pb-4 border-bottom-0">
                        <h2 className="fw-bold mb-0"><BsBook className="mb-2"/> Add Historical Topic</h2>
                        <button type="button" className="btn-close" id="closeHistoryTopicModal" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body p-5 pt-0">
                        <form className="" onSubmit={addHistoryTopicSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control rounded-4" id="floatingInput" placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)}/>
                            <label for="floatingInput">Name</label>
                        </div>
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Description" id="floatingTextarea2" style={textareaStyle} value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>
                            <label for="floatingTextarea2">Description</label>
                        </div>
                        <div className="form-floating mt-4">
                            <select defaultValue="Select Country" className="form-select" aria-label="Default select example" value={country_id} onChange={(e)=> setCountry_id(e.target.value)}>
                                <option value="Select Country" selected>Select Country</option>
                                {countries.map((country, i)=>(
                                <option value={country.id}>{country.name}</option>
                                ))}
                            </select>
                        </div>
                        {errorMsg}
                        <button className="w-100 mb-2 btn btn-lg rounded-4 btn-dark mt-5" type="submit">Save</button>                   
                        </form>
                    </div>
                    </div>
                </div>
        </div>
        </div>
        </div>
    )
}
export default HistoryTopics;