import React from 'react';

interface Props {
  code: string
}
const Demo: React.FC<Props> = (props) => {
  return (
    <div>
      {props.children}
      <pre>{props.code}</pre>
    </div>
  );
};

export default Demo