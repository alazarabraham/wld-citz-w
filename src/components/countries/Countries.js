import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {BsBook} from 'react-icons/bs';
import {CgFilm} from 'react-icons/cg';
import {GiSpellBook, GiBlackBook, GiGreekTemple} from 'react-icons/gi';
import {BsPencilSquare} from 'react-icons/bs';
import { useSnackbar } from 'material-ui-snackbar-provider'
import { set } from 'react-hook-form';

function Countries({userId}){
    const snackbar = useSnackbar();
    const [countries, setCountries] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [flag, setFlag] = useState("");
    const [languageId, setLanguageId] = useState("");
    const [language, setLanguage] = useState("");

    const [capital, setCapital] = useState("");
    const [bannerImg, setBannerImg] = useState("");
    const [languages, setLanguages] = useState([]);

    const getCountries = () =>{
        axios.get(`http://localhost:8080/countries/getAllCountryInfo`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setCountries(response.data);
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
    useEffect(()=> getCountries(), []);
    useEffect(()=> getLanguages(), []);

    function setCountryFields(country){
        console.log(country)
        setId(country.id);
        setName(country.name);
        setFlag(country.flag);
        setCapital(country.capital);
        setLanguageId(country.language_id);
        setBannerImg(country.banner_img);
        setLanguage(country.language);
    }

    function getBannerStyle(url){
        return {
            height: "190px",
            backgroundImage: `url(${url})`, 
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        }
    }
    const updateCountrySubmit = (e)=>{
        e.preventDefault();
        console.log({
            id:id,  
            name: name,
            flag: flag,
            language_id: languageId,
            capital: capital,
            banner_img: bannerImg
        })
        if(userId != undefined){
            setErrorMsg("");
            axios.put("http://localhost:8080/countries/editCountry", {
                id:id,  
                name: name,
                flag: flag,
                language_id: languageId,
                capital: capital,
                banner_img: bannerImg
            }).then(function(response){
                console.log(response);
                setCountries([]);
                getCountries();
                document.getElementById('closeUpdateCountryModal').click();
                snackbar.showMessage("Country successfully updated");

            }).catch(function(error){
                console.log(error);
            });
        }else if(userId == undefined){
            setErrorMsg(<small className="text-danger text-center mt-3">Please login to make changes</small>)
        }
    };
    const cardStyle={width: "100%", height:"380px"};
    const cardBodyStyle={height:"65%"};
    const cardCountryNameStyle={height: "30%"}
    const imageContainerStyle = { background: "white",height: "70px", width: "70px", borderRadius: "50%", overflow: "hidden"};
    const textareaStyle = {height: "100px"};

    return(
        <div className="row justify-content-center mb-5">
            
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mb-5">
                <h4 className="fs-2">Countries</h4>
                <small>Explore different country's books, films, history and user posts</small>
                <div className="row justify-content-center mt-4">
                    {countries.map((country, i)=>(
                    <div className="col-10 col-sm-6 col-md-6 col-lg-4 col-xl-4 mt-3" align="center">
                        <div className="card border border-rounded position-relative" style={cardStyle}>
                            <div style={getBannerStyle(country.banner_img)} className="d-flex align-items-end justify-content-center ">
                                <div style={imageContainerStyle} className="d-flex align-items-center justify-content-center">
                                    <img src={country.flag}  height="40" width="65" />
                                </div>
                            </div>
                            <div className='position-absolute w-100'>
                            <a className="text-decoration-none text-white float-end px-2 py-1" type="button" data-bs-toggle="modal" data-bs-target="#updateCountryModal" onClick={(e)=> setCountryFields(country)}><BsPencilSquare/></a>
                            </div>
                            <div className="card-body" style={cardBodyStyle}>
                                <div style={cardCountryNameStyle}>
                                    <small className="lead d-block">
                                        <Link to={`/country/${country.id}`} className="text-decoration-none link-dark" >
                                            {country.name}
                                        </Link>
                                    </small>
                                </div>
                                <div className="mt-2">
                                    <div className="row">
                                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4"> 
                                            <BsBook size={20}/>
                                            <small className="d-block mt-2">{country.total_books}</small>
                                        </div>
                                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4"> 
                                            <CgFilm size={20}/>
                                            <small className="d-block mt-2">{country.total_films}</small>
                                        </div>
                                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4"> 
                                            <GiGreekTemple size={20}/>
                                            <small className="d-block mt-2">{country.total_history_topics}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            <div className="my modals">
                {/* Edit Country modal */}
                <div className="modal fade" tabindex="-1" role="dialog" id="updateCountryModal" aria-hidden="true">
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content rounded-5 shadow">
                            <div className="modal-header p-5 pb-4 border-bottom-0">
                                <h2 className="fw-bold mb-0 d-block">Edit Country</h2>
                                <button type="button" className="btn-close" id="closeUpdateCountryModal" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="px-5 pb-4">
                            <small className="d-block">See any issues? Help us keep our data up to date</small>
                            </div>
                            <div className="modal-body p-5 pt-0">
                                <form className="" onSubmit={updateCountrySubmit} >
                                <div className="form-floating mb-3">
                                    <input type="hidden" className="form-control rounded-4" id="floatingInput" placeholder="Country Name" value={id} onChange={(e)=> setId(e.target.value)}/>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control rounded-4" id="floatingInput" placeholder="Country Name" value={name} onChange={(e)=> setName(e.target.value)}/>
                                    <label for="floatingInput">Country Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control rounded-4" id="floatingInput" placeholder="Capital" value={capital} onChange={(e)=> setCapital(e.target.value)}/>
                                    <label for="floatingInput">Country Capital</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <select defaultValue="Select Language" className="form-select" aria-label="Default select example" value={languageId} onChange={(e)=> setLanguageId(e.target.value)}>
                                        <option  selected value={languageId}>{language}</option>
                                        {languages.map((language, i)=>(
                                        <option value={language.id}>{language.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <label className='form-label'>Flag Image URL</label>
                                <div class="input-group mb-3">
                                    <textarea style={textareaStyle} class="form-control" aria-label="With textarea" value={flag} onChange={(e)=> setFlag(e.target.value)}></textarea>
                                    <span class="input-group-text" id="basic-addon2"><img className='px-2' src={flag} width="45"/></span>
                                </div>
                                <label className='form-label'>Banner Image URL</label>
                                <div class="input-group">
                                    <textarea style={textareaStyle} class="form-control" aria-label="With textarea" value={bannerImg} onChange={(e)=> setBannerImg(e.target.value)}></textarea>
                                    <span class="input-group-text"> <img className='px-2' src={bannerImg} width="100"/></span>
                                </div>
                                {errorMsg}
                                <button className="w-100 mb-2 btn btn-lg rounded-4 btn-dark mt-3" type="submit">Save</button>                   
                                </form>
                            </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}
export default Countries;