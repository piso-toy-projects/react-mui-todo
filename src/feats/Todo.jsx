import { useState } from 'react';

export default function Todo() {
    const [todos, setTodos] = useState([
        { time: 9, todo: '' },
        { time: 10, todo: '' },
        { time: 11, todo: '' },
        { time: 12, todo: '' },
        { time: 13, todo: '' },
        { time: 14, todo: '' },
        { time: 15, todo: '' },
        { time: 16, todo: '' },
        { time: 17, todo: '' },
    ]);

    const todoFuncs = {
        addTodo: () => {},
        updateTodo: () => {},
        saveTodos: () => {},
    };

    const handleTodos = (e) => {
        console.log('임시 저장합니다.');
    };

    return (
        <>
            <h1>Welcome Todo Page</h1>
            <form
                onChange={handleTodos}
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <button type="submit">오늘 Todos 저장하기</button>
                <ul>
                    {todos.map(({ time, todo }, idx) =>
                        // prettier-ignore
                        <li key={idx}>
                            <h2> 
                                { `${('' + (time)).padStart(2,'0')}:00 ~ ${('' + (time + 1)).padStart(2,'0')}:00` }
                            </h2>
                            { time === 12 ? <p>중식</p> : <input type='text' maxLength={100} defaultValue={todo} data-id={time}/> }
                        </li>
                    )}
                </ul>
            </form>
        </>
    );
}
