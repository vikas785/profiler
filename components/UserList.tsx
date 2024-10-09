import React, {useState, useEffect, useContext} from 'react'
import { BsArrowLeft, BsFillPersonFill } from "react-icons/bs";
import axios from 'axios'
import { userProps } from './UserDetails';
import { UserContext } from '@/context/UserContext';

const UserList = () => {
    const [leftBarOpen, setLeftBarOpen] =useState<Boolean>(true)

    const [userList, setUserList] = useState<userProps[]>()
    const {userId, setUserId} = useContext(UserContext);

    const fetchUserList = async()=>{
      try {
          const response = await axios.get<userProps[]>("http://localhost:3001/users");  
          setUserList(response.data);
        } catch (error) {
          if (error instanceof Error) {
              console.log('axios error')
          }
        }
  }

  useEffect(()=>{
    // console.log('check',userId)
      fetchUserList()
  },[])
  // useEffect(()=>{console.log('userList', userList)},[userList])

  return (
    <div className={`h-screen bg-primary duration-300 text-white ${leftBarOpen?'w-48':'w-16'} relative p-4`}>
          <BsArrowLeft className={`bg-white text-primary rounded-full absolute -right-3 top-9 text-2xl font-bold border-2 border-dark-primary cursor-pointer ${!leftBarOpen && 'rotate-180'}`} onClick={()=>{setLeftBarOpen(!leftBarOpen)}} />

            <div className={`bg-white rounded-md h-96 duration-300 ${!leftBarOpen && 'hidden'}`}>
              <h1 className='text-primary md:text-lg lg:text-2xl py-1 md:px-2 lg:px-4 underline'>
                User List
              </h1>

              { userList?.map((item,index)=>{
                return <div key={index} className='text-primary md:text-base lg:text-xl px-4  py-2 cursor-pointer' onClick={()=>{
                  setUserId(item.id)
                  // console.log('selected user', item.id)
                  }}>
                  {item.profile.name}
                </div>
              })}


            </div>
          
        </div>
  )
}

export default UserList