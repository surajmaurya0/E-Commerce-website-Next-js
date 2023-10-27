import { LoginFormInputI } from "@/Interface"

export const logIn = async(formData:LoginFormInputI) =>{
    try {
        const response = await fetch('/api/login',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(formData)
        })
        const data = response.json()
        return data
    } catch (error) {
        console.log(error)
    }

}