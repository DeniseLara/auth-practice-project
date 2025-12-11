import './SearchBar.css'
import { ChangeEvent, useState, useEffect } from 'react';
import { IoSearchOutline, IoCloseCircle } from 'react-icons/io5';


interface SearchBarProps {
    onSearch: (term: string) => void;
    onClear: () => void;
    currentSearch: string;
}

export function SearchBar({ onSearch, onClear, currentSearch }: SearchBarProps) {
    const [inputValue, setInputValue] = useState(currentSearch);

    // Debounce optimizado
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onSearch(inputValue);
        }, 300); // Reducido a 300ms para mejor respuesta

        return () => clearTimeout(timeoutId);
    }, [inputValue, onSearch]);

    // Sincronización cuando se limpia desde fuera
    useEffect(() => {
        setInputValue(currentSearch);
    }, [currentSearch]);
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(inputValue)
    };
    
    const handleClear = () => {
        setInputValue('');
        onClear();
    };
    
    return (
        <form onSubmit={handleSubmit} className="search-form">
            <div className="search-container">
                <div className="search-input-wrapper">
                    <IoSearchOutline className="search-icon" />
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        placeholder="Buscar tareas..."
                        className="search-input"
                    />
                    {inputValue && (
                        <button 
                            type="button" 
                            onClick={handleClear}
                            className="btn-clear-inline"
                            aria-label="Limpiar búsqueda"
                        >
                            <IoCloseCircle />
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
}