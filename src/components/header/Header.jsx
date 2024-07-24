import React from 'react'
import Container from '../container/Container'
import Logo from '../Logo'
import LogoutBtn from './LogoutBtn'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  // useSelector is used to get data from the store
  // not  sure here if authStatus here works
  const authStatus=useSelector((state)=>state.auth.status)
  const navigate=useNavigate()

  const navItems=[
    {
      name: 'Home',
      slug:'/',
      active:true
    },
    {
      name: "Login",
      slug: "/login",
      // for login if authStatus is true then we are logged
      //  in then we dont need to show login signin
      active: !authStatus,
    },
    {
        name: "Signup",
        slug: "/signup",
        active: !authStatus,
    },
    {
        name: "All Posts",
        slug: "/all-posts",
        active: authStatus,
    },
    {
        name: "Add Post",
        slug: "/add-post",
        active: authStatus,
    },
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'/>

            </Link>
          </div>
          {/* ul is unordered list and <li> are inidvidual items in it */}
          <ul className='flex ml-auto'>
            {/* <this is for navigation */}
             {navItems.map((item)=>(
              item.active? (
                <li key={item.name}>
                  <button
                  onClick={(()=>navigate(item.slug))}
                  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >
                    {item.name}
                  </button>

                </li>
              ):null
             ))}
             {/* if authStatus is true then */}
             {authStatus&& (
              <li>
                <LogoutBtn/>
              </li>
             )}
          </ul>
        </nav>
      </Container>

    </header>
  )
}

export default Header