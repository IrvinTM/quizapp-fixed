import { useState } from 'react';
import { faAddressCard,
    faBuilding,
    faGear, 
    faHome, 
    faPerson, 
    faMoneyBill,
    faWater, 
    faBriefcase,
    faFolder,
    faChalkboard, 
    faStar,
    faFileExcel,
    faChartPie, 
    faAward} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBar from './NavBar'
import Footer from './Footer'
import Sidebar, { SidebarItem } from "./Sidebar";

import Cards from './Cards';


export default function EmployeeProfile(){
    const [expanded, setExpanded] = useState(true);

    return(
        <>
          <NavBar/>
            <div className="flex h-screen bg-black">

            <Sidebar expanded={expanded} setExpanded={setExpanded}>
            <SidebarItem icon={<FontAwesomeIcon icon={faHome} />} text="Home"  className="text-white"/>
            <SidebarItem icon={<FontAwesomeIcon icon={faAddressCard} />} text="Profile"  />
            <hr/>
            <SidebarItem icon={<FontAwesomeIcon icon={faPerson} />} text="People"  />
            <SidebarItem icon={<FontAwesomeIcon icon={faMoneyBill} />} text="Payroll"  />
            <SidebarItem icon={<FontAwesomeIcon icon={faWater} />} text="Time Off"  />
            <hr/>
            <SidebarItem icon={<FontAwesomeIcon icon={faBriefcase} />} text="Recruiting"  />
            <SidebarItem icon={<FontAwesomeIcon icon={faFolder} />} text="Documents"  />
            <SidebarItem icon={<FontAwesomeIcon icon={faChalkboard} />} text="Training"  />
            <hr/>
            <SidebarItem icon={<FontAwesomeIcon icon={faStar} />} text="Surveys"  />
            <SidebarItem icon={<FontAwesomeIcon icon={faChartPie} />} text="Peformance"  />
            <hr/>
            <SidebarItem icon={<FontAwesomeIcon icon={faFileExcel} />} text="Reporting"  />
            <SidebarItem icon={<FontAwesomeIcon icon={faAward} />} text="Benifits"  />
            <SidebarItem icon={<FontAwesomeIcon icon={faBuilding} />} text="Company"  />
            <SidebarItem icon={<FontAwesomeIcon icon={faGear} />} text="Settings"  />


            </Sidebar>
            <Cards/>
            </div> 
            <Footer/>

        </>
    )
}