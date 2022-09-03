import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import {GrLanguage} from 'react-icons/gr';
import {AiFillStar, AiOutlineHeart, AiOutlinePlusCircle} from 'react-icons/ai';
import {FaRegComment} from 'react-icons/fa';
import ReactStars from "react-rating-stars-component";
import StarRatings from 'react-star-ratings';
import {BiTrash} from 'react-icons/bi';
import { BsHeartFill } from 'react-icons/bs';
import { useSnackbar } from 'material-ui-snackbar-provider';

function HistoryTopic({userId}){
    const snackbar = useSnackbar();
    const {id} = useParams();

    const [historyTopic, setHistoryTopic] = useState([]);
    const [historyTopicComments, setHistoryTopicComments] = useState([]);
    const [historyTopicLike, setHistoryTopicLike] = useState([]);

    const [errorMsg, setErrorMsg] = useState("");

    //add comment fields
    const [user_id, setUser_id] = useState("");
    const [comment, setComment] = useState("");

    const likeButtonStyle = {color: "red"};
    const getHistoryTopic = () =>{
        axios.get(`http://localhost:8080/historyTopics/getAllHistoryTopicInfoById/${id}`, {withCredentials: true})
        .then(function(response){
            console.log(response.data);
            setHistoryTopic(response.data[0]);
        }).catch(function(error){
            console.log(error);
        })
    }
    
    const getHistoryTopicComments = () =>{
        axios.get(`http://localhost:8080/historyTopicComments/getAllCommentsByHistoryTopicId/${id}`, {withCredentials: true})
        .then(function(response){
            setHistoryTopicComments(response.data);
        }).catch(function(error){
            console.log(error);
        })
    }

    const getHistoryTopicLikeByUserId = () =>{
        console.log(userId)
        if(userId !=null && userId != undefined){
        axios.get(`http://localhost:8080/historyTopicLikes/getHistoryTopicLikeByUserId/${id}/${userId}`)
        .then(function(response){
            console.log(response.data);
            if(response.data.length == 0){
                setHistoryTopicLike(response.data);
            }else{
                setHistoryTopicLike(response.data);
            }
        }).catch(function(error){
            console.log(error);
        })
    }
    }
    useEffect(()=> getHistoryTopic(), []);
    useEffect(()=> getHistoryTopicComments(), []);
    useEffect(()=> {
        if(userId !=null && userId != undefined){
            axios.get(`http://localhost:8080/historyTopicLikes/getHistoryTopicLikeByUserId/${id}/${userId}`)
            .then(function(response){
                if(response.data.length == 0){
                    setHistoryTopicLike(response.data);
                }else{
                    setHistoryTopicLike(response.data);
                }
            }).catch(function(error){
                console.log(error);
            })
        }
    });

    function getLikeButton(){
        if(userId !=null && userId != undefined){
            if(historyTopicLike.length== 0){
                return <a onClick={()=>{
                    axios.post("http://localhost:8080/historyTopiclikes/addHistoryTopicLike", {
                        user_id: userId, 
                        history_topic_id: id, 
                        history_topic_like: 1
                    })
                    .then(function(response){
                        console.log(response);
                        setHistoryTopicLike([]);
                        getHistoryTopicLikeByUserId();
                    }).catch(function(error){
                        console.log(error);
                    });
                }} 
                
                type="button" className="text-decoration-none text-dark float-end"><AiOutlineHeart/></a>
            }else if(historyTopicLike.length > 0){
                if(historyTopicLike[0].history_topic_like == 1){
                return <a onClick={()=>{
                    console.log(`http://localhost:8080/historyTopiclikes/updateHistoryTopicLike/${historyTopicLike[0].id}/${historyTopicLike[0].history_topic_id}`)

                    axios.put(`http://localhost:8080/historyTopiclikes/updateHistoryTopicLike/${historyTopicLike[0].id}/${historyTopicLike[0].history_topic_id}`, {
                        history_topic_like: 0
                    })
                    .then(function(response){
                        setHistoryTopicLike([]);
                        getHistoryTopicLikeByUserId();
                        console.log(response);
                    }).catch(function(error){
                        console.log(error);
                    });
                }} 
                
                type="button" className="text-decoration-none text-dark float-end"><BsHeartFill style={likeButtonStyle}/></a>
            }else if(historyTopicLike[0].history_topic_like == 0){
                return <a onClick={()=>{
                    console.log(`http://localhost:8080/historyTopiclikes/updateHistoryTopicLike/${historyTopicLike[0].id}/${historyTopicLike[0].history_topic_id}`)
                    axios.put(`http://localhost:8080/historyTopiclikes/updateHistoryTopicLike/${historyTopicLike[0].id}/${historyTopicLike[0].history_topic_id}`, {
                        history_topic_like: 1
                    })
                    .then(function(response){
                        console.log(response);
                        setHistoryTopicLike([]);
                        getHistoryTopicLikeByUserId();
                    }).catch(function(error){
                        console.log(error);
                    });
                }} 
                
                type="button" className="text-decoration-none text-dark float-end"><AiOutlineHeart /></a>
            }
            }
        }
    }



    function isPlural(num){
        if(num == 1){
            return "";
        }else{
            return "s";
        }
    }

    function convertTime(time){
        var newTime = new Date(time);
        const realTime = newTime.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})
        return realTime;
    }
    
    //handle submits
    const addHistoryTopicCommentSubmit = (e)=>{
        e.preventDefault();
        if(userId != undefined){
        setErrorMsg("");
        console.log({
            user_id: userId,
            history_topic_id: id,
            comment: comment
        });
        axios.post("http://localhost:8080/historyTopicComments/addHistoryTopicComment", {
            user_id: userId,
            history_topic_id: id,
            comment: comment
        }).then(function(response){
            console.log(response);
            setHistoryTopicComments([]);
            getHistoryTopicComments();

            document.getElementById('closeHistoryTopicCommentModal').click();
            snackbar.showMessage("Comment successfully posted");
        }).catch(function(error){
            console.log(error);
        });
    }else if(userId == undefined){
        setErrorMsg(<small className="text-danger text-center mt-3">Please login to add a comment</small>)
    }
    };

   let deleteButton;
   function deleteComment(id, history_topic_id){
   if(userId != undefined && userId != null){
       if(userId == id){
       deleteButton = <a type="button"
       onClick={()=>{
           axios.delete(`http://localhost:8080/historyTopicComments/deleteHistoryTopicComment/${history_topic_id}`)
           .then(function(response){
               console.log(response);
               setHistoryTopicComments([]);
               getHistoryTopicComments();
               snackbar.showMessage("Comment successfully deleted");

           })
           .catch(function(error){
               console.log(error);
           })
       }}
       ><BiTrash/></a>

       return deleteButton;
        }
   }
}


function commentsIsEmpty(){
    if(historyTopicComments.length == 0){
        return (
        <div className="col-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 mt-4" align="center">
            <div className="row justify-content-center mt-4">
            <small>There are no comments for this historical topic</small>
            </div>
        </div>
        )
    }
}
    const textareaStyle = {height: "100px"};

    return(
        <div>
        <div className="row justify-content-center">
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                <h4 className="fs-2">Historical Topics</h4>
                {/* <small>{historyTopic.first_name} {historyTopic.last_name}'s <span className="fw-bold">{historyTopic.name}</span></small> */}
                <nav aria-label="breadcrumb mt-4">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/historytopics" className="text-decoration-none link-dark">Historical Topics</a></li>
                        <li class="breadcrumb-item active" aria-current="page">{historyTopic.name}</li>
                    </ol>
                </nav>
            </div>
            <div className="col-10 col-sm-12 col-md-10 col-lg-10 col-xl-10 ">
                <div className="row justify-content-center mt-4">
                    <div className="col-10 col-sm-10 col-md-10 col-lg-12 col-xl-10 mt-4 order-2 order-sm-2 order-md-1 order-lg-1 order-xl-1">
                        <small className="lead">{historyTopic.name}</small>
                        <small className="d-block"><Link className="link-dark text-decoration-none fw-bold" to={`/country/${historyTopic.country_id}`}>{historyTopic.country_name}</Link> <img src={historyTopic.flag} width="20"/></small>
                        <small className="d-block">Posted by: <Link to={`/profile/${historyTopic.userId}`} className="text-decoration-none text-dark fw-bold">{historyTopic.username}</Link></small>
                        <small className="d-block">{convertTime(historyTopic.created_at)}</small>
                        {getLikeButton()}
                        {/* <small className="d-block fw-bold">{historyTopic.first_name} {historyTopic.last_name}</small> */}
                        <small className="d-block">{historyTopic.description}</small>
                        {/* <small className="d-blockmt-4"><GrLanguage/> {historyTopic.language}</small> */}
                    </div>
                </div>
            </div>
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mt-4">
                <div className="row justify-content-end mt-4">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#addCommentModal"><FaRegComment className="mb-1"/> Comment</button>
                    </div>
                </div> 
            </div>
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mt-4 mb-4">
                <div className="row justify-content-center mt-4">
                    <div className="col-10 col-sm-10 col-md-8 col-lg-8 col-xl-8 mt-4">
                        <small className="lead">Comments</small>
                        {commentsIsEmpty()}
                        {historyTopicComments.map((historyTopicComment, i)=>(
                        <div class="row justify-content-center mt-4">
                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-1 " align="center">
                                <img src={historyTopicComment.avatar} height="30" width="30" className="rounded-circle"/>
                            </div>
                            <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                <p className="fw-bold d-inline">{historyTopicComment.username} </p>
                                <small className="px-2">{convertTime(historyTopicComment.created_at)}</small>
                                <small class="d-block">{historyTopicComment.comment}</small>
                            </div>
                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-1 " align="center">
                               {deleteComment(historyTopicComment.userId, historyTopicComment.id)}
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            
        </div>
            <div className="my modals">
                {/* Add comment modal */}
                <div className="modal fade" tabindex="-1" role="dialog" id="addCommentModal" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content rounded-5 shadow">
                            <div className="modal-header p-5 pb-4 border-bottom-0">
                                <h2 className="fw-bold mb-0 d-block">Add Comment</h2>
                                <button type="button" className="btn-close" id="closeHistoryTopicCommentModal" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="px-5 pb-4">
                            <small className="d-block">Familiar with this topic? Comment and share your thoughts</small>
                            </div>
                            <div className="modal-body p-5 pt-0">
                                <form className="" onSubmit={addHistoryTopicCommentSubmit} >
                                <div class="form-floating">
                                    <textarea class="form-control" placeholder="Commnet" id="floatingTextarea2" style={textareaStyle} value={comment} onChange={(e)=> setComment(e.target.value)}></textarea>
                                    <label for="floatingTextarea2">Comment</label>
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
export default HistoryTopic;