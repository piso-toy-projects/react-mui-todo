import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material';
import { useMediaQuery, CssBaseline } from '@mui/material/';

import Todo from './feats/Todo';
import Todos from './feats/Todos';
import { useState } from 'react';

const lightTheme = createTheme();
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    const [theme, setTheme] = useState(useMediaQuery('(prefers-color-scheme: dark)') ? darkTheme : lightTheme);

    const toggleTheme = () => {
        setTheme(theme === darkTheme ? lightTheme : darkTheme);
    };

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Link to={'/'}>Todo</Link>
                <Link to={'/todos'}>Todos</Link>
                <button onClick={toggleTheme}>ss</button>
                <Routes>
                    <Route path={'/'} element={<Todo />} />
                    <Route path={'/todos'} element={<Todos />} />
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
