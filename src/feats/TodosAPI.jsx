/** @type {object} */
const todos = {
    initTodos: [
        /**
         * Todo가 9시부터 10시까지 고정.
         * 초기 Todo
         * */
        { time: 9, todo: '', checked: false },
        { time: 10, todo: '', checked: false },
        { time: 11, todo: '', checked: false },
        { time: 12, todo: '', checked: false },
        { time: 13, todo: '', checked: false },
        { time: 14, todo: '', checked: false },
        { time: 15, todo: '', checked: false },
        { time: 16, todo: '', checked: false },
        { time: 17, todo: '', checked: false },
    ],
    get todayId() {
        const date = new Date();
        return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
    },
};

export const formattedTime = (time) => `${('' + time).padStart(2, '0')}:00 ~ ${('' + (time + 1)).padStart(2, '0')}:00`;
export const getToday = () => todos.todayId;

export const deleteTodos = (time) => {
    const timeDiff = new Date(todos.todayId.replace(/\./g, '-')) - new Date(time.replace(/\./g, '-'));
    const isOldEnoughTodos = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) > 30;
    if (isOldEnoughTodos)
        localStorage.setItem('todoList', JSON.stringify(getTodosList().filter(({ id }) => time !== id)));
    return isOldEnoughTodos;
};

export const getTodosList = () => {
    const todoList = localStorage.getItem('todoList');
    return todoList ? JSON.parse(todoList) : [{ id: todos.todayId, todos: todos.initTodos }];
};

export const getTodayTodos = () => {
    return getTodosList().find(({ id }) => id === todos.todayId)?.todos ?? todos.initTodos;
};

export const saveTodos = (newTodos) => {
    const newTodosId = getToday();
    const todosList = getTodosList();

    const updatedTodoList = todosList.map((todos) => (todos.id === newTodosId ? { ...todos, todos: newTodos } : todos));

    if (!todosList.some((todos) => todos.id === newTodosId)) {
        updatedTodoList.unshift({ id: newTodosId, todos: newTodos });
    }

    localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
};
