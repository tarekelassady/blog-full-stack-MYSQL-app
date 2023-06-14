import {createBrowserRouter,RouterProvider,Route,Outlet} from 'react-router-dom';
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Single from "./pages/Single"
import Write from "./pages/Write"
import Error404 from "./pages/Error404"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import "./style.scss"


const Layout=()=>{
  return(
    <>
    <NavBar />
    <Outlet />
    <Footer />
    </>
  )
}
const router=createBrowserRouter([
  {
    path:"/",
    element: <Layout />,
    children:[
      {
        path:"/",
        element:<Home />
      },      
      { 
        path:"/post/:id",
        element: <Single/>
      },
      {
        path:"/write",
        element: <Write/>
      },
    ]
  },
  {
    path:"/register",
    element: <Register/>
  },
  {
    path:"/login",
    element: <Login/>
  },
  {
    path:"*",
    element: <Error404/>
  },


]);
function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router}/>
      </div>
    </div>
  );
}

export default App;
