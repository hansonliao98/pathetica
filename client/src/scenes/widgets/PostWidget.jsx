import FlexBetween from "../../components/FlexBetween";
import React from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state/index";

const PostWidget = ({
  postId,
  name,
  postUserId,
  description,
  occupation,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  console.log(postId);
  const [isComments, setIsComments] = useState(false); //BOOLEAN: if user opened comments
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]); //REMINDER: on backend in models/post, we set 'likes' as an array of users with a boolean of true or false. This 'isLiked' boolean SEARCHES through the 'likes' array to find the 'loggedInUserId' boolean.
  const likeCount = Object.keys(likes).length; //'Object.keys' is a static method --> RETURNS an array of a given object's own string-keyed property names for info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    // UPDATE THE POST
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH", //PATCH = partial modifications to a resource, more info: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", //authentication
      },
      body: JSON.stringify({ userId: loggedInUserId }), //sending to backend this user's info BOOLEAN. Can keep track of if user liked this post
    });

    // RETURN THE UPDATED POST
    const updatedPost = await response.json();

    // REPLACE OLD POST
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0 0 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={occupation}
        userPicturePath={userPicturePath}
        postId={postId}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && ( //if theres a picture in post, then we show it
        <img
          width="100%"
          height="auto"
          src={`http://localhost:3001/assets/${picturePath}`}
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            {/* LIKES */}
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          {/* END LIKES */}

          {/* COMMENTS */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography> {comments.length} </Typography>
          </FlexBetween>
          {/* END COMMENTS */}
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem", pl: "1rem" }}>
                {comment}
              </Typography>
              <Divider />
            </Box>
          ))}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
