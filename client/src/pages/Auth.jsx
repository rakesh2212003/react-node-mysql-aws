import React, { useState } from 'react'

import { Input, Button } from '../components'
import { RxAvatar } from '../assets/icons'

const Auth = () => {

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    })
    const [cpassword, setCpassword] = useState('');
    const [isSignup, setIsSignup] = useState(true);

    const uploadImage = (e) => {
        const imageFile = e.target.files[0]
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignup){
            if(formData.firstname === '' || formData.lastname === ''){
                alert('Please enter firstname and lastname')
            }
        }else{
            
        }
    }

    return (
        <div className='w-full min-h-screen h-auto flex flex-col justify-center items-center gap-4 bg-bgColor'>
            <h1 className='font-bold text-3xl'>Ne<span className='text-5xl text-red-600'>x</span>us Nest</h1>

            <form onSubmit={handleSubmit} className='w-[450px] p-4 flex flex-col justify-start items-center gap-4 bg-white rounded-2xl border shadow-md'>
                <caption className='text-3xl font-bold'>{isSignup ? 'Signup' : 'Login' }</caption>

                {isSignup &&(
                    <div>
                        <label>
                            <div className='flex flex-col items-center justify-center h-full w-full cursor-pointer'>
                                <RxAvatar className='text-[100px] '/>
                            </div>

                            <input
                                type="file"
                                name="upload-image"
                                accept="image/*"
                                className='w-0 h-0 hidden'
                            />
                        </label>
                    </div>
                )}

                {isSignup && (
                    <div className='w-full flex justify-center items-center gap-2'>
                        <Input
                            id={"firstname"}
                            label={"First Name"}
                            type={"text"}
                            inputState={formData}
                            inputStateFunction={setFormData}
                        />
                        <Input
                            id={"lastname"}
                            label={"Last Name"}
                            type={"text"}
                            inputState={formData}
                            inputStateFunction={setFormData}
                        />
                    </div>
                )}

                <div className='w-full flex justify-center items-center'>
                    <Input
                        id={"email"}
                        label={"Email"}
                        type={"email"}
                        inputState={formData}
                        inputStateFunction={setFormData}
                    />
                </div>

                <div className='w-full flex justify-center items-center gap-2'>
                    <Input
                        id={"password"}
                        label={"Password"}
                        type={"password"}
                        inputState={formData}
                        inputStateFunction={setFormData}
                    />
                    {isSignup && (
                        <Input
                            id={"cpassword"}
                            label={"Confirm Password"}
                            type={"password"}
                            inputState={formData}
                            inputStateFunction={setFormData}
                        />
                    )}
                </div>

                <div className='w-full flex items-center justify-center mt-4 mb-2'>
                    <Button
                        type={"submit"}
                        name={isSignup ? 'Signup' : 'Login'}
                    />
                </div>
            </form>

            <div className='flex justify-center items-center gap-2'>
            <p className='text-sm font-medium'>{isSignup ? 'Already have an account' : 'Don\'t have an account'}</p>
            {": "}
            <span
                onClick={() => setIsSignup(!isSignup)}
                className='text-sm font-semibold text-red-600 cursor-pointer'
            >
                {isSignup ? 'Signup' : 'Login'}
            </span>
            </div>
        </div>
    )
}

export default Auth