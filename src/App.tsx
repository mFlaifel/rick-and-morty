import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CharactersPage } from './components/CharactersPage';
import { CharacterDetailsPage } from './components/CharacterDetailsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CharactersPage />} />
        <Route path='/character/:id' element={<CharacterDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
