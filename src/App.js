import React, { useRef, useState } from "react";
import Counter from "./components/Counter";
import PostForm from "./components/PostForm";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import MySelect from "./components/UI/select/MySelect";
import "./styles/App.css";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "aa", body: "bb" },
    { id: 2, title: "ee", body: "aa" },
    { id: 3, title: "bb", body: "zz" },
  ]);

  const [selectedSort, setSelectedSort] = useState("");

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  // getiing "post" from children componrnt:
  const removePost = (post) => {
    // if id from array = id transported by post then we delete the element
    setPosts(posts.filter((myPost) => myPost.id !== post.id));
  };

  const sortPosts = (sort) => {
    setSelectedSort(sort);
    console.log(sort); // tittle or body
    // on this stage we parse our array to a new array and compare sorted elements:
    setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort]), "en"));
  };

  // alternative variant - it works!!!:
  // const sortPosts = (sort) => {
  //   setSelectedSort(sort);
  //   setPosts([...posts].sort((a, b) => (a[sort] > b[sort] ? 1 : -1)));
  // };

  return (
    <div className="app">
      <PostForm create={createPost} />
      <hr style={{ margin: "15px 0px 15px 0px" }}></hr>
      <div>
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="sort by"
          options={[
            { value: "title", name: "By name" },
            { value: "body", name: "By description" },
          ]}
        />
        {/* <select>
          <option value="value1">By name</option>
          <option value="value1">By description</option>
        </select> */}
      </div>

      {posts.length !== 0 ? (
        <PostList
          remove={removePost}
          posts={posts}
          title="List of posts about JS"
        />
      ) : (
        <div>
          <h1 style={{ textAlign: "center" }}>Posts not found...</h1>
        </div>
      )}
    </div>
  );
}

export default App;
