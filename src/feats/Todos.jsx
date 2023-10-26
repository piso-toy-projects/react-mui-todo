import { useEffect, useState } from 'react';
import { formattedTime, getTodosList } from './TodosAPI';
import {
    Box,
    Button,
    CardActions,
    List,
    ListItem,
    Typography,
    Card,
    Divider,
    CardContent,
    ListItemText,
    Chip,
} from '@mui/material';

export default function Todos() {
    const [state, setState] = useState({ todosList: [] });

    useEffect(() => {
        setState({ todosList: getTodosList() });
    }, []);

    const { todosList } = state;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Typography variant="h2" component="h1">
                Todos 로그
            </Typography>
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
                                <Button size="small" variant="outlined">
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
