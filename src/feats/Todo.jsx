import { useEffect, useState } from 'react';

import { saveTodos } from './TodosAPI';

import Alarm from './Alarm';

/**
 * Todo가 9시부터 10시까지 고정.
 * So; 배열을 todos란 변수에 할당
 * */
const TODOS = [
    { time: 9, todo: '' },
    { time: 10, todo: '' },
    { time: 11, todo: '' },
    { time: 12, todo: '' },
    { time: 13, todo: '' },
    { time: 14, todo: '' },
    { time: 15, todo: '' },
    { time: 16, todo: '' },
    { time: 17, todo: '' },
];

export default function Todo() {
    const [state, setState] = useState({ isAlarm: false, todos: TODOS });

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('wjwkd');
        }, 1000000);
        return () => clearInterval(interval);
    }, []);

    /**
     * Todo를 저장하는 이벤트를 담당하는 함수
     * 1. Form에서 Todo들을 모아서 배열화한다.
     * 2. Todos 상태를 업데이트 후, 서버(스토리지)에 저장한다.
     * 3. 알람을 띄운다.
     * @param {*} e
     */
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newTodos = [...e.target.todo].map((todo, idx) => ({ time: idx + 9, todo: todo.value }));
        saveTodos(newTodos);
        setState({
            isAlarm: true,
            todos: newTodos,
        });
    };

    const { isAlarm, todos } = state;
    const setIsAlarm = (isAlarm) => {
        setState({ ...state, isAlarm });
    };

    return (
        <>
            <h1>Welcome Todo Page</h1>
            <Alarm isAlarm={isAlarm} setIsAlarm={setIsAlarm} />
            <form onSubmit={handleFormSubmit}>
                <button type="submit" disabled={isAlarm}>
                    오늘 Todos 저장하기
                </button>
                <ul>
                    {todos.map(({ time, todo }) =>
                        // prettier-ignore
                        <li key={time}>
                            <h2> 
                                { `${('' + (time)).padStart(2,'0')}:00 ~ ${('' + (time + 1)).padStart(2,'0')}:00` }
                            </h2>
                            { time === 12 ? <p>중식</p> : <input name="todo" type='text' maxLength={100} defaultValue={todo} data-id={time}/> }
                        </li>
                    )}
                </ul>
            </form>
        </>
    );
}
