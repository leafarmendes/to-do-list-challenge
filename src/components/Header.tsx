import styles from './Header.module.css';

export function Header() {
  return(
    <header className={styles.header}>
      <img src="../src/assets/todoList-logo.svg" alt="Logotipo to-do List" />
    </header>
  )
}