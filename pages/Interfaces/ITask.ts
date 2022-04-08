export interface ITask {
    id: number
    text: string;
    completed: boolean,
    release_year: string
    // status: number;
  }

  export interface IAction {
    type?: string,
    payload: ITask[]
  }
  