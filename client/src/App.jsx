import Home from "./pages/Home";
import Note from "./components/Note";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NewNote from "./pages/NewNote";
import EditNote from "./pages/EditNote";
import Header from "./components/Header";
import { NoteProvider } from "./Context";

function App() {
  return (
    <NoteProvider>
      <Router className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/note/:id">
            <Note />
          </Route>
          <Route path="/newnote">
            <NewNote />
          </Route>
          <Route path="/editnote/:id">
            <EditNote />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </NoteProvider>
  );
}

export default App;
