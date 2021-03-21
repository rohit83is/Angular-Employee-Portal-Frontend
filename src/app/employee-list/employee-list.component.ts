import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee} from '../employee';
import { EmployeeService } from '../employee.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  
  dataSource = [];
  employees : Employee[];
  emailId: string;  
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'phone', 'website', 'status'];
  role1 : string;
  employee : Employee = new Employee();

  constructor(private route: ActivatedRoute, private employeeService : EmployeeService,private router: Router) { }

  ngOnInit(): void {    
    this.emailId = this.route.snapshot.params['emailId'];
    this.getEmployees();    
    this.dataSource = this.employees;
  }

  reloadData() {
    this.getEmployees(); 
  }

  private getEmployees() {
    this.employeeService.getEmployeeList('All','All', 'All').subscribe(data => { this.employees = data;      
    });
  }
  public deleteEmployee(emailId : String) {
      this.employeeService.deleteEmployee(emailId).subscribe(data => {
        console.log(data);
        this.reloadData();      
    });  
  }
  public updateEmployeeDetails(emailId : String) {
    this.router.navigate(['/details',emailId]);
  }

 onChange(role : string | undefined | null, technology : string | undefined | null) {
   if (role == " ") {
     role = "All"
   } 
   if (technology == " ")  {
     technology = "All"
   }

    this.employeeService.getEmployeeList("All", role, technology).subscribe(data => { this.employees = data;
  });
}
}
