import React from "react";
import "./App.css";
import NewFetch from "./components/NewFetch";
import {
  CardsProvider,
  ColorFilterProvider,
  TypeFilterProvider,
  TestFilterProvider,
  ColorsProvider,
  RarityFilterProvider,
} from "./components/DataContext";

function App() {
  return (
    <CardsProvider>
      <ColorFilterProvider>
        <ColorsProvider>
          <TypeFilterProvider>
            <RarityFilterProvider>
              <TestFilterProvider>
                <div className="App">
                  <NewFetch />
                </div>
              </TestFilterProvider>
            </RarityFilterProvider>
          </TypeFilterProvider>
        </ColorsProvider>
      </ColorFilterProvider>
    </CardsProvider>
  );
}

export default App;
