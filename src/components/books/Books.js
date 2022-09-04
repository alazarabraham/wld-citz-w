import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {BsBook, BsHeartFill} from 'react-icons/bs';
import {IoPersonOutline} from 'react-icons/io5';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {BiFilterAlt} from 'react-icons/bi';
import { useSnackbar } from 'material-ui-snackbar-provider'

function Books({userId}){
    const snackbar = useSnackbar()
    const [books, setBooks] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [countries, setCountries] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [filterMsg, setFilterMsg] = useState("");

    //author form fields 
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");

    //book form fields 
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [release_year, setRelease_year] = useState("");
    const [language_id, setLanguage_id] = useState("");
    const [author_id, setAuthor_id] = useState("");
    const [country_id, setCountry_id] = useState("");
    const [cover, setCover] = useState("");

  

    const getBooks = () =>{
        axios.get(`http://localhost:8080/books/getAllBookInfo`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setBooks(response.data);
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
    const getAuthors = () =>{
        axios.get(`http://localhost:8080/authors/getAllAuthors`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setAuthors(response.data);
        }).catch(function(error){
            console.log(error);
        })
    }

    useEffect(()=> getBooks(), []);
    useEffect(()=> getLanguages(), []);
    useEffect(()=> getCountries(), []);
    useEffect(()=> getAuthors(), []);

    //handle submits
    const addAuthorSubmit = (e)=>{
        e.preventDefault();
        console.log({
            first_name: first_name,
            last_name: last_name
        });
        axios.post("http://localhost:8080/authors/addAuthor", {
            first_name: first_name,
            last_name: last_name
        }).then(function(response){
            console.log(response);
            setAuthors([]);
            getAuthors();
            document.getElementById('closeAuthorModal').click();
            snackbar.showMessage("Author successfully added");
        }).catch(function(error){
            console.log(error);
        });
    };
    const addBookSubmit = (e)=>{
        e.preventDefault();
        if(userId != undefined){
            setErrorMsg("");
            axios.post("http://localhost:8080/books/addBook", {
                title: title,
                description: description,
                release_year: release_year,
                language_id: language_id,
                author_id: author_id,
                user_id: userId,
                country_id: country_id,
                cover: cover
            }).then(function(response){
                console.log(response);
                setBooks([]);
                getBooks();
                document.getElementById('closeBookModal').click();
                snackbar.showMessage("Book successfully added");

            }).catch(function(error){
                console.log(error);
            });
        }else if(userId == undefined){
            setErrorMsg(<small className="text-danger text-center mt-3">Please login to add a book</small>)
        }
    };


    function isPlural(num){
        if(num == 1){
            return "";
        }else{
            return "s";
        }
    }

    const filterByAuthor = (e) => {
        setFilterMsg("");
        if(e.target.value == "reset"){
            getBooks();
        }else{
            let id = parseInt(e.target.value);
            axios.get(`http://localhost:8080/books/getAllBookInfoByAuthor/${id}`, {withCredentials: true})
            .then(function(response){
                console.log(response.data);
                if(response.data.length == 0){
                    setFilterMsg(
                    <div className="col-10 col-sm-10 col-md-8 col-lg-6 col-xl-6 mt-4" align="center">
                        <small class="text-center mt-4">There are no books for this author</small>
                    </div>
                    )}
                setBooks(response.data);
            }).catch(function(error){
                console.log(error);
            })
        }
    }

    const filterByCountry = (e) => {
        setFilterMsg("");
        if(e.target.value == "reset"){
            getBooks();
        }else{
            let id = parseInt(e.target.value);
            axios.get(`http://localhost:8080/books/getAllBookInfoByCountry/${id}`, {withCredentials: true})
            .then(function(response){
                console.log(response.data);
                if(response.data.length == 0){
                    setFilterMsg(
                    <div className="col-10 col-sm-10 col-md-8 col-lg-6 col-xl-6 mt-4" align="center">
                        <small class="text-center mt-4">There are no books for this country</small>
                    </div>
                    )}
                setBooks(response.data);
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
                <h4 className="fs-2">Books</h4>
                <small>Explore unique books posted by our users</small>
            </div>
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                <div className="row justify-content-end mt-4">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#addAuthorModal"><AiOutlinePlusCircle className="mb-1"/> Add Author</button>
                        <button className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#addBookModal"><AiOutlinePlusCircle className="mb-1"/> Add Book</button>
                    </div>
                </div> 
            </div>
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                <div className="row justify-content-end mt-4">
                    <div class="d-grid gap-2 d-flex justify-content-end">
                        <small class="mt-2">Filter <BiFilterAlt/></small>
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            <select onChange={filterByAuthor} class="form-select" aria-label="Default select example" >
                                <option selected>By Author</option>
                                <option value="reset">All Authors</option>
                                {authors.map((author, i)=>(
                                <option value={author.id}>{author.first_name} {author.last_name}</option>
                                ))}
                            </select>
                        </div>
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
            <div className="col-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 mt-3">
            <div className="row justify-content-center">
                {filterMsg}
            {books.map((book, i)=>(
                    <div className="col-10 col-sm-10 col-md-8 col-lg-6 col-xl-6 mt-3">
                        <div class="card mt-4" style={cardStyle}>
                            <div class="card-body">
                                <div className="row">
                                    <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                        <small className="lead"><Link className="link-dark text-decoration-none fw-bold" to={`/book/${book.id}`}>{book.title}</Link></small>
                                        <small className="d-block">{book.first_name} {book.last_name}</small>
                                        <small className="d-block">{book.language}</small>
                                        <small className="d-block">{book.release_year}</small>
                                        <small className="d-block"><Link className="link-dark text-decoration-none fw-bold" to={`/country/${book.country_id}`}>{book.country_name}</Link> <img src={book.flag} width="20"/></small>

                                        {/* <div style={descriptionStyle} className="overflow-scroll">
                                            <small className="d-block mt-2">{book.description}</small>
                                        </div> */}
                                        <small className="d-block">Posted by: <span className="fw-bold"><Link className="link-dark" to={`/profile/${book.userId}`}>{book.username}</Link></span></small>
                                        <small className="d-block"><BsHeartFill className="text-danger"/> {book.total_likes} like{isPlural(book.total_likes)}</small>

                                    </div>
                                    <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" align="center">
                                        <img src={book.cover} height="250" />
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
        {/* Add author modal */}
        <div className="modal fade" tabindex="-1" role="dialog" id="addAuthorModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content rounded-5 shadow">
                    <div className="modal-header p-5 pb-4 border-bottom-0">
                        <h2 className="fw-bold mb-0"><IoPersonOutline className="mb-2"/> Add Author</h2>
                        <button type="button" className="btn-close" id="closeAuthorModal" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body p-5 pt-0">
                        <form className="" onSubmit={addAuthorSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control rounded-4" id="floatingInput" placeholder="First name" value={first_name} onChange={(e)=> setFirst_name(e.target.value)}/>
                            <label for="floatingInput">First name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control rounded-4" id="floatingInput" placeholder="Last name" value={last_name} onChange={(e)=> setLast_name(e.target.value)}/>
                            <label for="floatingInput">Last name</label>
                        </div>
                        <button className="w-100 mb-2 btn btn-lg rounded-4 btn-dark" type="submit">Save</button>                   
                        </form>
                    </div>
                    </div>
                </div>
        </div>
        {/* Add book modal */}
        <div className="modal fade" tabindex="-1" role="dialog" id="addBookModal" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content rounded-5 shadow">
                    <div className="modal-header p-5 pb-4 border-bottom-0">
                        <h2 className="fw-bold mb-0"><BsBook className="mb-2"/> Add Book</h2>
                        <button type="button" className="btn-close" id="closeBookModal" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body p-5 pt-0">
                        <form className="" onSubmit={addBookSubmit}>
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
                            <select defaultValue="Select Author" className="form-select" aria-label="Default select example" value={author_id} onChange={(e)=> setAuthor_id(e.target.value)}>
                                <option value="Select Author" selected>Select Author</option>
                                {authors.map((author, i)=>(
                                <option value={author.id}>{author.first_name} {author.last_name}</option>
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
                            <textarea class="form-control" placeholder="Cover" id="floatingTextarea2" style={textareaStyle} value={cover} onChange={(e)=> setCover(e.target.value)}></textarea>
                            <label for="floatingTextarea2">Cover Image URL</label>
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
export default Books;