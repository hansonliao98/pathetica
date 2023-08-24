import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../navbar/index";
import { useSelector } from "react-redux";
import UserWidget from "../widgets/UserWidgets.jsx";
// import MyPostWidget from "../../scenes/widgets/MyPostWidget";
import PostsWidget from "../../scenes/widgets/PostsWidget";
import AdvertWidget from "../../scenes/widgets/AdvertWidgets";
import FriendListWidget from "../../scenes/widgets/FriendListWidget";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [user, setUser] = useState(null);
  let { userId } = useParams();
  console.log(userId);
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }, //in Middleware/auth, we specifiy this: if token STARTS with Bearer, THEN it is authorized
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const { _id, picturePath } = user;
  // // console.log(userId);
  // const friends = useSelector((state) => state.user.friends);
  // const friend = friends.filter((friend) => friend._id === userId);
  // // console.log(friend[0]);
  // const { _id, picturePath } = friend[0];
  // // console.log(_id, picturePath);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem"
        display={isNonMobileScreens ? "flex" : "block"} //on a computer youll have 3 widgets in a row, on phone is 1 widget a row
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* <MyPostWidget picturePath={picturePath} /> */}
          <PostsWidget userId={_id} isProfile="true" />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            {/* <FriendListWidget userId={_id} /> */}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
