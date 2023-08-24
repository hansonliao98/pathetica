import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../navbar/index";
import { useSelector } from "react-redux";
import UserWidget from "../widgets/UserWidgets.jsx";
import MyPostWidget from "../../scenes/widgets/MyPostWidget";
import PostsWidget from "../../scenes/widgets/PostsWidget";
import AdvertWidget from "../../scenes/widgets/AdvertWidgets";
import FriendListWidget from "../../scenes/widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      {/* <Navbar /> */}
      <Box
        width="100%"
        padding="2rem"
        display={isNonMobileScreens ? "flex" : "block"} //on a computer youll have 3 widgets in a row, on phone is 1 widget a row
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget
            userId={_id}
            picturePath={picturePath}
            isNonMobileScreens={isNonMobileScreens}
          />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0"  />
            <FriendListWidget
              userId={_id}
              isNonMobileScreens={isNonMobileScreens}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
