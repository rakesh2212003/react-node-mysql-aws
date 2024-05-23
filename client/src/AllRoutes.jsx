import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Auth } from './pages'

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/auth' element={<Auth />} />
        </Routes>   
    )
}

export default AllRoutes