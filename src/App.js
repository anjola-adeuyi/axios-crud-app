import React, {useState, useEffect} from 'react';
import postApi from './api/posts';

function App() {
  const [posts, setPosts] = useState([]);

  const newPost = {
    "id": 1,
    "title": "New post",
    "datetime": "July 16, 2021 11:47:39 AM",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }

  useEffect(()=> {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await postApi.get('/posts');
      setPosts(response.data);
      console.log(response.data);
    } catch (err) {
      if (err.response) {
        // Not in the 200 response range 
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      } 
    }
  }

  const handleDelete = async (id) => {
    try {
      await postApi.delete(`/posts/${id}`);
      fetchPosts();
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const handleUpdate = async (id, title) => {
    try {
      await postApi.patch(`/posts/${id}`, {title: `${title}a`});
      fetchPosts();
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const handleAddPost = async () => {
    try {
      await postApi.post(`/posts`, newPost);
      fetchPosts();
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <>
      <button onClick={handleAddPost}>Create a new Post</button>
      {posts?.map((post, idx) => { return (
        <div key={idx}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <button onClick={() => handleDelete(post.id)}>Delete Post</button>
          <button onClick={() => handleUpdate(post.id, post.title)}>Update Post</button>
          <br />
        </div>
      )
      })}
    </>
  );
}

export default App;
