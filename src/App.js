import Header from "./Header";
import About from "./About";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Footer from "./Footer";
import Missing from "./Missing";
import {Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";

function App() {
  const [posts,setPosts]=useState([
    {
      id: 1,
      title: "My first post",
      datetime: "July 1",
      body: "Made a video"
    },
    {
      id: 2,
      title: "My second post",
      datetime: "August 1",
      body: "Made a blog"
    },
    {
      id: 3,
      title: "My third post",
      datetime: "September 1",
      body: "Made a craft"
    },
    {
      id: 4,
      title: "My fourth post",
      datetime: "October 1",
      body: "Made a million dollars"
    }
  ])
  const [search,setSearch]=useState('')
  const [searchResults,setSearchResults]=useState([])
  const [postTitle,setPostTitle]=useState('');
  const [postBody,setPostBody]=useState('');
  const navigate=useNavigate();   

  useEffect(()=>{
    const filteredResults=posts.filter((post)=>
    ((post.body).toLowerCase()).includes(search.toLowerCase())
    || ((post.title).toLowerCase()).includes(search.toLowerCase()))

    setSearchResults(filteredResults.reverse())
  },[posts,search])

  const handleSubmit=(e)=>{
    e.preventDefault();
    const id=posts.length ? posts[posts.length-1].id+1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost={id,title:postTitle,datetime,body:postBody};
    const allPosts=[...posts,newPost]
    setPosts(allPosts)
    setPostTitle('');
    setPostBody('');
    navigate('/')
    }

  const handleDelete=(id)=>{
      const postsList=posts.filter(post=>post.id!==id);
      setPosts(postsList);
      navigate('/')
  }
  return (
    <div className="App">    
      <Header title="Scroll"/>
      <Nav 
        search={search}  
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home posts={searchResults}/>} />
        <Route path="post">
            <Route index element={<NewPost 
              handleSubmit={handleSubmit}  
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />} />
            <Route path=":id" element={<PostPage posts={posts} handleDelete={handleDelete}/>}/>
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

  
