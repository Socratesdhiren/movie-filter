import React from "react";
import MoviesList from "./components/Movies/MovieNewList";
import DesignLayout from "./components/Layout";
import Greeting from "./components/Movies/Greeting";
import RecordingForm from './components/AppSetting/RecordingForm';
import { SelectedFilterModeProvider} from './components/AppSetting/Hooks/SessionRecordingFilter'
function App() {
  return (
    // <DesignLayout>
    //   <MoviesList />
    // </DesignLayout>
    //  <Greeting/>
    <div className="main-div">
      <SelectedFilterModeProvider>
      <RecordingForm/>
      </SelectedFilterModeProvider>
    </div>
  );
}

export default App;
