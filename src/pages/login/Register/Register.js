import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';



const Register = () => {
    const navigate = useNavigate()
    const { signUp, updateuser } = useContext(AuthContext)
    console.log(signUp)
    const imghostkey = process.env.REACT_APP_imghost_key;

    const [registererror, setRegsiterError] = useState('')
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    // sign process
    const SignUpHandler = (data) => {
        // image upload in
        const image = data.image[0]
        const formdata = new FormData();
        formdata.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imghostkey}`

        signUp(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                console.log(user)
                fetch(url, {
                    method: 'POST',
                    body: formdata,
                })
                    .then(res => res.json())
                    .then(imgdata => {
                        console.log(imgdata)
                        const userphoto = imgdata.data.url;
                        console.log(userphoto)
                        const update = {
                            displayName: data.name,
                            photoURL: userphoto
                        }
                        console.log(update)
                        updateuser(update)
                            .then(() => {
                                const user = {
                                    name: data.name,
                                    profession: data.Profession,
                                    email: data.email,
                                    img_url: userphoto
                                }
                                fetch('https://friends-media-server.vercel.app/all-user', {
                                    method: 'POST',
                                    headers: {
                                        'content-type': 'application/json'
                                    },
                                    body: JSON.stringify(user)
                                })
                                navigate('/media')
                                toast.success('user create succesfully complete!')
                            })
                            .catch(console.error())

                    })
                    .catch(console.error())

            })
            .catch(error => {
                const message = error.message;
                setRegsiterError(message)
                console.log(message)
            })

    }
    return (
        <div>
            <div className=' h-[700px]  flex items-center justify-center '>

                <div className=' rounded-xl py-6 px-9 shadow-2xl'>
                    <h2 className='text-center text-2xl'>Sign Up</h2>

                    <form
                        onSubmit={handleSubmit(SignUpHandler)}
                        className='drop-shadow-xl' action="">
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                {...register("name", { required: "please provide username" })}
                                type="text" placeholder="Type your Name" className="input    w-80 " />
                            {errors.name && <p className='text-red-500'>{errors.name?.message}</p>}
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Profession</span>
                            </label>
                            <input
                                {...register("Profession", { required: "please provide Profession" })}
                                type="text" placeholder="Type your Name" className="input   w-80 " />
                            {errors.Profession && <p className='text-red-500'>{errors.Profession?.message}</p>}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                {...register("email", { required: "Email Address is required" })}
                                type="text" placeholder="Type Your Email" className="input   w-80" />
                            {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                {...register("password", {
                                    required: "passoword should be provide",
                                    minLength: { value: 6, message: 'password should be 6 character of longer' },
                                    pattern: {
                                        value: /(?=.*[!@#$*])(?=.*[0-9])(?=.*[a-z].*[a-z])/,
                                        message: `password must be strong`
                                    }
                                })}
                                type="password" placeholder="Type your Password" className="input  w-80" />
                            <label className="label">
                                <span className="label-text-alt">forget password ?</span>
                            </label>
                            {errors.password && <p className='text-red-500'>{errors.password?.message}</p>}
                            <p className='text-red-600'>{registererror}</p>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">profile picture</span>
                            </label>
                            <input
                                {...register("image", { required: "photo is required" })}
                                type="file" className="input  w-80" />
                            {errors.image && <p className='text-red-500'>{errors.image?.message}</p>}
                        </div>
                        <button
                            style={{ background: '#3333FF' }}
                            type='submit'
                            className="btn mt-3 w-full">Sign Up</button>
                        <p className='mt-6'>Already have an account ? <span className=' text-[#17D2BD]'>please login</span> </p>
                        <div className="divider">OR</div>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default Register;