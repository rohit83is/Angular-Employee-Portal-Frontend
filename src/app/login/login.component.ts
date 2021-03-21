import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username : string;
  password : string;
  errorMessage = 'Invalid Credentials';
  successMessage : string;
  invalidLogin = false;
  loginSuccess = false;
  infoMessage = '';
  title = 'Welcome To Employee Portal!!';
  
  constructor(private employeeService : EmployeeService,  
    private router: Router, private route: ActivatedRoute
    ) { }

  
  ngOnInit(): void {   
    this.route.queryParams
      .subscribe(params => {
        if(params.registered !== undefined && params.registered === 'true') {
            this.infoMessage = 'Registration Successful! Please Login!';
        }

  })
}
  handleLogin() {
        this.employeeService.validateEmployee(this.username,this.password).subscribe((data: Employee) => {
        console.log(data);
        this.invalidLogin = false;
        this.loginSuccess = true;
        if (data.password === this.password) {
          if (this.username === "admin@7n.com") {
            this.navigateToAdminPage();
          } else {
            this.navigateToEmployeeDetails(this.username);
          }        
        } 
        else {
          this.invalidLogin = true;
          this.loginSuccess = false;
        }
     }, );    
  }

  
    //this.authenticationService.authenticationService(this.username, this.password).subscribe((result)=> {
   //   this.invalidLogin = false;
  //    this.loginSuccess = true;
   //   this.successMessage = 'Login Successful.';
  //    this.navigateToEmployeeDetails(this.username);
  //  }, () => {
  //    this.invalidLogin = true;
   //   this.loginSuccess = false;
  //  });      
  

  handleRegistration() {
    this.navigateToEmployeeRegistration();
  }
  
  navigateToEmployeeRegistration() {
    this.router.navigate(['/create-employee']);    
  }

  navigateToEmployeeDetails(emailId : String) {
    this.router.navigate(['/details',emailId]);
  }

  navigateToListPage() {
    this.router.navigate(['/employee-list',this.username]);
  }

  navigateToAdminPage() {
    this.router.navigate(['/admin']);
  }
  navigateToForgotPasswordPage() {
      this.router.navigate(['/forgot-password']);
  }
}
