import React,{useState, useEffect}  from 'react'
import axios from 'axios'

interface profileProps {
        name: string,
        dob: string,
        address: string
}

interface contactProps{
    id: number,
    name:string,
    number: string,
    skypeid: string,
    email: string
}

export interface userProps {
    id: number,
    profile: profileProps,
    contacts: contactProps[]
}

const UserDetails = () => {
    const [userData,setUserData] = useState<userProps | null>(null)
    const [showProfile, setShowProfile] = useState<boolean>(true)

    const fetchUserData = async()=>{
        try {
            const response = await axios.get<userProps>("http://localhost:3001/users/1");  
            setUserData(response.data);
            
          } catch (error) {
            if (error instanceof Error) {
                console.log('axios error')
            }
          }

    }

    useEffect(()=>{
        fetchUserData()
    },[])

    useEffect(()=>{console.log('userData', userData)},[userData])

  return (
    <div className="p-7 grow">
        <div className="flex">
        <div className='w-1/3 px-5'>
            <table className='table-auto border w-full '>
                <tbody>
                <tr>
                    <div className={`w-full p-3 border-b ${showProfile && 'bg-primary text-white'}`} onClick={()=>setShowProfile(true)}>
                        Profile
                    </div>
                    <div className={`w-full p-3 border-b ${!showProfile && 'bg-primary text-white'} `} onClick={()=>setShowProfile(false)}>
                        Contacts
                    </div>
                </tr>  
                </tbody>
            </table>
            
        </div>
        {userData && <div className='w-2/3'>
            {showProfile && <div>

                <table className='table border w-80 text-center'>
                <tbody>
                <tr>
                    <td className={` p-3 border-b font-bold `}>
                        Name: 
                    </td>
                    <td className={` p-3 border-b `}>
                        {userData.profile.name}
                    </td>
                </tr>  
                <tr>
                    <td className={` p-3 border-b font-bold`}>
                        DOB: 
                    </td>
                    <td className={` p-3 border-b `}>
                        {userData.profile.dob}
                    </td>
                </tr>  
                <tr>
                    <td className={` p-3 border-b font-bold `}>
                        Address: 
                    </td>
                    <td className={` p-3 border-b `}>
                        {userData.profile.address}
                    </td>
                </tr> 
                </tbody>
            </table>

            </div>}

            {/* Contacts */}
            {!showProfile && <div>
             <table className='table border w-80 text-center'>
                <tbody>
                <tr>
                    <th className='p-3  border-b'>Name</th>
                    <th className='p-3  border-b'>Contact</th>
                    <th className='p-3  border-b'>Skype</th>
                    <th className='p-3  border-b'>Email Id</th>
                </tr>
                {userData?.contacts?.map((item,index)=>{
                return(
                <tr key={index}>
                    <td className={` p-3 border-b `}>
                        {item?.name}
                    </td>
                    <td className={` p-3 border-b `}>
                        {item?.number}
                    </td>
                    <td className={` p-3 border-b `}>
                        {item?.skypeid}
                    </td>
                    <td className={` p-3 border-b `}>
                        {item?.email}
                    </td>
                </tr>
                )})}   
                </tbody>
            </table>

            </div>}
        </div>
        }

        



        </div>
        

    </div>
  )
}

export default UserDetails