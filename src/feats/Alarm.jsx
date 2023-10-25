import { useEffect, useState } from 'react';

export default function Alarm({ isAlarm, setIsAlarm }) {
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

    return <>{isAlarm && <h1>알람중</h1>}</>;
}
