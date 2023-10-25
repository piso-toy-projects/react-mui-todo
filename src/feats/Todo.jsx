import { useState } from 'react';

import { saveTodos } from './TodosAPI';

import Alarm from './Alarm';

export default function Todo() {
    const [isAlarm, setIsAlarm] = useState(false);

    /**
     * Todo가 9시부터 10시까지 고정.
     * So; 배열을 todos란 변수에 할당
     * */
    const todos = [
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

    const handleTodosChange = (e) => {
        // 이벤트가 발생시 임시저장 처럼 자동적으로 저장
    };

    /**
     * Todo를 저장하는 이벤트를 담당하는 함수
     * @param {*} e
     */
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsAlarm(true);
        saveTodos([...e.target.todo].map((todo, idx) => ({ time: idx + 9, todo: todo.value })));
    };

    return (
        <>
            <h1>Welcome Todo Page</h1>
            <Alarm isAlarm={isAlarm} setIsAlarm={setIsAlarm} />
            <form onChange={handleTodosChange} onSubmit={handleFormSubmit}>
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
