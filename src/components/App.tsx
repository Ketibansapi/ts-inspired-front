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
          completed: false
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

  public randomTask(): void {
    let randomNum = Math.floor(Math.random() *  this.state.tasks.length);
    let name = this.state.tasks[randomNum];
    alert(name);
  }

  public renderTasks(): JSX.Element[] {
    return this.state.tasks.map((task: ITask, index: number) => {
      return (
        <div key={task.id} className="tdl-task">
          <span className={task.completed ? "is-completed" : ""}>{task.value}</span>
          <button onClick={() => this.deleteTask(task.id)}>Remove</button>
        </div>
      );
    });
  }

  public render(): JSX.Element {
    console.log(this.state);
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
          <button type="submit">Random</button>
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
}
