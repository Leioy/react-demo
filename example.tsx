import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Link, Route } from 'react-router-dom'
import IconExample from './lib/icon/icon.example'
import DialogExample from './lib/dialog/dialog.example'
import LayoutExample from './lib/layout/layout.example'
import './lib/index.scss'
ReactDOM.render(
  <Router>
    <div>
      <header>
        <div className="logo">rui</div>
      </header>
      <div>
        <aside>
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
        </aside>
        <main>
          <Route path="/icon" component={IconExample}></Route>
          <Route path="/dialog" component={DialogExample}></Route>
          <Route path="/layout" component={LayoutExample}></Route>
        </main>
      </div>
    </div>
  </Router>
  ,
  document.querySelector('#root'))