import { Link as RouterLink, useLocation } from 'react-router-dom';

import { Box, IconButton, Link, Typography } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

export default function Links({ toggleTheme, theme }) {
    const { pathname } = useLocation();

    const links = [
        { to: '/', label: 'Todo' },
        { to: '/todos', label: 'Todos' },
    ];

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
            {links.map(({ to, label }) => (
                <Link component={RouterLink} to={to} underline={pathname === to ? 'always' : 'hover'}>
                    <Typography variant="h3" component={'span'}>
                        {label}
                    </Typography>
                </Link>
            ))}

            <IconButton onClick={toggleTheme} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
        </Box>
    );
}
