import { BrowserRouter, Switch, Route } from "react-router-dom";
import Authentification from "./pages/Authentification";
import Home from "./pages/Home";
import Members from "./pages/Members";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import ModifyPost from "./pages/ModifyPost";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Authentification}/>
        <Route path="/home" exact component={Home}/>
        <Route path="/members" exact component={Members}/>
        <Route path="/profile" exact component={Profile}/>
        <Route path="/modifyPost/:id" component={ModifyPost}/>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter> 
  )
}

export default App;
