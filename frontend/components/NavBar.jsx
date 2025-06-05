import quasar from '../src/assets/quasar.png';


export default function NavBar() {
    return (
        <div className="bg-[oklch(0.257_0.09_281.288)] w-[100vw] ]">
            <nav className="flex flex-wrap items-center py-4 px-4">
                <a href="/" className="text-4xl font-bold text-[oklch(0.359_0.144_278.697)] hover:text-blue-500">Quizar</a>
                <img src={quasar} alt="Logo"  className='h-6 w-14 mt-3 ml-1 object-cover rounded-lg'/>
                <ul className="flex flex-wrap gap-4 text-xl justify-between ml-auto">
                    <li><a href="/home" className="text-[oklch(0.359_0.144_278.697)] hover:text-blue-500">Home</a></li>
                    <li><a href="/Quiz" className="text-[oklch(0.359_0.144_278.697)] hover:text-blue-500">Quiz</a></li>
                    <li><a href="/Analytics" className="text-[oklch(0.359_0.144_278.697)] hover:text-blue-500">Analytics</a></li>
                    <li><a href="/Profile" className="text-[oklch(0.359_0.144_278.697)] hover:text-blue-500">Profile</a></li>
                </ul>
            </nav>
        </div>
    );
}
