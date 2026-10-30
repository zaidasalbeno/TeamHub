import { useEffect, useState } from 'react'

const KEY = 'teamhub-tasks'
const seed = [
  { id: 1, title: 'Prepare Q4 campaign brief', employee: 'Jordan Lee', email: 'jordan@example.com', due: '2026-11-06', status: 'In progress', priority: 'High', description: 'Outline the key messages and channels for our upcoming campaign.' },
  { id: 2, title: 'Review onboarding flow', employee: 'Sam Rivera', email: 'sam@example.com', due: '2026-11-10', status: 'To do', priority: 'Medium', description: 'Review the first-week employee onboarding experience.' },
  { id: 3, title: 'Update client presentation', employee: 'Jordan Lee', email: 'jordan@example.com', due: '2026-11-04', status: 'Done', priority: 'Low', description: 'Refresh the deck with current client milestones.' },
]

export function useTasks() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem(KEY) || 'null') || seed)
  useEffect(() => localStorage.setItem(KEY, JSON.stringify(tasks)), [tasks])
  const saveTask = (task) => setTasks((current) => task.id ? current.map((item) => item.id === task.id ? task : item) : [{ ...task, id: Date.now() }, ...current])
  const deleteTask = (id) => setTasks((current) => current.filter((task) => task.id !== id))
  const updateStatus = (id, status) => setTasks((current) => current.map((task) => task.id === id ? { ...task, status } : task))
  return { tasks, saveTask, deleteTask, updateStatus }
}
