import React from 'react';
import './layout.scss'
import { prefixFunctionMaker } from '../prefixMaker'
const prefixAdder = prefixFunctionMaker('rui-layout')

interface IProps extends React.HtmlHTMLAttributes<HTMLElement> {

}
const Layout: React.FC<IProps> = (props) => {
  const { className, ...rest } = props
  return (
    <div className={prefixAdder('', { extra: className })}{...rest}>
      {props.children}
    </div>
  );
};

export default Layout;