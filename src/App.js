import React, { useRef, useState, useMemo } from "react";
import Counter from "./components/Counter";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import MyModal from "./components/UI/modal/MyModal";
import MySelect from "./components/UI/select/MySelect";
import { useSortedPost } from "./hooks/usePosts";
import { usePosts } from "./hooks/usePosts";
import "./styles/App.css";

function App() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({ sort: "", query: "" });

  // state for manage modal window: then show and when hide (false by default):
  const [modal, setModal] = useState(false);

  //userHook:
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  // getiing "post" from children componrnt:
  const removePost = (post) => {
    // if id from array = id transported by post then we delete the element
    setPosts(posts.filter((myPost) => myPost.id !== post.id));
  };

  return (
    <div className="app">
      <MyButton
        style={{ margin: "30px 0px 0px 0px" }}
        onClick={() => setModal(true)}
      >
        Create post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0px 15px 0px" }}></hr>
      <PostFilter filter={filter} setFilter={setFilter} />
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="List of posts about Java Script"
      />
    </div>
  );
}

export default App;
