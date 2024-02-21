import React, { useState } from 'react';

const suggestions = ["btripsexpenses://", "sbolonline://", "sberbankonline://"];

const Autocomplete: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userInput = e.target.value;
        setInputValue(userInput);
        if (userInput === '') {
            setFilteredSuggestions(suggestions);
        } else {
            setFilteredSuggestions(suggestions.filter(
                (suggestion) => suggestion.toLowerCase().includes(userInput.toLowerCase())
            ));
        }
        setShowSuggestions(true);
        setActiveSuggestionIndex(0);
    };

    const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
        const target = e.target as HTMLLIElement;
        setInputValue(target.innerText);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        setActiveSuggestionIndex(0);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setInputValue(filteredSuggestions[activeSuggestionIndex]);
            setShowSuggestions(false);
            setActiveSuggestionIndex(0);
        } else if (e.key === 'ArrowUp') {
            if (activeSuggestionIndex === 0) return;
            setActiveSuggestionIndex(activeSuggestionIndex - 1);
        } else if (e.key === 'ArrowDown') {
            if (activeSuggestionIndex === filteredSuggestions.length - 1) return;
            setActiveSuggestionIndex(activeSuggestionIndex + 1);
        }
    };
    
    const handleBlur = () => {
        setTimeout(() => {
            setShowSuggestions(false);
        }, 100);
    }

    const handleFocus = () => {
        setTimeout(() => {
            setShowSuggestions(true);
        }, 100);
    }

    console.log('filteredSuggestions:', showSuggestions);

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className='relative'
                onBlur={handleBlur}
                onFocus={handleFocus}
            />
            {showSuggestions && (
                <ul className='absolute bg-white opacity-90 border rounded-md mt-1 z-1'>
                    {filteredSuggestions.map((suggestion, index) => (
                        <li
                            key={suggestion}
                            onClick={handleClick}
                            className={`${index === activeSuggestionIndex ? 'active' : ''} hover:bg-slate-200 py-1 text-sm px-3`}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Autocomplete;


