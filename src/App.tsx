import { Router as WouterRouter, Route, Switch } from "wouter";
import HomePage from "@/pages/HomePage";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

export default App;
