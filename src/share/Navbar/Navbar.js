
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';


const Navbar = () => {
    const { user, logOut, google } = useContext(AuthContext)


    const navItem = <>

        <li className=' text-white'><Link to={'/about'}>About</Link></li>
        <li className=' text-white'><Link to={'/'}>Media</Link></li>
        <li className=' text-white'><Link to={'/message'}>Message</Link></li>


    </>
    const googleHandler = () => {
        google()
            .then(result => {
                const user = result.user;
                console.log(user)
            })
            .catch(console.error())
    }
    const logOuthandler = () => {
        logOut()
            .then(() => { })
            .catch(console.error())
    }
    return (
        <div className="navbar  justify-between bg-[#3333FF]">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className=" menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navItem}
                    </ul>
                </div>
                <p style={{ background: 'none', border: 'none' }} className="btn  btn-white  normal-case text-xl" >Friends-Media</p>

            </div>
            <div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItem}
                    </ul>
                </div>
                <div className="dropdown dropdown-end">
                    {

                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL} alt='' />
                            </div>
                        </label>
                    }
                    <ul tabIndex={0} className="menu text-black menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <p className="justify-between">
                                <Link to={'/profile'}>add information</Link>

                            </p>
                        </li>
                        <li><Link to={'/register'}>Sign Up</Link></li>
                        <li>
                            <Link onClick={logOuthandler}>
                                LogOut
                            </Link>
                        </li>
                        <li>
                            <Link to={'/login'}>
                                Sign In
                            </Link>
                        </li>
                        <li><Link onClick={googleHandler} style={{ background: '#EA4335' }}>Cotinue Google</Link></li>
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default Navbar;