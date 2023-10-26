import { useEffect, useState } from 'react';

import { saveTodos, getTodayTodos, formattedTime } from './TodosAPI';

import { Box, Checkbox, List, Typography, ListItem, ListItemText, TextField, Button } from '@mui/material';
import { NoteAlt, SaveAlt } from '@mui/icons-material';

import Alarm from './Alarm';

export default function Todo() {
    const [isAlarm, setIsAlarm] = useState(false);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        setTodos(getTodayTodos());

        const interval = setInterval(() => {
            console.log('wjwkd');
        }, 600000);

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

        const checks = [...e.target.todocheck];
        const todoStr = [...e.target.todo];

        const newTodos = todos.map((_, idx) => ({
            time: idx + 9,
            todo: todoStr[idx < 3 ? idx : idx - 1].value,
            checked: checks[idx < 3 ? idx : idx - 1].checked,
        }));

        setIsAlarm(true);
        setTodos(newTodos);
        saveTodos(newTodos);
    };

    const handleChange = (e) => {
        const checkdTodoId = +e.target.dataset.id;

        const updatedTodos = todos.map((todo) =>
            todo.time === checkdTodoId ? { ...todo, checked: e.target.checked } : todo
        );

        setTodos(updatedTodos);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Typography variant="h2" component="h1">
                오늘의 Todos는 ??
            </Typography>
            <Alarm isAlarm={isAlarm} setIsAlarm={setIsAlarm} msg={'오늘의 Todo를 저장했습니다.'} />
            <form onSubmit={handleFormSubmit} onChange={handleChange} style={{ width: '80%' }}>
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
                                secondaryAction={<Checkbox edge='end' name='todocheck' inputProps={{'data-id': time}} checked={checked}/>}>
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
