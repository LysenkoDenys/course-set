import { useMemo } from "react";

// this user hook returns sorted array:
export const useSortedPosts = (posts, sort) => {
  const sortedPosts = useMemo(() => {
    // if selectedSort exsists then return sorted Array, else unsorted array
    if (sort) {
      // on this stage we parse our array to a new array and compare sorted elements:
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]), "en");
    }
    return posts;
  }, [sort, posts]);
  return sortedPosts;
};

// alternative variant of sort:
// const sortPosts = (sort) => {
//   setSelectedSort(sort);
//   setPosts([...posts].sort((a, b) => (a[sort] > b[sort] ? 1 : -1)));
// };

// this user hook returns filtered and sorted array:
export const usePosts = (posts, sort, query) => {
  const sortedPosts = useSortedPosts(posts, sort);
  //search on base of sorted array above:
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, sortedPosts]);
  return sortedAndSearchedPosts;
};
