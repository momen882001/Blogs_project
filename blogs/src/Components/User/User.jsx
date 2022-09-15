import React, {useEffect,useState} from 'react'
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import axios from '../API/axios'
import './User.css'
import shopping from '../assets/pexels-cottonbro-4068314.jpg'
import art from '../assets/pexels-daian-gan-102127.jpg'
import travel from '../assets/pexels-sheila-731217.jpg'
import development from '../assets/pexels-lukas-574071.jpg'
import sports from '../assets/pexels-pixabay-235922.jpg'
import { Link } from "react-router-dom";
import swal from 'sweetalert';


function User() {

    const [data,setData] = useState([]);
    // const [isReadMore,setReadMore] = useState(false);

    // const toggle = () => {
    //     setReadMore(!isReadMore)
    //     console.log(isReadMore)
    // }
    
    useEffect(() => {
       axios.get(`/blog/?userId=${localStorage.getItem("user_id")}`)
       .then((response) => {
           console.log("Getting data", response.data)
           setData(response.data)
           console.log(response)
       }).catch((err) => {
           console.log(err)
       })
    }, [])


    const Delete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this blog again!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal( axios.delete(`/blog/${id}`, {
                headers:{
                    "auth-token" : localStorage.getItem("auth-token")
                }
            })
        .then((response) => {
            console.log("Deleting data", response)
            console.log(id)
            window.location.reload();
        }).catch((err) => {
            // if(err === 500)
            console.log(err.respons.data.status)
        }), {
                icon: "success",
              });
            } else {
              swal("Your blog is safe!",{
                icon: "success",
              });
            }
          });
    }

    const Clear = () => {

        swal({
            title: "Are you sure?",
            text: "Once deleted,you will not be able to recover your blogs again!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal(axios.delete('/blog', {
                headers:{
                    "auth-token" : localStorage.getItem("auth-token")
                }
            })
        .then((response) => {
            console.log("Clearing data", response)
            window.location.reload();
        }).catch((err) => {
            // if(err === 500)
            console.log(err.respons.data.status)
        }), {
                icon: "success",
              });
            } else {
              swal("Your blogs is safe!", {
                icon: "success",
              });
            }
          });
    }

  

    const arr = data.map((data,index) => {
        console.log(index)
        return(
            <>
            
            <Col  key={index}  id="user-column" className="col-4" xs={12} sm={6} md={6} lg={4}  >
                <div className="card-contain">
                 <Card className="user-card" style={{height:"100%",}}>
                 <div className="overflow">
                   { data.category === "Shopping" ? (<Card.Img  className="card-img-top" variant="top" src={shopping} style={{height:"12rem"}} />) 
                   : data.category === "Art" ? (<Card.Img className="card-img-top"  variant="top" src={art} style={{height:"12rem"}}/>) 
                   : data.category === "Development" ? (<Card.Img className="card-img-top" variant="top" src={development} style={{height:"12rem"}}/>)
                   : data.category === "Sports" ? (<Card.Img className="card-img-top" variant="top" src={sports} style={{height:"12rem"}}/>)
                   : data.category === "Travel" ? (<Card.Img className="card-img-top" variant="top" src={travel} style={{height:"12rem"}}/>)
                   : null}
                   </div>
                   <Card.Header>{data.title}</Card.Header>
                   <Card.Body className="text-dark" >
                   <Card.Title >{data.category}</Card.Title>
                   <Card.Text>
                    {data.body.substr(0,50)}
                    <Link to={`/blog/readmore/${data._id}`}>
                   <div className="btn" style={{ paddingLeft: "5px", border: "transparent" }}>... Read More</div>
                   </Link>
                   </Card.Text>
                   <div className="buttons-contain">
                   <div className="btn btn-outline-danger" onClick={() => Delete(data._id)}>Delete</div>
                   <Link to={`/blog/edit/${data._id}`} >   
                   <div className="btn btn-outline-primary">Edit</div>
                   </Link>
                   </div>
                   </Card.Body>
                 </Card>
                 </div>
                 </Col>

            
            
            </>
        )
    })
    console.log(arr)

    return (
        <div className="user-contain" style={{width:"100%"}}>
            <nav className="navbar">
            <div className="container">
            <h3 className="logo">My-Blogs</h3>

            <ul className="nav-links">
                <Link to="/blog" style={{textDecoration:"none"}}><li style={{color:"rgba(11,83,148,1)"}}>Add-Blog</li></Link>
                <Link to="" style={{textDecoration:"none"}} onClick={() => Clear()}><li style={{color:"rgba(11,83,148,1)"}}>Clear</li></Link>
                <Link to="/" style={{textDecoration:"none"}}><li style={{color:"rgba(11,83,148,1)"}}>Home</li></Link>
            </ul>
            </div>
            </nav>

            <h2 className="author">Welcome, {localStorage.getItem("author")}</h2>

        <Row style={{margin : "0", padding:"0" }}>
        <div className="div-user-row">
            {arr}
        </div>
        </Row>
        </div>
    )
}


export default User
