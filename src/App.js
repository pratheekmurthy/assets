import { Box } from "@mui/system";
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";
import TabComponent from "./Components/TabComponent";

const App = () => {
  return (
    <Box>
      <NavBar />
      <TabComponent />
      <Footer/>
    </Box>
  );
};
export default App;
