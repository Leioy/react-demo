import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Link, Route } from 'react-router-dom'
import IconExample from './lib/icon/icon.example'
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
              <Link to="/button">button</Link>
            </li>
          </ul>
        </aside>
        <main>
          <Route path="/icon" component={IconExample}></Route>
        </main>
      </div>
    </div>
  </Router>
  ,
  document.querySelector('#root'))