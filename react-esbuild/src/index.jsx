import * as React from 'react';
import * as Server from 'react-dom/server';

const Card = ({ children }) => {
  return <div className="card">{children}</div>;
};

let Greet = () => (
  <Card>
    <h1>Hello, world!</h1>
  </Card>
);
console.log(Server.renderToString(<Greet />));
