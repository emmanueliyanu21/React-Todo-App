export interface ITask {
    id: number
    text: string;
    completed: boolean,
    code_code: string
    // status: number;
  }

  export interface IAction {
    type?: string,
    payload: ITask[]
  }
  