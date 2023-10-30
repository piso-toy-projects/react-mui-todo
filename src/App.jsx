import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material';
import { useMediaQuery, CssBaseline } from '@mui/material/';

import Links from './feats/Links';
import Todo from './feats/Todo';
import Todos from './feats/Todos';

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
                <Links toggleTheme={toggleTheme} theme={theme} />
                <Routes>
                    <Route path={'/react-mui-todo'} element={<Todo />} />
                    <Route path={'/react-mui-todo/todos'} element={<Todos />} />
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
