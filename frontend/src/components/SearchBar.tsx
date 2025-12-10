import { ChangeEvent, useState } from 'react';

interface SearchBarProps {
    onSearch: (term: string) => void;
    onClear: () => void;
    currentSearch: string;
}

export function SearchBar({ onSearch, onClear, currentSearch }: SearchBarProps) {
    const [inputValue, setInputValue] = useState(currentSearch);
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newInputValue = e.target.value;
        setInputValue(newInputValue)
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
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        placeholder="Buscar tareas..."
                        className="search-input"
                    />
                </div>
                <button type="submit" className="btn-search">
                    Buscar
                </button>
                {currentSearch && (
                    <button 
                        type="button" 
                        onClick={handleClear}
                        className="btn-clear"
                    >
                        Limpiar
                    </button>
                )}
            </div>
        </form>
    );
}