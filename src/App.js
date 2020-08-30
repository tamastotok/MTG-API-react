import React from "react";
import "./App.css";
import NewFetch from "./components/NewFetch";
import {
  CardsProvider,
  ColorFilterProvider,
  TypeFilterProvider,
  TestFilterProvider,
  ColorsProvider,
} from "./components/DataContext";

function App() {
  return (
    <CardsProvider>
      <ColorFilterProvider>
        <ColorsProvider>
          <TypeFilterProvider>
            <TestFilterProvider>
              <div className="App">
                <NewFetch />
              </div>
            </TestFilterProvider>
          </TypeFilterProvider>
        </ColorsProvider>
      </ColorFilterProvider>
    </CardsProvider>
  );
}

export default App;
