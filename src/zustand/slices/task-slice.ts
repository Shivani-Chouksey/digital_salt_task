import { StateCreator } from 'zustand';

export type taskType = {
    id: string | null;
    test: string | null;
    completed: boolean | null;
    
};

// Define the state interface that includes both the data and actions
interface TaskState {
    tasks: taskType[];
    addTask: (task: taskType) => void;
}

export const TaskSlice: StateCreator<TaskState> = (set) => ({
    tasks: [],
    addTask: (task: taskType) => {
        set((state) => ({
            tasks: [task, ...state.tasks]
        }));
    },
    deleteTask:(taskId:any)=>{
        set((state)=>({
            tasks:state.tasks.filter((task)=>task.id !==taskId),

        }))
    }
});