import React from 'react';

class Index extends React.Component {
  componentDidMount = () => {
    document.title = 'Invoice App';
  }

  render = () => (
    <h1 className="h1 text-center">
      Invoice App
    </h1>
  )
}

export default Index;
