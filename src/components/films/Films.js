import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {BsBook, BsHeartFill} from 'react-icons/bs';
import {IoPersonOutline} from 'react-icons/io5';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {BiFilterAlt} from 'react-icons/bi';
import { useSnackbar } from 'material-ui-snackbar-provider';
import {GiFilmProjector} from 'react-icons/gi';
function Films({userId}){
    const snackbar = useSnackbar();
    const [films, setFilms] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [countries, setCountries] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [filterMsg, setFilterMsg] = useState("");

    //film form fields 
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [release_year, setRelease_year] = useState("");
    const [language_id, setLanguage_id] = useState("");
    const [country_id, setCountry_id] = useState("");
    const [poster, setPoster] = useState("");

  

    const getFilms = () =>{
        axios.get(`http://localhost:8080/films/getAllFilmInfo`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setFilms(response.data);
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

    useEffect(()=> getFilms(), []);
    useEffect(()=> getLanguages(), []);
    useEffect(()=> getCountries(), []);

    //handle submits
    
    const addFilmSubmit = (e)=>{
        e.preventDefault();
        if(userId != undefined){
            setErrorMsg("");
            console.log({
                title: title,
                description: description,
                release_year: release_year,
                language_id: language_id,
                user_id: userId,
                country_id: country_id,
                poster: poster
            });
            axios.post("http://localhost:8080/films/addFilm", {
                title: title,
                description: description,
                release_year: release_year,
                language_id: language_id,
                user_id: userId,
                country_id: country_id,
                poster: poster
            }).then(function(response){
                console.log(response);
                setFilms([]);
                getFilms();
                document.getElementById('closeFilmModal').click();
                snackbar.showMessage("Successfully added");
            }).catch(function(error){
                console.log(error);
            });
        }else if(userId == undefined){
            setErrorMsg(<small className="text-danger text-center mt-3">Please login to add a film</small>)
        }
    };

    function pageIsEmpty(){
        if(films.length == 0){
            return (
            <div className="col-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 mt-4" align="center">
                <div className="row justify-content-center mt-4">
                <p className="lead">Sorry</p>
                <small>There are no films yet...</small>
                </div>
            </div>
            )
        }
    }

    function isPlural(num){
        if(num == 1){
            return "";
        }else{
            return "s";
        }
    }

    const filterByCountry = (e) => {
        setFilterMsg("");
        if(e.target.value == "reset"){
            getFilms();
        }else{
            let id = parseInt(e.target.value);
            axios.get(`http://localhost:8080/films/getAllFilmInfoByCountry/${id}`, {withCredentials: true})
            .then(function(response){
                console.log(response.data);
                if(response.data.length == 0){
                    setFilterMsg(
                    <div className="col-10 col-sm-10 col-md-8 col-lg-6 col-xl-6 mt-4" align="center">
                        <small class="text-center mt-4">There are no films for this country</small>
                    </div>
                    )}
                setFilms(response.data);
            }).catch(function(error){
                console.log(error);
            })
        }
    }
    const cardStyle ={height: "300px"};
    const descriptionStyle ={height: "55%"};
    const textareaStyle = {height: "100px"};
    return(
        <div>
        <div className="row justify-content-center mb-5">
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mb-5">
                <h4 className="fs-2">Films and Shows</h4>
                <small>Explore unique films posted by our users</small>
            </div>
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                <div className="row justify-content-end mt-4">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#addFilmModal"><AiOutlinePlusCircle className="mb-1"/> Add Film</button>
                    </div>
                </div> 
            </div>
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                <div className="row justify-content-end mt-4">
                    <div class="d-grid gap-2 d-flex justify-content-end">
                        <small class="mt-2">Filter <BiFilterAlt/></small>
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            <select onChange={filterByCountry} class="form-select" aria-label="Default select example" >
                                <option selected>By Country</option>
                                <option value="reset">All Countries</option>
                                {countries.map((country, i)=>(
                                <option value={country.id}>{country.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div> 
            </div>
            {/* {pageIsEmpty()} */}
            {filterMsg}
            <div className="col-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 mt-3">
            <div className="row justify-content-center">
            {films.map((film, i)=>(
                    <div className="col-10 col-sm-10 col-md-8 col-lg-6 col-xl-6 mt-3">
                        <div class="card mt-4" style={cardStyle}>
                            <div class="card-body">
                                <div className="row">
                                    <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                        <small className="lead"><Link className="link-dark text-decoration-none fw-bold" to={`/film/${film.id}`}>{film.title}</Link></small>
                                        <small className="d-block">{film.language}</small>
                                        <small className="d-block">{film.release_year}</small>
                                        <small className="d-block"><Link className="link-dark text-decoration-none fw-bold" to={`/country/${film.country_id}`}>{film.country_name}</Link> <img src={film.flag} width="20"/></small>

                                        {/* <div style={descriptionStyle} className="overflow-scroll">
                                            <small className="d-block mt-2">{film.description}</small>
                                        </div> */}
                                        <small className="d-block">Posted by: <span className="fw-bold"><Link className="link-dark" to={`/profile/${film.userId}`}>{film.username}</Link></span></small>
                                        <small className="d-block"><BsHeartFill className="text-danger"/> {film.total_likes} like{isPlural(film.total_likes)}</small>

                                    </div>
                                    <div className="col-6 col-sm-5 col-md-5 col-lg-5 col-xl-4" align="center">
                                        <img src={film.poster} height="250"  class="w-100 p-2"/>
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
        {/* Add film modal */}
        <div className="modal fade" tabindex="-1" role="dialog" id="addFilmModal" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content rounded-5 shadow">
                    <div className="modal-header p-5 pb-4 border-bottom-0">
                        <h2 className="fw-bold mb-0"><GiFilmProjector className="mb-2"/> Add Film or Show</h2>
                        <button type="button" className="btn-close" id="closeFilmModal" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body p-5 pt-0">
                        <form className="" onSubmit={addFilmSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control rounded-4" id="floatingInput" placeholder="Title" value={title} onChange={(e)=> setTitle(e.target.value)}/>
                            <label for="floatingInput">Title</label>
                        </div>
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Description" id="floatingTextarea2" style={textareaStyle} value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>
                            <label for="floatingTextarea2">Description</label>
                        </div>
                        <div className="form-floating mb-3 mt-3">
                            <input type="text" className="form-control rounded-4" id="floatingInput" placeholder="Title" value={release_year} onChange={(e)=> setRelease_year(e.target.value)}/>
                            <label for="floatingInput">Release Year</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select defaultValue="Select Language" className="form-select" aria-label="Default select example" value={language_id} onChange={(e)=> setLanguage_id(e.target.value)}>
                                <option value="Select Language" selected>Select Language</option>
                                {languages.map((language, i)=>(
                                <option value={language.id}>{language.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <select defaultValue="Select Country" className="form-select" aria-label="Default select example" value={country_id} onChange={(e)=> setCountry_id(e.target.value)}>
                                <option value="Select Country" selected>Select Country</option>
                                {countries.map((country, i)=>(
                                <option value={country.id}>{country.name}</option>
                                ))}
                            </select>
                        </div>
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Cover" id="floatingTextarea2" style={textareaStyle} value={poster} onChange={(e)=> setPoster(e.target.value)}></textarea>
                            <label for="floatingTextarea2">Poster Image URL</label>
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
export default Films;