import React from "react";
import "./App.css";
import NewFetch from "./components/NewFetch";
import {
  CardsProvider,
  ColorFilterProvider,
  TypeFilterProvider,
  TestFilterProvider,
  RarityFilterProvider,
} from "./components/DataContext";

function App() {
  return (
    <CardsProvider>
      <ColorFilterProvider>
        <TypeFilterProvider>
          <RarityFilterProvider>
            <TestFilterProvider>
              <div className="App">
                <NewFetch />
              </div>
            </TestFilterProvider>
          </RarityFilterProvider>
        </TypeFilterProvider>
      </ColorFilterProvider>
    </CardsProvider>
  );
}

export default App;
