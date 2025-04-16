import './index.css';
import HomePage from '../components/HomePage';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import QuizPage from '../components/QuizPage';
import Analytics from '../components/Analytics';
import Profile from '../components/Profile';
import Questions from '../components/Questions';
import LoginPage from '../components/LoginPage';



const root = createRoot(document.getElementById('root'));

const router = createBrowserRouter(
  [{
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/Quiz',
    element: <QuizPage />,
  },
  {
    path: '/Analytics',
    element: <Analytics />,
  }, 
  {
  path: '/Profile',
  element: <Profile />,
  },
  {
    path: '/Questions',
    element: <Questions />,
  }, 
  {
    path: '/Login',
    element: <LoginPage />,
  }
]
)


root.render(
  <>
    <RouterProvider router={router} />
  </>
);