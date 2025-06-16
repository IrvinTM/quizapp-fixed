import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

// TODO add a loading icon during the login request
// TODO add the correct url for production




async function getUsers(username, password) {
  try {
    const response = await axios.post("http://localhost:8000/login", {
      username: username,
      password: password,
    });

    if (response.data.accessToken && response.data.accessToken.length > 0) {
      // Set the token in localStorage
      localStorage.setItem("accessToken", response.data.accessToken);

      // Redirect to home
      window.location.href = "/home";
    } else {
      alert("Invalid username or password");
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      toast("Invalid username or password");
    } else {
      alert("Something went wrong. Try again.");
    }
  }
}


function Login({ onSignUpClick }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-screen w-full flex items-center justify-center fixed z-100">
      <div className="container bg-white w-1/3 h-[60vh] rounded-2xl">
        <div className="ml-24">
          <h2 className="text-black text-4xl mt-10 mb-2"> Welcome</h2>
          <p className="text-black text-lg mb-4"> Please enter your details</p>
        </div>
        <div className="flex items-center justify-center">
          <label className="text-black text-xl mb-2">Username</label>
        </div>
        <div className="flex items-center justify-center">
          <input
            type="text"
            id="username"
            name="username"
            required
            minLength="4"
            maxLength="20"
            size="10"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-black border-2 w-1/2 text-black mb-4"
          />
        </div>
        <div className="flex items-center justify-center">
          <label className="text-black text-xl mb-2">Password</label>
        </div>
        <div className="flex items-center justify-center">
          <input
            type="password"
            id="password"
            name="password"
            required
            minLength="4"
            maxLength="20"
            size="10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-black border-2 w-1/2 text-black mb-4"
          />
        </div>

        <div className="flex items-center justify-center mt-4 mb-10">
          <button
            className=" text-white mr-4"
            onClick={() => getUsers(username, password)}
          >
            Log In
          </button>
          <button className=" text-white" onClick={onSignUpClick}>
            Sign Up
          </button>
        </div>

        <div className="flex items-center justify-center mt-4 mb-10">
          <a
            href="/"
            className="text-xl text-white border-2 px-4 py-4 border-black bg-black"
          >
            Proceed without data
          </a>
        </div>
      </div>
    </div>
  );
}

function SignUp({ onLoginClick }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sendNewUser = async () => {
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    const response = await axios.post("http://localhost:8000/signup", {
      username,
      email,
      password,
    });

    if (response.status === 200 || response.status === 201) {
      toast.success("Signup successful! You can now log in.");
      onLoginClick(); // redirect to login
    }
  } catch (error) {
    toast.error("Signup failed. Try again.");
    console.error(error);
  }
};

  return (
    <div className="h-screen w-full flex items-center justify-center fixed z-100">
      <div
        className="container bg-white w-1/2 h-[60vh] rounded-2xl"
      >
        <div className="ml-24">
          <h2 className="text-black text-4xl mt-10 mb-2">Sign Up</h2>
          <p className="text-black text-lg mb-4">
            {" "}
            Please fill in the required fields
          </p>
        </div>

        <div className="columns-2">
          <div className="flex items-center justify-center">
            <label className="text-black text-xl mb-2 w-1/2">Username</label>
          </div>
          <div className="flex items-center justify-center">
            <input
              type="text"
              id="name"
              name="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="4"
              maxLength="10"
              size="10"
              className="border-black border-2 w-1/2 text-black mb-4"
            />
          </div>
          <div className="flex items-center">
            <label className="text-black text-xl mb-2">Email</label>
          </div>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              minLength="4"
              maxLength="25"
              size="10"
              className="border-black border-2 w-1/2 text-black mb-4"
            />
          </div>
        </div>
        <div className="columns-2">
          <div className="flex items-center justify-center">
            <label className="text-black text-xl mb-2 w-1/2">Password</label>
          </div>
          <div className="flex items-center justify-center">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="8"
              maxLength="20"
              size="10"
              className="border-black border-2 w-1/2 text-black mb-4"
            />
          </div>
          <div className="flex items-center">
            <label className="text-black text-xl mb-2">Confirm Password</label>
          </div>
          <div>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength="8"
              maxLength="20"
              size="10"
              className="border-black border-2 w-1/2 text-black mb-4"
            />
          </div>
        </div>

        <div className="flex items-center justify-center mt-5 ">
          <button className=" text-white mr-5" onClick={onLoginClick}>
            Log In
          </button>
          <button className=" text-white ml-5" onClick={sendNewUser}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [init, setInit] = useState(false);
  const [activeSection, setActiveSection] = useState("login");

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

  const options = {
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
              value: [
                "\uf09b",
                "\uf3b8",
                "\uf41b",
                "\ue07a",
                "\uf1a0",
                "\uf0c2",
              ],
              weight: "400",
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
        <ToastContainer position="top-center" />

        <div className="h-screen w-full flex items-center justify-center fixed z-100">
          {activeSection === "login" ? (
            <Login onSignUpClick={() => setActiveSection("SignUp")} />
          ) : (
            <SignUp onLoginClick={() => setActiveSection("login")} />
          )}
        </div>
      </>
    );
  }
}
