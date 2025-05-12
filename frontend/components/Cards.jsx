import ProfileCard from "./ProfileCard";
import { useState } from "react";
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Placeholder components for other cards
function PayrollCard() {
    return <div className="p-4">Payroll Info</div>;
}
function TimeOffCard() {
    return <div className="p-4">Time Off Info</div>;
}

function Journey() {
    return <div className="p-4">Journey Info</div>;
}

function Performance() {
    return <div className="p-4">Performance Info</div>;
}

function More() {
    return <div className="p-4">This is where other something goes for more</div>;
}

const sections = [
    { name: "Personal", component: <ProfileCard /> },
    { name: "Job & Pay", component: <PayrollCard /> },
    { name: "Documents", component: <TimeOffCard /> },
    { name: "Journey", component:   <Journey /> },
    { name: "Performance", component: <Performance /> },
    { name: "More", component: <More /> },


];

export default function Cards() {
    const [activeSection, setActiveSection] = useState(0);

    return (
        <>
        <div className="flex h-screen">
            <div className="w-20" />   
             <div className="flex flex-col flex-1">
                 <h2 className="text-2xl font-bold ml-4 mt-2">Account Profile</h2>
                     <div className="flex space-x-4 p-4 border-b bg-black rounded-sm">
                    {sections.map((section, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 rounded ${
                                activeSection === index
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                            onClick={() => setActiveSection(index)}
                        >
                            {section.name}
                        </button>
                    ))}
                </div>

                <div className="flex flex-1 overflow-auto p-4 bg-black">
                {sections[activeSection].component}

                <div className="h-[100vh] grid-col-2 grid-rows-2">
                <div className="ml-20 w-[40vw] min-w-[300px] h-[40vh] border-2 border-gray-800 bg-black p-6 rounded-md shadow-sm relative">
                <p className="absolute top-5 right-0 size-16  ">{<FontAwesomeIcon icon={faPencil} />} </p>

                    <h2 className="text-2xl mb-6">Basic Information</h2>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <p className="text-gray-600">First Name</p>
                            <p className="font-medium">Julio</p>
                        </div>

                        <div className="flex justify-between">
                            <p className="text-gray-600">Last Name</p>
                            <p className="font-medium">Quintanilla</p>
                        </div>

                        <div className="flex justify-between">
                            <p className="text-gray-600">Phone Number</p>
                            <p className="font-medium">415-564-4374</p>
                        </div>

                        <div className="flex justify-between">
                            <p className="text-gray-600">Employee ID</p>
                            <p className="font-medium">5634</p>
                        </div>

                    </div>  
                    </div>
                    <div className="self-start ml-20 mt-5 h-[60vh] w-[40vw] min-w-[300px] border-2 border-gray-800 bg-black p-6 rounded-md shadow-sm relative">
                    <p className="absolute top-5 right-0 size-16  ">  {<FontAwesomeIcon icon={faPencil} />}  </p>
                    <h2 className="text-2xl mb-6">Personal Information</h2>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <p className="text-gray-600">Legal First Name</p>
                                <p className="font-medium">Julio</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="text-gray-600"> Legal Last Name</p>
                                <p className="font-medium">Quintanilla</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="text-gray-600">Phone Number</p>
                                <p className="font-medium">415-564-4374</p>
                            </div>

                            </div>
                        
                    </div>
                </div>
                
                        
            </div>
            </div>   
        </div>
    </>
    );
}