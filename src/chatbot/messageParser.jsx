import React from "react";

function MessageParser({ children, actions }) {
  const parse = (message) => {};

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
}

export default MessageParser;
