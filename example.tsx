import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Link, Route } from 'react-router-dom'
import IconExample from './lib/icon/icon.example'
import DialogExample from './lib/dialog/dialog.example'
import LayoutExample from './lib/layout/layout.example'
// import './lib/index.scss' 
import { Layout, Header, Content, Aside, Footer } from './lib/layout/layout'
import './example.scss'
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
                <Link to="/icon">icon</Link>
              </li>
              <li>
                <Link to="/dialog">dialog</Link>
              </li>
              <li>
                <Link to="/layout">layout</Link>
              </li>
            </ul>
          </Aside>
          <Content className="site-main">
            <Route path="/icon" component={IconExample}></Route>
            <Route path="/dialog" component={DialogExample}></Route>
            <Route path="/layout" component={LayoutExample}></Route>
          </Content>
        </Layout>
        <Footer className="site-footer">&copy; Leioy</Footer>
      </Layout>
    </div>
  </Router>
  ,
  document.querySelector('#root'))