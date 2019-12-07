import React from 'react';
import { prefixFunctionMaker } from '../helpers/classes'
const prefixAdder = prefixFunctionMaker('rui-layout')

interface IProps extends React.HTMLAttributes<HTMLElement> { }
const Header: React.FC<IProps> = (props) => {
  const { className, ...rest } = props
  return (
    <div className={prefixAdder('header', { extra: className })} {...rest}>
      {props.children}
    </div>
  );
};

export default Header;