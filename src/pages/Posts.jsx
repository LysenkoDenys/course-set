import axios from "axios";
import React, { useRef, useState, useMemo, useEffect } from "react";
import Counter from "../components/Counter";
import PostFilter from "../components/PostFilter";
import PostForm from "../components/PostForm";
import PostItem from "../components/PostItem";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import MyModal from "../components/UI/modal/MyModal";
import MySelect from "../components/UI/select/MySelect";
import { useSortedPost } from "../hooks/usePosts";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import { getPageCount, getPagesArray } from "../utilities/pages";
import Pagination from "../components/UI/pagination/Pagination";
import "../styles/App.css";

function Posts() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({ sort: "", query: "" });

  // state for manage modal window: then show and when hide (false by default):
  const [modal, setModal] = useState(false);

  //post quantity:
  const [totalPages, setTotalPages] = useState(0);

  //pages parametres:
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  //userHook:
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  //waiting for update posts and solve errors:
  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts(response.data);
      const totalCount = response.headers["x-total-count"];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );
  console.log(totalPages);

  useEffect(() => {
    fetchPosts(limit, page);
  }, []);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  // getiing "post" from children componrnt:
  const removePost = (post) => {
    // if id from array = id transported by post then we delete the element
    setPosts(posts.filter((myPost) => myPost.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
    fetchPosts(limit, page);
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
      {postError && <h1>Error ${postError}</h1>}
      {isPostsLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "50px 0px 0px 0px",
          }}
        >
          <Loader />
        </div>
      ) : (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title="List of posts about Java Script"
        />
      )}
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
