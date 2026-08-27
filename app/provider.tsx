"use client"
import { UserDetailContext } from '@/context/UserDetailContext'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Provider = ({ children }: { children: React.ReactNode }) => {

    const [userDetail, setUserDetail] = useState<any>();

    useEffect(() => {
        CreateNewUser();
    }, [])

    const CreateNewUser = async () => {

        const result = await axios.post("/api/users");
        console.log(result.data);
        setUserDetail(result.data);
    }

    return (
        <UserDetailContext value={{userDetail, setUserDetail}}>
            <div>
                {children}
            </div>
        </UserDetailContext>
    )
}

export default Provider
