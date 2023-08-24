import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const AdvertWidget = ({ isNonMobileScreens }) => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper
      width="inherit"
      position={isNonMobileScreens ? "sticky" : "relative"}
      top={isNonMobileScreens ? "7rem" : "0"}
    >
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}> Create Ad </Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        src="http://localhost:3001/assets/detoxGel.jpg"
        alt="advert"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}> Green Eastern </Typography>
        <Typography color={medium}> Greeneastern.us </Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Asian Skincare thats Authentic, Timeless, and True. Discover how you can
        enhance the beauyty thats within you, naturally.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
