import React from 'react';
import Header from './Header';
import SearchBox from './SearchBox';
import ResultsDisplay from './ResultsDisplay';

const Main = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container">
          <div className="row">
            <div className="col-md-5  search-box">
              <SearchBox />
            </div>
            <div className="col-md-6 pl-5 results-display">
              <ResultsDisplay />
            </div>
          </div>
        {children}
      </div>
    </div>
  );
};

export default Main;
