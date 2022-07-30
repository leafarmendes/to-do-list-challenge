import styles from './Header.module.css';

import logo from '/src/assets/todoList-logo.svg'

export function Header() {
  return(
    <header className={styles.header}>
      <img src={logo} alt="Logotipo to-do List" />
    </header>
  )
}