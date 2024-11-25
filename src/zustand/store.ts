import {create} from "zustand"
import { devtools, persist } from "zustand/middleware"
import {TaskSlice} from './slices/task-slice'

export const Store=create<any>()(
devtools(
    persist(
        (...args) => ({
            ...TaskSlice(...args),
          }),
          {
            name: 'aap-store',
            partialize: (state) => ({
                tasks: state.tasks,
                // todos: state.todos,
              })
          }

    )
)
)