import React, { ReactElement } from 'react';
import './layout.scss'
import { prefixFunctionMaker } from '../prefixMaker'
import Aside from './aside';
const prefixAdder = prefixFunctionMaker('rui-layout')

interface IProps extends React.HtmlHTMLAttributes<HTMLElement> {
  children: ReactElement | Array<ReactElement>
}
const Layout: React.FC<IProps> = (props) => {
  const { className, ...rest } = props
  const children = props.children as Array<ReactElement>
  const hasAside = children.length && children.reduce((prev, cur) => prev || cur.type === Aside, false)
  return (
    <div className={prefixAdder('', { extra: [className, hasAside && 'hasAside'].join(' ') })}{...rest}>
      {props.children}
    </div>
  );
};

export default Layout;