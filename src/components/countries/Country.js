import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import {GrLanguage} from 'react-icons/gr';
import {AiFillStar} from 'react-icons/ai';
import Carousel from "react-multi-carousel";

function Country(){
    const {id} = useParams();

    const [country, setCountry] = useState([]);
    const [countryBooks, setCountryBooks] = useState([]);
    const [countryFilms, setCountryFilms] = useState([]);

    const getCountry = () =>{
        axios.get(`http://localhost:8080/countries/getAllCountryInfoById/${id}`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setCountry(response.data[0]);
        }).catch(function(error){
            console.log(error);
        })
    }

    const getCountryBooks = () =>{
        axios.get(`http://localhost:8080/countries/getAllBooksByCountryId/${id}`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setCountryBooks(response.data);
        }).catch(function(error){
            console.log(error);
        })
    }

    const getCountryFilms = () =>{
        axios.get(`http://localhost:8080/countries/getAllFilmsByCountryId/${id}`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setCountryFilms(response.data);
        }).catch(function(error){
            console.log(error);
        })
    }
    useEffect(()=> getCountry(), []);
    useEffect(()=> getCountryBooks(), []);
    useEffect(()=> getCountryFilms(), []);


    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 2
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 2
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

      const imageStyle = {maxWidth: "160px"};
      const imageDivStyle = {maxWidth: "400px",maxHeight: "400px"};


    return(
        
        <div className="row justify-content-center mb-5">
            
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mb-5">
                <h4 className="fs-2">Countries</h4>
                <small>Explore <span className="fw-bold">{country.name}'s</span> books, films, and history</small>
                <nav aria-label="breadcrumb mt-4">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/countries" className="text-decoration-none link-dark">Countries</a></li>
                        <li class="breadcrumb-item active" aria-current="page">{country.name}</li>
                    </ol>
                </nav>
                <div className="row justify-content-center mt-4">
                    <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-4 mt-4">
                        <small className="display-3 d-block">{country.name}</small>
                        <small className="d-block fs-6"><AiFillStar/> {country.capital}</small>
                        <small className="d-block fs-6"><GrLanguage/> {country.language}</small>
                    </div>
                    <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-4" style={imageDivStyle}>
                        <img src={country.flag} className="w-100 mw-100 "/>
                    </div>
                </div>
                <h1 className="lead mt-4">{countryBooks.length > 0 ? `Books from ${country.name} (${countryBooks.length})` :`No Books from ${country.name} (0)`} </h1>
                <div className="row justify-content-center">
                    <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                    <Carousel className="mt-4 d-flex" responsive={responsive}>
                        {countryBooks.map((countryBook, i)=>(
                            <Link to={`/book/${countryBook.id}`}><img src={countryBook.cover} height="250" style={imageStyle}/></Link>
                        ))}
                    </Carousel>
                    </div>
                </div>
   
                <h1 className="lead mt-4">{countryFilms.length > 0 ? `Films from ${country.name} (${countryFilms.length})` : `No Films from ${country.name} (0)`} </h1>
                <div className="row justify-content-center">
                    <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                    <Carousel className="mt-4 d-flex" responsive={responsive}>
                        {countryFilms.map((countryFilm, i)=>(
                            <Link to={`/film/${countryFilm.id}`}><img src={countryFilm.poster} height="250" style={imageStyle}/></Link>
                        ))}
                    </Carousel>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Country;