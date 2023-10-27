import { useEffect, useState } from 'react';

import { saveTodos, getTodayTodos, formattedTime } from './TodosAPI';

import { Box, Checkbox, List, Typography, ListItem, ListItemText, TextField, Button } from '@mui/material';
import { NoteAlt, SaveAlt } from '@mui/icons-material';

import Alarm from './Alarm';

/**
 * Todo 페이지 또는 Todo 기능을 위한 함수
 * @returns {JSX.Element} Todo Component
 */
export default function Todo() {
    /** @type {React.Dispatch<React.SetStateAction<boolean>>} */
    const [isAlarm, setIsAlarm] = useState(false);
    /** @type {React.Dispatch<React.SetStateAction<boolean>>} */
    const [alarMsg, setAlarMsg] = useState('');
    /** @type {React.Dispatch<React.SetStateAction<{time:string, todod:string, checked: boolean}[]>>} */
    const [todos, setTodos] = useState(getTodayTodos());

    /** 컴포넌트가 마운트 되고 한번만 실행할 때 setInterval로 10분마다 자동저장되도록 하는 이펙트
     * @param {function} effect
     * @return {void} */
    useEffect(() => {
        const interval = setInterval(() => {
            setIsAlarm(true);
            setAlarMsg('오늘의 Todo를 저장했습니다.(자동 저장)');
        }, 600000);

        return () => clearInterval(interval);
    }, []);

    /**
     * Todo를 저장하는 이벤트를 담당하는 함수
     * 1. Form에서 Todo들을 모아서 배열화한다.
     * 2. Todos 상태를 업데이트 후, 서버(스토리지)에 저장한다.
     * 3. 알람을 띄운다.
     * @param {Event} e */
    const handleFormSubmit = (e) => {
        e.preventDefault();

        // 1. Form에서 Todo들을 모아서 배열화한다. ipnut과 checkbox들
        const todoInputs = Array.from(e.target.querySelectorAll('[name="todo"]'));
        const todoChecks = Array.from(e.target.querySelectorAll('[name="todocheck"]'));

        // 새로운 Todos를 생성한다.
        const newTodos = todos.map((_, idx) => ({
            time: idx + 9,
            todo: todoInputs.map((todoInput) => todoInput.value),
            checked: todoChecks[idx < 3 ? idx : idx - 1].checked,
        }));

        // 2. Todos 상태를 업데이트 후, 서버(스토리지)에 저장한다.
        setTodos(newTodos);
        saveTodos(newTodos);

        // 3. 알람을 띄운다.
        setIsAlarm(true);
        setAlarMsg('오늘의 Todo를 저장했습니다.');
    };

    /**
     * 체크박스가 체크되거나 풀릴 때의 이벤트를 정의하는 함수
     * 1. Form에서 Todo들을 모아서 배열화한다.
     * 2. Todos 상태를 업데이트 후, 서버(스토리지)에 저장한다.
     * 3. 알람을 띄운다.
     * @param {Event} e */
    const handleChange = (e) => {
        const todosId = +e.target.dataset.id;
        setTodos(todos.map((todo) => (todo.time === todosId ? { ...todo, checked: e.target.checked } : todo)));
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Typography variant="h2" component="h1">
                오늘의 Todos는 ??
            </Typography>
            <Alarm isAlarm={isAlarm} setIsAlarm={setIsAlarm} msg={alarMsg} />
            <form onSubmit={handleFormSubmit} style={{ width: '80%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <Button
                        type="submit"
                        variant="outlined"
                        endIcon={<SaveAlt />}
                        disabled={isAlarm}
                        sx={{ alignSelf: 'end' }}
                    >
                        오늘의 Todos 저장하기
                    </Button>

                    <List sx={{ width: 1 }}>
                        {todos.map(({ time, todo, checked }) =>
                            // prettier-ignore
                            time === 12 
                            ? <ListItem key={time}><ListItemText primary={'중식'}></ListItemText></ListItem>
                            : <ListItem 
                                key={time}
                                secondaryAction={<Checkbox 
                                                    edge='end' name='todocheck' 
                                                    inputProps={{'data-id': time}} checked={checked} onChange={handleChange}/>}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%'}}>
                                        <NoteAlt sx={{ color: 'action.active', mr: 1, my: 0.5, fontSize:'3rem' }} />
                                        <TextField 
                                            id="input-with-sx" name="todo" label={formattedTime(time)}
                                            sx={{flexGrow:1}} variant='outlined'
                                            maxLength={100} defaultValue={todo} disabled={checked} />
                                    </Box>
                            </ListItem>
                        )}
                    </List>
                </Box>
            </form>
        </Box>
    );
}
