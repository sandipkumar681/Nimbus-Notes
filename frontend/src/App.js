import Navbar from "./components/Navbar";
import NoteState from "./context/note/NoteState";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import LoadingBarState from "./context/loadingBar/LoadingBarState";
import LoadingBar from "react-top-loading-bar";
import { useContext } from "react";
import loadingBarContext from "./context/loadingBar/loadingBarContext";

function App() {
  return (
    <LoadingBarState>
      <NoteState>
        <AppContent />
      </NoteState>
    </LoadingBarState>
  );
}

function AppContent() {
  const { progress, setProgress } = useContext(loadingBarContext);

  return (
    <>
      <Navbar />
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
