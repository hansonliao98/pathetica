import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/index";
import PostWidget from "../widgets/PostWidget";
import { Button, Typography } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  // console.log(posts);

  // GET ALL POSTS FOR HOMEPAGE
  const getPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }, //authentication
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data })); //remember the post array is set as "Action.payload.posts"
  };

  // GET PROFILE POSTS ONLY
  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }, //authentication
      }
    );
    const data = await response.json();
    console.log(data);
    dispatch(setPosts({ posts: data })); //remember the post array is set as "Action.payload.posts"
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  useEffect(() => {
    if (isProfile) {
      console.log("its started");
      getUserPosts();
    } else {
      console.log("its started");
      getPosts();
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ display: "flex", flexDirection: "column-reverse" }}>
      <FlexBetween
        display="grid"
        justifyContent="center!important"
        flexDirection="column"
        height="10rem"
      >
        <Typography>Looks like you've reached the end!</Typography>
        <Button onClick={scrollToTop}> BACK TO TOP </Button>
      </FlexBetween>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </div>
  );
};

export default PostsWidget;
