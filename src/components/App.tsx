import * as React from "react";

export class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentTask: "",
      tasks: []
    };
  }

  public handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    this.setState({
      currentTask: "",
      tasks: [
        ...this.state.tasks,
        {
          id: this._timeInMilliseconds(),
          value: this.state.currentTask,
          completed: false,
          chosenBefore: false
        }
      ]
    });
  }

  public deleteTask(id: number): void {
    const tasks: Array<ITask> = this.state.tasks.filter(
      (task: ITask) => task.id !== id
    );
    this.setState({ tasks });
  }

  public toggleDone(index: number): void {
    let task: ITask[] = this.state.tasks.splice(index, 1);
    task[0].completed = !task[0].completed;
    const tasks: ITask[] = [...this.state.tasks, ...task];
    this.setState({ tasks });
  }

  public randomTask(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    let tasks = this.state.tasks;
    let filtered = tasks.filter(task => !task.chosenBefore);
    let randomNum = Math.floor(Math.random() * filtered.length);
    let task = tasks[randomNum];
    let newTasks = filtered.map(taskS => {
      if (taskS.id === task.id) {
        return {
          ...taskS,
          chosenBefore: true
        };
      } else {
        return {
          ...taskS
        };
      }
    });
    this.setState({ tasks: newTasks });

    if (filtered.includes(task) && typeof task.id !== "undefined") {
      alert(task.value);
    } else {
      alert("no more options");
    }
  }

  public renderTasks(): JSX.Element[] {
    return this.state.tasks.map((task: ITask, index: number) => {
      return (
        <div key={task.id} className="tdl-task">
          <span className={task.completed ? "is-completed" : ""}>
            {task.value}
          </span>
          <button onClick={() => this.deleteTask(task.id)}>Remove</button>
        </div>
      );
    });
  }

  public render(): JSX.Element {
    return (
      <div>
        <h1>React Names Lists</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            type="text"
            className="tdl-input"
            placeholder="Add a name.."
            value={this.state.currentTask}
            onChange={e => this.setState({ currentTask: e.target.value })}
          />
          <button type="submit">Add</button>
        </form>
        <form onClick={e => this.randomTask(e)}>
          <button>Random</button>
        </form>
        <section>{this.renderTasks()}</section>
      </div>
    );
  }

  private _timeInMilliseconds(): number {
    const date: Date = new Date();
    return date.getTime();
  }
}

interface IState {
  currentTask: string;
  tasks: Array<ITask>;
}

interface ITask {
  id: number;
  value: string;
  completed: boolean;
  chosenBefore: boolean;
}