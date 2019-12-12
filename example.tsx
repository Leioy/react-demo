import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, NavLink } from 'react-router-dom'
import IconDemo from './lib/icon/icon.demo'
import DialogExample from './lib/dialog/dialog.example'
import LayoutExample from './lib/layout/layout.example'
// import './lib/index.scss'
import { Layout, Header, Content, Aside, Footer } from './lib/layout/layout'
import './example.scss'
import FormExample from './lib/form/form.example';
const logo = require('./logo.png').default
// import logo from './logo.png'
ReactDOM.render(
  <Router>
    <div>
      <Layout className="site-page" style={{ border: '1px solid red' }}>
        <Header className="site-header">
          <div className="site-logo">
            <img src={logo} width="48" height="48" alt="" />
            <span>RUI</span>
          </div>
        </Header>
        <Layout>
          <Aside className="site-aside">
            <h2>组件</h2>
            <ul>
              <li>
                <NavLink to="/icon">icon</NavLink>
              </li>
              <li>
                <NavLink to="/dialog">dialog</NavLink>
              </li>
              <li>
                <NavLink to="/layout">layout</NavLink>
              </li>
              <li>
                <NavLink to="/form">form</NavLink>
              </li>
            </ul>
          </Aside>
          <Content className="site-main">
            <Route path="/icon" component={IconDemo}/>
            <Route path="/dialog" component={DialogExample}/>
            <Route path="/layout" component={LayoutExample}/>
            <Route path="/form" component={FormExample}/>
          </Content>
        </Layout>
        <Footer className="site-footer">&copy; Leioy</Footer>
      </Layout>
    </div>
  </Router>
  ,
  document.querySelector('#root'))
