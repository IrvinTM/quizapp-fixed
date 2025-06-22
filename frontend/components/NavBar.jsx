import quasar from '../src/assets/quasar.png';
import { Outlet, Link } from "react-router-dom";



export default function NavBar() {
    return (
        <div className="bg-[oklch(0.257_0.09_281.288)] w-[100vw] ]">
            <nav className="flex flex-wrap items-center py-4 px-4">
                <Link to="/home" className="text-4xl font-bold text-[oklch(0.359_0.144_278.697)] hover:text-blue-500">Quizar</Link>
                <img src={quasar} alt="Logo"  className='h-6 w-14 mt-3 ml-1 object-cover rounded-lg'/>
                <ul className="flex flex-wrap gap-4 text-xl justify-between ml-auto">
                    <li><Link to="/home" className="text-[oklch(0.359_0.144_278.697)] hover:text-blue-500">Home</Link></li>
                    <li><Link to="/Quiz" className="text-[oklch(0.359_0.144_278.697)] hover:text-blue-500">Quiz</Link></li>
                    <li><Link to="/Analytics" className="text-[oklch(0.359_0.144_278.697)] hover:text-blue-500">Analytics</Link></li>
                    <li><Link to="/Profile" className="text-[oklch(0.359_0.144_278.697)] hover:text-blue-500">Profile</Link></li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
}
