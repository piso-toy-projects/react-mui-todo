import { Box, Modal } from '@mui/material';
import { useEffect } from 'react';

export default function Alarm({ isAlarm, setIsAlarm, msg }) {
    useEffect(() => {
        if (isAlarm) {
            const timer = setTimeout(() => {
                setIsAlarm(false);
            }, 2500);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [isAlarm]);

    return (
        <Modal open={isAlarm}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                {msg}
            </Box>
        </Modal>
    );
}
