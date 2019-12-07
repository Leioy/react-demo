import React from 'react';
import { prefixFunctionMaker } from '../prefixMaker'
const prefixAdder = prefixFunctionMaker('rui-layout')

interface IProps extends React.HTMLAttributes<HTMLElement> { }
const Header: React.FC<IProps> = (props) => {
  const { className, ...rest } = props
  return (
    <div className={prefixAdder('header', { extra: className })} {...rest}>
      header
    </div>
  );
};

export default Header;