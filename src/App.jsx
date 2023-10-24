import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Todo from './feats/Todo';
import Todos from './feats/Todo';

function App() {
    return (
        <BrowserRouter>
            <Link to={'/'}>Todo</Link>
            <Link to={'/todos'}>Todos</Link>

            <Routes>
                <Route path={'/'} element={<Todo />} />
                <Route path={'/todos'} element={<Todos />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
