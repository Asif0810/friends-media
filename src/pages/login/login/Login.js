import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';


const Login = () => {
    const { signIn } = useContext(AuthContext)
    let navigate = useNavigate();
    let location = useLocation();

    const [loginError, setLoginError] = useState('')
    const from = location.state?.from?.pathname || "/";
    const { register, handleSubmit, formState: { errors } } = useForm();

    const loginHandler = (data) => {
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user
                navigate(from, { replace: true });
                console.log(user)

            })
            .catch(error => {
                const errorMessage = error.message;
                setLoginError(errorMessage)
            })
    }

    return (

        <div className=' h-[700px]  flex items-center justify-center '>

            <div className=' rounded-xl py-6 px-9 shadow-2xl'>
                <h2 className='text-center text-2xl'>Sign In</h2>
                <form
                    onSubmit={handleSubmit(loginHandler)}
                    className='drop-shadow-xl' action="">

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register('email', { required: 'provide email address' })} type="email" placeholder="Type Your Email" className="input   w-80" />
                        {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}

                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register('password', { required: 'please provide password' })} type="password" placeholder="Type your Password" className="input  w-80" />
                        <label className="label">
                            <span className="label-text-alt">forget password ?</span>
                        </label>
                        {errors.password && <p className='text-red-500'>{errors.password?.message}</p>}
                        {loginError && <p className='text-red-500'>{loginError}</p>}
                    </div>
                    <button className="btn mt-3 w-full">Login</button>
                    <p className='mt-6'>New Doctor's Portal ? <span className=' text-[#17D2BD]'>Create a new account</span> </p>
                    <div className="divider">OR</div>

                </form>
                {/* <button className="btn w-full border-none" style={{ background: '#ea4335' }}> Continue with google</button> */}
            </div>

        </div>

    );
};

export default Login;