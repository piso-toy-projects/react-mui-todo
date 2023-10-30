import { Link as RouterLink, useLocation } from 'react-router-dom';

import { Box, IconButton, Link, Typography } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

/**
 * Links component for 헤더와 라이트/다크 토글
 * @param {function} props.toggleTheme - Function to toggle the theme.
 * @param {object} props.theme - Current theme object.
 * @returns {JSX.Element} React component.
 */
export default function Links({ toggleTheme, theme }) {
    /** @type {string} */
    const { pathname } = useLocation();

    /**
     * - to: Route의 path 이름
     * - label: 링크 텍스트
     * @type {{to: string, label: string}} */
    const links = [
        { to: '/react-mui-todo', label: 'Todo' },
        { to: '/react-mui-todo/todos', label: 'Todos' },
    ];

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
            {links.map(({ to, label }) => (
                <Link key={to} component={RouterLink} to={to} underline={pathname === to ? 'always' : 'hover'}>
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
