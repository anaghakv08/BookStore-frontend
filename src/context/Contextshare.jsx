import React, { createContext, useState } from 'react'

export const userProfileUpdateContext = createContext()
export const adminProfileUpdateContext = createContext()



function ContextShare({ children }) {
    // update admin

    const [adminProfileUpdateStatus, setAdminProfileUpdateStatus] = useState({})

    const [userProfileUpdatestatus, setuserProfileUpdatestatus] = useState({})

    return (
        <userProfileUpdateContext.Provider value={{ userProfileUpdatestatus, setuserProfileUpdatestatus }}>
            <adminProfileUpdateContext.Provider value={{ adminProfileUpdateStatus, setAdminProfileUpdateStatus }}>
                {children}
            </adminProfileUpdateContext.Provider>
        </userProfileUpdateContext.Provider>


    )
}

export default ContextShare
