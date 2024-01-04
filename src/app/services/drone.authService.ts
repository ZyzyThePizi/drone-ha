import * as jwt_decode from 'jwt-decode'

export class AuthService {

    role!: any
    token:string | null  = localStorage.getItem('token')

   public  isDataClerk(): boolean{
    if(this.token !=null){
        this.role =  jwt_decode.jwtDecode(this.token)
        return  this.role.roles == 'ROLE_DATA-ENTRY-CLERK'    
      }
      return false
    }   

    public isDataManager(): boolean{
        if(this.token !=null){
            this.role =  jwt_decode.jwtDecode(this.token)
            return  this.role.roles == 'ROLE_DATA-ENTRY-MANAGER'    
          }
        return false
    }   
  
    public isAdmin(): boolean {
        if(this.token !=null){
            this.role =  jwt_decode.jwtDecode(this.token)
            return this.role.roles == 'ROLE_ADMIN'    
          }
        return false
    }   
}