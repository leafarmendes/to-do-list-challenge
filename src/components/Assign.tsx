import { CheckCircle, Circle, Trash } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import styles from './Assign.module.css';
import { Tasks } from './Content';

interface AssignProps {
  tasks: Tasks;
  onDeleteTask: (listId: string) => void;
  onComplete: (taskId: string) => void;
}


export function Assign({ tasks, onDeleteTask, onComplete }: AssignProps) {
  const [checkAssign, setCheckAssign] = useState(false);

  function handleCheckList(event: FormEvent) {
    event.preventDefault();
    setCheckAssign(state => state === false ? state = true : state = false);
    onComplete(tasks.id)
  }

  function handleDeleteTask() {
    onDeleteTask(tasks.id);
  }

  return(
    <div className={styles.assign}>
      <button 
        onClick={handleCheckList}
        className={styles.check}
      >
        {checkAssign == false ? <Circle size={25} /> : <CheckCircle size={25} weight="fill" color="var(--purple-100)"/>}
      </button>
        <p className={checkAssign ? styles.done : styles.textAssign}>{tasks.title}</p>

      <button onClick={handleDeleteTask} className={styles.trash} title="Deletar comentário">
        <Trash size={20}  />
      </button>
    </div>
  )
}