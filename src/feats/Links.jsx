import { Link as RouterLink, useLocation } from 'react-router-dom';

import { Box, IconButton, Link, Typography } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

export default function Links({ toggleTheme, theme }) {
    const { pathname } = useLocation();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
            <Link component={RouterLink} to={'/'} underline={pathname === '/' ? 'always' : 'hover'}>
                <Typography variant="h3" component={'span'}>
                    Todo
                </Typography>
            </Link>
            <Link component={RouterLink} to={'/todos'} underline={pathname === '/todos' ? 'always' : 'hover'}>
                <Typography variant="h3" component={'span'}>
                    Todos
                </Typography>
            </Link>

            <IconButton onClick={toggleTheme} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
        </Box>
    );
}
