import React, { ReactElement } from 'react';
import './layout.scss'
import { prefixFunctionMaker } from '../helpers/classes'
import Aside from './aside';
const prefixAdder = prefixFunctionMaker('rui-layout')

interface IProps extends React.HtmlHTMLAttributes<HTMLElement> {
  children: ReactElement | Array<ReactElement>
}
const Layout: React.FC<IProps> = (props) => {
  const { className, ...rest } = props
  const children = props.children as Array<ReactElement>
  const hasAside = 'length' in children && children.reduce((prev, cur) => prev || cur.type === Aside, false)
  return (
    <div className={prefixAdder({ '': true, hasAside }, { extra: className })}{...rest}>
      {props.children}
    </div>
  );
};

export default Layout;
export { Layout }
export { default as Header } from './header'
export { default as Content } from './content'
export { default as Footer } from './footer'
export { default as Aside } from './aside'