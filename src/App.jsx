import { Outlet } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header3 from "./components/layout/Header3";
import "bootstrap/dist/css/bootstrap.css";
import "./css/styles.css";
import { AuthProvider } from "./components/context/AuthContext";
import { ReviewProvider } from "./components/context/ReviewContext";

function App() {
  return (
    <AuthProvider>
      <ReviewProvider>
        <div className="d-flex flex-column vh-100 justify-content-between">
          <Header3></Header3>
          <Outlet />
          {/*⭐ URL에 따라 변경되는 부분 ⭐ */}
          <Footer></Footer>
        </div>
      </ReviewProvider>
    </AuthProvider>
  );
}

export default App;
