import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Footer from "../components/Footer";


function Account({user}) {
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState({});
  const [select, setSelect] = useState(false);

  const [title1, setTitle1] = useState("");
  const [image1, setImage1] = useState("");
  const [content1, setComment1] = useState("");

  const [title2, setTitle2] = useState("");
  const [image2, setImage2] = useState("");
  const [content2, setComment2] = useState("");

  const [title3, setTitle3] = useState("");
  const [image3, setImage3] = useState("");
  const [content3, setComment3] = useState("");

  const history = useHistory();
  
  
  useEffect(() => {
    fetch("/api/pages")
      .then((r) => r.json())
      .then(setPages);
  }, []);

  function loadPage(id) {
    fetch(`/api/pages/${id}`)
    .then((r) => r.json())
    // .then(    (fetched_page) => { setPage(fetched_page) }     )
    .then( (fetched_page) => { 
      
        setPage(fetched_page) // visual

        setTitle1(fetched_page.title1) // title : for the form
        setImage1(fetched_page.image1)
        setComment1(fetched_page.content1) // content :for the form

        setTitle2(fetched_page.title2) // title : for the form
        setImage2(fetched_page.image2)
        setComment2(fetched_page.content2) // content :for the form

        setTitle3(fetched_page.title3) // title : for the form
        setImage3(fetched_page.image3)
        setComment3(fetched_page.content3) // content :for the form
    
    })
    .then(()=>{setSelect(true)})



    // .then(setPage)
    // .then(setPage, setComment)
    // .then()   ->     f()
    // .then()   ->     f( ff )   ->   f()  >   ff("hi")
    // .then()   ->     f( ff() ) X
    ////  fuction f(){  return "hi" }
    ////  function ff(whatDidTheySay){ return whatDidTheySay }
    // .then(console.log(page))
  }

  function handleDelete(id , directory) {
    fetch(`/api/pages/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        directory, title1, image1, content1, title2, image2, content2, title3, image3, content3
      })
    })
  }

  function refreshFront(id){
    const newPageArray = pages.filter(item => item.id !== id);
    setPages([...newPageArray])
    setPage({})
  }

  function handleUpdate(id , directory) {

    fetch(`/api/pages/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        directory, title1, image1, content1, title2, image2, content2, title3, image3, content3
      })
    })
  };

  

  // if (!user) {
  //   history.push('/signup');
  // }




  return (
<div className="page1">
    <h1>My pages</h1>
<div>
  <div className="user">user: {user ? (user.email) : ("")}</div>
        <Link className="link1" as={Link} to="/new">
          Create new page
        </Link>
        
        </div>


    {/* {!pages.length ? ("") : ("")} */}
    
    {user ? (<>

    
      {
        pages.map((page) => (<div className="tinypage">
          <div className="edittitle">{page.title1}    </div> 
                <Link key={page.id} className="link1" onClick={() => loadPage(page.id)}>edit</Link>
                <a className="link1" target="_blank" href={page.directory}>visit</a>
                <button className="link1" onClick={() => {
                  handleDelete(page.id , page.directory);
                  refreshFront(page.id);
                }}>delete</button>
                </div>
                ))
      }

 

{select ? (



  <>
     <hr/>
    <h1>{page.title1}</h1>

    <form className="form1">
        

      <label htmlFor="title1">title <span className="blue">*required</span></label>
      <input
        type="text"
        id="title1"
        value={title1}
        onChange={(e) => setTitle1(e.target.value)}
      />
      <label htmlFor="image">image url - <a target="_blank" href="https://www.wikihow.com/Get-the-URL-for-Pictures">get an image url</a></label>
      <input
        type="text"
        id="image1"
        value={image1}
        onChange={(e) => setImage1(e.target.value)}
      />
      <img className="imageform" src={image1}/>
      <label htmlFor="content1">text <span className="blue">*required</span></label>
      <textarea
        id="content1"
        rows="5"
        value={content1}
        onChange={(e) => setComment1(e.target.value)}
      />

      <label htmlFor="title2">title</label>
      <input
        type="text"
        id="title2"
        value={title2}
        onChange={(e) => setTitle2(e.target.value)}
      />
      <label htmlFor="image2">image url</label>
      <input
        type="text"
        id="image2"
        value={image2}
        onChange={(e) => setImage2(e.target.value)}
      />
      <img className="imageform" src={image2}/>
      <label htmlFor="content2">text</label>
      <textarea
        id="content2"
        rows="5"
        value={content2}
        onChange={(e) => setComment2(e.target.value)}
      />

      <label htmlFor="title3">title</label>
      <input
        type="text"
        id="title3"
        value={title3}
        onChange={(e) => setTitle3(e.target.value)}
      />
      <label htmlFor="image3">image url</label>
      <input
        type="text"
        id="image3"
        value={image3}
        onChange={(e) => setImage3(e.target.value)}
      />
      <img className="imageform" src={image3}/>
      <label htmlFor="content3">text</label>
      <textarea
        id="content3"
        rows="5"
        value={content3}
        onChange={(e) => setComment3(e.target.value)}
      />

      <br />

      <button className="link1" onClick={() => handleUpdate(page.id , page.directory)}>Save</button>

    </form>
  
    


      </>) : ("")}
      </>) : (<span className="blue">You must be logged in to see your pages...</span>)}
<Footer />
</div>

  );
}

export default Account;
