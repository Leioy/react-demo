import React from 'react';
import { prefixFunctionMaker } from '../helpers/classes'
const prefixAdder = prefixFunctionMaker('rui-layout')

interface IProps extends React.HTMLAttributes<HTMLElement> { }
const Aside: React.FC<IProps> = (props) => {
  const { className, ...rest } = props
  return (
    <div className={prefixAdder('aside', { extra: className })} {...rest}>
      aside
    </div>
  );
};

export default Aside;