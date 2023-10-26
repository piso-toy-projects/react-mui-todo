import { Link as RouterLink, useLocation } from 'react-router-dom';

import { Box, IconButton, Link } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

export default function Links({ toggleTheme, theme }) {
    const { pathname } = useLocation();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
            <Link component={RouterLink} to={'/'} underline={pathname === '/' ? 'always' : 'hover'}>
                Todo
            </Link>
            <Link component={RouterLink} to={'/todos'} underline={pathname === '/todos' ? 'always' : 'hover'}>
                Todos
            </Link>

            <IconButton onClick={toggleTheme} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
        </Box>
    );
}
