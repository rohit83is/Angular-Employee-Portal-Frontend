import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-tasks',
  templateUrl: './admin-tasks.component.html',
  styleUrls: ['./admin-tasks.component.css']
})
export class AdminTasksComponent implements OnInit {
  emailId: string;
  infoMessage = '';

  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.emailId = "admin@7n.com"; 
    this.route.queryParams
      .subscribe(params => {
        if(params.registered !== undefined && params.registered === 'true') {
            this.infoMessage = 'Registration Successful!';
        }

  })
    
  }

  handleRegistration() {
    this.navigateToEmployeeRegistration();
  }

  navigateToEmployeeRegistration() {
    this.router.navigate(['/create-employee']);    
  }

  viewEmployeeList() {
    this.navigateToListPage();
  

}  navigateToListPage() {
  this.router.navigate(['/employee-list',this.emailId]);
  }
}