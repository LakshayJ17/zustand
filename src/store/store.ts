import { create } from "zustand";

export interface Habit {
    id: string;
    name: string;
    frequency: "daily" | "weekly";
    completedDates: string[];
    createdAt: string;
}

interface HabitState {
    habits: Habit[];
    addHabit: (name: string, frequency: "daily" | "weekly") => void;
    removeHabit: (id: string) => void;
    toggleHabit: (id: string, date: string) => void;
}

const useHabitStore = create<HabitState>((set) => {
    return {
        habits: [],
        addHabit: (name, frequency) => set((state) => {
            return {
                habits: [...state.habits, {
                    id: Date.now().toString(),
                    name,
                    frequency,
                    completedDates:[],
                    createdAt: new Date().toISOString()
                }],
            }
        }),

        removeHabit: (id) => set((state)=>({
            habits: state.habits.filter(habit => habit.id !== id),
        })),

        toggleHabit: (id, date) => set((state) => {
            const habitIndex = state.habits.findIndex(habit => habit.id === id);
            if (habitIndex !== -1) {
                const updatedHabit = { ...state.habits[habitIndex] };
                if (updatedHabit.completedDates.includes(date)) {
                    updatedHabit.completedDates = updatedHabit.completedDates.filter(d => d !== date);
                } else {
                    updatedHabit.completedDates.push(date);
                }
                const updatedHabits = [...state.habits];
                updatedHabits[habitIndex] = updatedHabit;
                return { habits: updatedHabits };
            }
            return state;
        })
    }
})

export default useHabitStore