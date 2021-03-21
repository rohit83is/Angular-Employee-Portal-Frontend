import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {   
  
  private baseURL = "http://localhost:92/employeePortal/api/employees"; 
  private allURL = "http://localhost:92/employeePortal/api/allemployees";
  private updateURL = "http://localhost:92/employeePortal/api/update";
  private uploadURL = "http://localhost:92/employeePortal/api/upload";
  private imageURL = "http://localhost:92/employeePortal/api/image";
  private validationURL = "http://localhost:92/employeePortal/api/validation";
  private deleteURL = "http://localhost:92/employeePortal/api/delete";
  private resetPasswordURL = "http://localhost:92/employeePortal/api/resetPassword";
  http: any;
  
  constructor(private httpClient: HttpClient) {         
  }

getEmployeeList(emailId :String, role : String, technology : String) : Observable<Employee[]>{
    return this.httpClient.get<Employee[]> (`${this.allURL}/${emailId}/${role}/${technology}`);
}

createEmployee(employee : Employee) : Observable<any> {
  return this.httpClient.post(`${this.baseURL}`,employee);
}

updateEmployee(employee : Employee) : Observable<any>  {
  return this.httpClient.post(`${this.updateURL}`,employee);
} 

validateEmployee(emailId : String,password : String) : Observable<any>{
  return this.httpClient.get<Employee> (`${this.validationURL}/${emailId}/${password}`);
}

employeeDetails(emailId : String): Observable<any> {
  return this.httpClient.get<Employee>(`${this.baseURL}/${emailId}`);
}

deleteEmployee(emailId : String) : Observable<any> {
  return this.httpClient.delete(`${this.deleteURL}/${emailId}`);
}

saveImage(uploadImageData: FormData) : Observable<any> {
  return this.httpClient.post(`${this.uploadURL}`,uploadImageData);
}

getImage(emailId: string) {
  return this.httpClient.get<any>(`${this.imageURL}/${emailId}`);
}

resetPassword(emailId: string) {
  return this.httpClient.get<Employee>(`${this.resetPasswordURL}/${emailId}`);
}
}

