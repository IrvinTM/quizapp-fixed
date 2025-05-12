import stockProfileImage from '../src/assets/profile.png'

    export default function ProfileCard() {
      return (
            <div className="flex flex-col text-center p-4 h-screen bg-black border-gray-800 border-4 drop-shadow-md rounded-lg">
                <img
                    className="w-[14vw] h-[14vw] rounded-full object-cover"
                    src={stockProfileImage}
                    alt="Profile"
                />
                <h2 className="font-bold text-2xl ">Julio Quintanilla</h2>
                <h3 className="text-lg font-medium text-gray-600 mb-2 mt-2">Full Stack Dev</h3>
                <hr/>
                <p className='text-gray-600 text-left self-start mt-5'>Status</p>
                <p className='text-gray-750 text-left self-start'>Onboarding</p>
                <p className='text-gray-600 text-left self-start mt-5'>Email:</p>
                <a className='text-blue-600 text-left self-start '>johndoe@gmail.com</a>
                <p className='text-gray-600 text-left self-start mt-5'>Phone Number</p>
                <p className='text-gray-750 text-left self-start '>416-564-4734</p>
                <p className='text-gray-600 text-left self-start mt-5'>Office</p>
                <p className='text-blue-600 text-left self-start'>207 Queens Quay, #400</p>

            </div>
        );
    }