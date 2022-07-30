import { Header } from "./components/Header"
import styles from './App.module.css';

import './global.css'
import { Content } from "./components/Content";

function App() {

  return (
    <div className={styles.wrapper}>
      <Header />

      <Content />
    </div>
  )
}

export default App
