import React from 'react';
import { prefixFunctionMaker } from '../prefixMaker'
const prefixAdder = prefixFunctionMaker('rui-layout')

interface IProps extends React.HTMLAttributes<HTMLElement> { }
const Content: React.FC<IProps> = (props) => {
  const { className, ...rest } = props
  return (
    <div className={prefixAdder('content', { extra: className })} {...rest}>
      content
    </div>
  );
};

export default Content;