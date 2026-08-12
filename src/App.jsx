export default function App() {
  const tasks = [
    {
      id: 1,
      title: "React のレンダリングを理解する",
      completed: true,
    },
    {
      id: 2,
      title: "より実践的な state の管理",
      completed: false,
    },
    {
      id: 3,
      title: "エフェクトとカスタム Hook",
      completed: false,
    },
  ];

  return (
    <>
      <h1>やること</h1>
      <TaskList tasks={tasks} />
    </>
  );
}

function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
}
