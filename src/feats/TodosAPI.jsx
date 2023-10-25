const todos = {
    get todayId() {
        const date = new Date();
        return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
    },
};

export const getTodosList = () => {
    const todoList = localStorage.getItem('todoList');
    return todoList ? JSON.parse(todoList) : [];
};

export const saveTodos = (newTodos) => {
    const newTodosId = todos.todayId;
    const todosList = getTodosList();

    const updatedTodoList = todosList.map((todos) => (todos.id === newTodosId ? { ...todos, todos: newTodos } : todos));

    if (!todosList.some((todos) => todos.id === newTodosId)) {
        updatedTodoList.push({ id: newTodosId, todos: newTodos });
    }

    localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
};
