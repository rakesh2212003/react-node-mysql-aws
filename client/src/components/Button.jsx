import React from 'react'
import { motion } from 'framer-motion'

import { click } from '../animations'

const Button = ({ type, name }) => {
    return (
        <motion.button
            {...click}
                type={type}
                className='w-full bg-red-600 py-3 rounded-xl text-lg text-white cursor-pointer font-semibold drop-shadow-lg'
            >
                {name}
        </motion.button>
    )
}

export default Button