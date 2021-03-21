import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  emailId : string;
  infoMessage: string;

  constructor(private employeeService : EmployeeService,  
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  resetPassword(): void {
    this.employeeService.resetPassword(this.emailId).subscribe((data: Employee) => {
      console.log(data);       
      this.infoMessage = 'Reset Password Link sent to your email!!';      
    },
     );
  }
}
