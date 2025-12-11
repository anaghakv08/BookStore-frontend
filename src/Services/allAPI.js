import commonAPI from "./commonAPI"
import SERVERURL from "./serverURL"


export const registerAPI=async (reqBody)=>{
    return await commonAPI("POST" ,`${SERVERURL}/register`,reqBody)
}

// login

export const loginAPI=async (reqBody)=>{
    return await commonAPI("POST" ,`${SERVERURL}/login`,reqBody)
}

// google login 

export const googleLoginAPI =async (reqBody)=>{
    return await commonAPI("POST",`${SERVERURL}/google-login`,reqBody)
}

// get home book

export const getHomeBookAPI =async ()=>{
    return await commonAPI ("GET",`${SERVERURL}/home-books`)
}


// ------------user-------------


// add book

export const addBookAPI =async (reqBody,reqHeader)=>{
    return await commonAPI("POST" ,`${SERVERURL}/add-book`,reqBody,reqHeader)
}


// get all books

export const getAllBooksAPI =async ( searchKey,reqHeader)=>{
    return await commonAPI ("GET",`${SERVERURL}/all-books?search=${searchKey}`,{},reqHeader)
}

// get a book

export const getABookAPI =async(bookid,reqHeader)=>{
    return await commonAPI("GET",`${SERVERURL}/view-book/${bookid}`,{},reqHeader)
}

// get user add  books

export const getUserBooksAPI = async (reqHeader)=>{
    return await commonAPI ("GET",`${SERVERURL}/user-books`,{},reqHeader)
}

// delete user added book

export const deleteAUserAddedBookAPI = async (id)=>{
    return await commonAPI ("DELETE",`${SERVERURL}/delete-book/${id}`)
}


// purchased book

export const getPurchasedBookAPI =async (reqHeader)=>{
    return await commonAPI ("GET",`${SERVERURL}/purchase-history`,"",reqHeader)
}

//upadate profile

export const updateUserProfileAPI = async(reqBody,reqHeader)=>{
   return await commonAPI("PUT",` ${SERVERURL}/update-user-profile`,reqBody,reqHeader)

 }


//  make payment called view book when buy btn clicked

export const makePaymentAPI = async (reqBody,reqHeader)=>{
    return await commonAPI ("PUT" ,`${SERVERURL}/make-payment`,reqBody,reqHeader)
}


//  ----------admin---------

//get all book in admin

export const getAllBooksAdminAPI = async ()=>{
    return await commonAPI("GET",`${SERVERURL}/get-allbooks`)
}

// approve book


export const approveBookStatusAPI =async (id)=>{
    return await commonAPI ("PUT",`${SERVERURL}/update-book/${id}`)
}

// get all users 

export const getAllUsersAPI = async (reqHeader)=>{
   return await commonAPI ("GET",`${SERVERURL}/get-allusers`,{},reqHeader)
}

// update admin profile 

export const updateAdminProfileAPI =async (reqBody,reqHeader)=>{
    return await commonAPI ("PUT",`${SERVERURL}/update-admin-profile`,reqBody,reqHeader)
}