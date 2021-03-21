import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  emailId : string;  
  employee : Employee;
  retrievedImage : any;
  retrieveResponse: any;
  base64Data: any;
  isEditable: boolean;
    constructor(private route: ActivatedRoute,private router: Router,private employeeService : EmployeeService) { }

  ngOnInit(): void {
    this.emailId = this.route.snapshot.params['emailId'];
    this.isEditable = true;
    this.employeeService.employeeDetails(this.emailId)
      .subscribe((data: Employee) => {
        console.log(data);
        this.employee = data;
        this.getImage();
      }, (error: any) => console.log(error));
  }

  showEditPage() : void {
    this.isEditable = false;
  }
  editDetails(): void {
    
    this.employeeService.updateEmployee(this.employee)
      .subscribe((data: Employee) => {
        console.log(data);
        this.employee = data;
        this.getImage();
        this.isEditable = true;
      }, (error: any) => console.log(error));
  }

  navigateToListPage() {
    this.router.navigate(['/employee-list',this.emailId]);
  }

  getImage() {
    this.employeeService.getImage(this.emailId)
     .subscribe((res: any) => {
        this.retrieveResponse = res;
        this.base64Data = this.retrieveResponse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
    }, (error: any) => console.log(error));    
  }
}
