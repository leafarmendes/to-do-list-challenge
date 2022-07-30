import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { Assign } from './Assign';
import styles from './Content.module.css';

export interface Tasks {
  id: string;
  title: string;
  isFinished: boolean;
}

export function Content() {
  const [toDoList, setToDoList] = useState<Tasks[]>([]);

  const [newTitle, setNewTitle] = useState('');

  function handleList(assignId: string, assignTitle: string, assignIsFinished: boolean) {
    setToDoList([...toDoList, 
          {
            id: assignId,
            title: assignTitle,
            isFinished: assignIsFinished,
          }
    ]);   
  }

  function handleToDoList(event: FormEvent) {
    event.preventDefault();
    handleList(crypto.randomUUID(), newTitle, false);
    setNewTitle('');
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTitle(event.target.value);
  }

  function handleInputInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Este campo é obrigatório!');
  }

  function deleteTask(listId: string) {
    const deleteTaskById = toDoList.filter(list => list.id !== listId)

    setToDoList(deleteTaskById);
  }  

  const isInputEmpty = newTitle.length === 0;
  const finishedTasks = toDoList.filter((task) => task.isFinished).length;

  function toggleFinished(taskId: string) {
    const newToDo = toDoList.map((task) => {
      if(task.id === taskId) {
        return {
          ...task,
          isFinished: !task.isFinished
        }
      }
      return task;
    })
    setToDoList(newToDo);
  }

  return (
    <section className={styles.content}>
        <form onSubmit={handleToDoList} >
          <input 
            className={styles.addTodoInput} 
            name="list"
            value={newTitle}
            placeholder="Adicione uma nova tarefa"
            onChange={handleInputChange}
            onInvalid={handleInputInvalid}
            required
          />
          <button 
            className={styles.buttonTodoSubmit} 
            type="submit"
            disabled={isInputEmpty}
          >
            Criar
            <PlusCircle size={20} />
          </button>
        </form>

        <div className={styles.list}>
          <div className={styles.headerList}>
            <strong className={styles.created}>Tarefas criadas <span>{toDoList.length}</span></strong>
            <strong className={styles.done}>Concluidas <span>{finishedTasks} de {toDoList.length}</span></strong>
          </div>

          {toDoList.length === 0 ? 
            <div className={styles.containerList}>
              <img src="../src/assets/clipboard.svg" alt="" />
              <p><strong>Você ainda não tem tarefas cadastradas.</strong></p>
              <p>Crie tarefas e organize seus itens a fazer.</p>
            </div> 
            :           
            toDoList.map(list => {
              return <Assign 
                key={list.id}
                tasks={list} 
                onDeleteTask={deleteTask}
                onComplete={toggleFinished}
              />
            })
          }
        </div>
    </section>
  )
}