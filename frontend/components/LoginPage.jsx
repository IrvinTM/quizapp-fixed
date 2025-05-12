import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.

function Login({ onSignUpClick }){
    return (
    <div className="h-screen w-full flex items-center justify-center fixed z-100">
    <div className="container bg-white w-1/3 h-[60vh] rounded-2xl">
    <div className="ml-24">
    <h2 className="text-black text-4xl mt-10 mb-2"> Welcome</h2>
    <p className="text-black text-lg mb-4"> Please enter your details</p>
    </div>
    <div className="ml-24">
    <label className="text-black text-xl mb-2">Username</label>
    </div>
    <div className="ml-24">
    <input 
     type="text"
     id="name"
     name="name"
     required
     minLength="4"
     maxLength="10"
     size="10"
     className="border-black border-2 w-1/2 text-black mb-4"/>
     </div>
     <div className="ml-24">
    <label className="text-black text-xl mb-2">Password</label>
    </div>
    <div className="ml-24">
    <input 
     type="password"
     id="name"
     name="name"
     required
     minLength="4"
     maxLength="8"
     size="10"
     className="border-black border-2 w-1/2 text-black mb-4"/>
    </div> 

    <div className="flex items-center justify-center mt-4 mb-10">
    <button className=" text-white mr-4">Log In</button>
    <button className=" text-white" onClick={onSignUpClick}>Sign Up</button>
    </div>

    <div>
    <a href="/" className="ml-32 text-xl text-white border-2 rounded-e-4xl px-4 py-4 border-black bg-black">Proceed without data</a>
    </div>
    </div>
    </div>
    )
}


function SignUp(){
  return <p>Hello World</p>
}

export default function LoginPage(){

    const [init, setInit] = useState(false);
    const [activeSection, setActiveSection] = useState("login")
    
    useEffect(() => {
        initParticlesEngine(async (engine) => {
          await loadAll(engine);
        }).then(() => {
          setInit(true);
        });
      }, []);
      const particlesLoaded = (container) => {
        console.log(container);
      };
    
      const options= {
        key: "fontawesome",
        name: "Font Awesome",
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
            },
            modes: {
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: "#FFFFFF",
            },
            links: {
                blink: false,
                color: "#ffffff",
                consent: false,
                distance: 150,
                enable: true,
                opacity: 0.4,
                shadow: {
                    blur: 5,
                    color: "lime",
                    enable: false,
                },
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                speed: 2,
            },
            number: {
                density: {
                    enable: true,
                },
                value: 90,
            },
            opacity: {
                animation: {
                    enable: true,
                    speed: 1,
                    sync: false,
                },
                value: {
                    min: 0.1,
                    max: 0.9,
                },
            },
            shape: {
                options: {
                    char: [
                        {
                            fill: true,
                            font: "Font Awesome 5 Brands",
                            style: "",
                            value: ["\uf09b","\uf3b8" , "\uf41b", "\ue07a", "\uf1a0", "\uf0c2"],
                            weight: "400"
                          },
                         
                    ],
                },
                type: "char",
            },
            stroke: {
                color: "#ffffff",
                width: 1,
            },
            size: {
                value: 16,
            },
        },
        pauseOnBlur: true,
        background: {
            color: "#000000",
            image: "",
            position: "50% 50%",
            repeat: "no-repeat",
            size: "cover",
        },
    };
    
      if (init) {
        return (
        <>
          <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options}
          />
           <div className="h-screen w-full flex items-center justify-center fixed z-100">
         {activeSection === "login" ? (
          <Login onSignUpClick={() => setActiveSection("SignUp")} />
          ) : (
          <SignUp />
        )}
      </div>
        </>
    )
    }
}