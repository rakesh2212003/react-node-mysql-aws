import React, { useState } from 'react'

const Input = ({ id,label,type,inputState,inputStateFunction }) => {

    const [isFocus, setIsFocus] = useState(false);

    const handleChange = (e) => {
        inputStateFunction({
            ...inputState,
            [id] : e.target.value
        })
    }

    return (
        <div className={`relative w-full p-3 flex flex-col items-start justify-center border border-solid rounded-2xl transition-all duration-300 shadow-md
            ${isFocus
                ? 'border-zinc-800'
                : 'border-gray-300'
            }
        `}>
            <label
                htmlFor={id}
                className={`absolute pointer-events-none bg-white font-semibold transition-all duration-300
                ${isFocus || inputState[id]
                    ? '-translate-y-6 px-1 text-xs text-zinc-800'
                    : '-translate-y-0 px-0 text-base text-gray-400'
                }
                `}
            >
                {label}
            </label>

            <input
                id={id}
                type={type}
                value={inputState[id]}
                onChange={ handleChange }
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                className='w-full bg-transparent text-base font-medium'
            />

            

        </div>
    )
}

export default Input