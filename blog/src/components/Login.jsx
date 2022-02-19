import React from 'react'

export default function Login() {


  //On Clicking LOGIN
  function login(event) {

    event.preventDefault()
    console.log("Login")
  }

  return (
    <main className='bg-gray-700 w-screen h-screen relative overflow-hidden no-select'>

      <div className='h-96 w-96 bg-gradient-to-r from-[#43e97b] to-[#38f9d7] rounded-full absolute left-2/3 bottom-2/3 animate-pulse'></div>
      <div className='h-96 w-96 bg-gradient-to-r from-[#fa709a] to-[#fee140] rounded-full absolute right-2/3 top-2/3 animate-spin'></div>

      <main className=' mt-24 mx-4 sm:mx-16 md:mx-32 lg:mx-56'>

        <section className='pb-12 sm:pb-32 pt-2 px-6 sm:px-12 bg-gray-500 rounded-lg shadow-lg backdrop-blur-sm z-2 bg-opacity-20 backdrop-filter border-t-2 border-l-2 border-gray-600 border-opacity-20 flex flex-col'>
          <h1 className='text-white uppercase text-xl sm:text-2xl mt-8 tracking-widest text-center'>Login to continue</h1>
          <form className='flex flex-col' autoComplete='off'>
            <div className="relative border-b-2 focus-within:border-blue-500 mt-24 duration-500">
              <input type="email" name="Email" className="text-white block appearance-none focus:outline-none bg-transparent w-[100%]" required />
              <label for="email" className="absolute top-0 -z-1 duration-500 origin-0 text-gray-400">Email</label>
            </div>
            <div className="relative border-b-2 focus-within:border-blue-500 duration-500 mt-12 sm:mt-24">
              <input type="password" name="password" className="text-white block appearance-none focus:outline-none bg-transparent w-[100%]" required />
              <label for="password" className="absolute top-0 -z-1 duration-500 origin-0 text-gray-400">Password</label>
            </div>
            <button className='mt-16 sm:mt-24 bg-blue-600 px-6 py-1 text-md sm:text-lg rounded-lg focus:scale-90 scale-100 transition-all delay-100 focus:text-lg cursor-pointer text-white font-thin uppercase' onClick={(event) => login(event)}>Login</button>
          </form>

        </section></main>


    </main>
  )
}
