import { styled } from "@mui/material/styles";
import { Box, LinearProgress, linearProgressClasses } from "@mui/material";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 0,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 0,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const CustomLinearProgress = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <BorderLinearProgress />
    </Box>
  );
};

export default CustomLinearProgress;
