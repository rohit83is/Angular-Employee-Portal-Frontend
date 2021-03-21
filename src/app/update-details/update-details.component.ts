import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.css']
})
export class UpdateDetailsComponent implements OnInit {
  employee: Employee = new Employee();  
  selectedFile: File;  
  userEmails = new FormGroup({
    primaryEmail: new FormControl('',[
      Validators.required,
     	Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    passwd: new FormControl(['',Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{8}$")]),
    mobileNr : new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    name: new FormControl(['',Validators.required]),    
    team: new FormControl(['',Validators.required]),
    role: new FormControl(['',Validators.required]),
    technology: new FormControl('',Validators.required)
    });

  constructor(private employeeService : EmployeeService,
    private router : Router ,private route: ActivatedRoute,private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  get mobile() {
    return this.userEmails.get('mobileNr')
  }

  get passd() {
    return this.userEmails.get('passwd')
  }
  updateEmployee() {    
   // this.employeeService.updateEmployee(this.employee).subscribe(data => {
   //   console.log(data);
   //   this.router.navigate(['login'], {queryParams: { registered: 'true' } });        
   // },
   // error => console.log(error));
  }

  onUpdate() {
    this.updateEmployee();
  }
}
