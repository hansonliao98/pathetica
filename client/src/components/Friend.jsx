import React, { useEffect, useState } from "react";
import {
  DeleteOutline,
  PersonAddOutlined,
  PersonRemoveOutlined,
  TrashOutlined,
  EditOutlined,
  RepeatOneSharp,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../state/index";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";

const Friend = ({
  friend,
  friendId,
  name,
  subtitle,
  userPicturePath,
  postId,
}) => {
  console.log(userPicturePath);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const [start, setStart] = useState();

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  useEffect(() => {
    const getFriend = async () => {
      console.log(friend);
      const response = await fetch(`http://localhost:3001/users/${friend}`, {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setStart({ data });
    };
    getFriend();
    console.log(start);
  }, []);

  const patchFriend = async () => {
    //for adding or subtracting friend
    console.log("this has started!");
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH", //PATCH = partial modifications to a resource, more info: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", //authentication
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data })); //save dataset of friends to global state
  };

  const deletePost = async () => {
    console.log("deletePost has started!");
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", //authentication?
        },
      }
    );

    const data = await response.json();
    console.log(data);
    dispatch(deletePost({ postId: postId }));
  };

  const isFriend = friends.find((friend) => friend._id === friendId); //BOOLEAN: check if the other user is this user's friend
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>

      {friendId !== _id ? (
        <IconButton
          onClick={patchFriend}
          sx={{
            backgroundColor: primaryLight,
            p: "0.6rem",
          }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      ) : (
        <div style={{ display: "flex", justifyContent: "end" }}>
          <IconButton onClick={""}>
            <EditOutlined />
          </IconButton>
          <IconButton onClick={deletePost}>
            <DeleteOutline />
          </IconButton>
        </div>
      )}
    </FlexBetween>
  );
};

export default Friend;
