import React, { Suspense } from "react";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import { routesMap } from "routes/routes";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={""}>
        <Switch>
          {routesMap.map(({ path, component }, index) => (
            <Route
              path={path}
              key={index}
              component={component}
              exact
              sensitive={false}
            />
          ))}
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
