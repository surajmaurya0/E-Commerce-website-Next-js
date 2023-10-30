export const validateUser = async (formData:any)=>{
    try{
      const response = await fetch('/api/validate-user',{
          method:'POST',
          headers:{
              'content-type':'application/json'
          },
          body:JSON.stringify(formData)
      })
      const finalData = response.json()
      return finalData
  
    }catch(e){
      console.log('error in registration',e)
    }
  }