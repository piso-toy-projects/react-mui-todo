import { useEffect, useState } from 'react';
import { deleteTodos, formattedTime, getTodosList } from './TodosAPI';
import {
    Box,
    Button,
    CardActions,
    List,
    ListItem,
    Typography,
    Card,
    CardContent,
    ListItemText,
    Chip,
} from '@mui/material';

import Alarm from './Alarm';

export default function Todos() {
    const [todosList, setTodosList] = useState([]);
    const [isAlarm, setIsAlarm] = useState(false);
    const [alarmMsg, setAlarmMsg] = useState(false);

    useEffect(() => {
        setTodosList(getTodosList());
    }, []);

    const handleDelete = (e) => {
        const selectedTodosId = e.target.id;
        const canDeleteTodos = deleteTodos(e.target.id);

        setAlarmMsg(
            canDeleteTodos ? `${selectedTodosId} Todos를 삭제합니다.` : '30일이 지나지 않아 삭제가 불가합니다.'
        );
        setIsAlarm(true);
        if (canDeleteTodos) setTodosList(getTodosList());
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Typography variant="h2" component="h1">
                Todos 로그
            </Typography>
            <Alarm isAlarm={isAlarm} setIsAlarm={setIsAlarm} msg={alarmMsg} />
            <List sx={{ width: '80%' }}>
                {todosList.map(({ id, todos }) => (
                    <ListItem key={id} sx={{ display: 'block' }}>
                        <Card variant="outlined" sx={{ p: 2 }}>
                            <Typography variant="h4" component="h2">
                                <Chip label={id} variant="outlined" />
                                's Todos
                            </Typography>
                            <CardContent>
                                <List spacing={1}>
                                    {todos.map((todo) => (
                                        <ListItem key={todo.time}>
                                            <ListItemText
                                                primary={todo.todo}
                                                secondary={formattedTime(todo.time)}
                                                primaryTypographyProps={{
                                                    style: {
                                                        fontSize: '1.5rem',
                                                        textDecoration: todo.checked ? 'line-through' : 'none',
                                                    },
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                <Button id={id} size="small" variant="outlined" onClick={handleDelete}>
                                    로그 삭제하기
                                </Button>
                            </CardActions>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
