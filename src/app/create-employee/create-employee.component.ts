import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from '../custom-validators';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
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
  public frmSignup: FormGroup;
  constructor(private employeeService : EmployeeService,
  private router : Router ,private route: ActivatedRoute,private fb: FormBuilder) { }

  ngOnInit(): void {
    
  }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  get primEmail(){
    return this.userEmails.get('primaryEmail')
    }

  get mobile() {
    return this.userEmails.get('mobileNr')
  }

  get passd() {
    return this.userEmails.get('passwd')
  }

  createEmployee() {    
    this.employeeService.createEmployee(this.employee).subscribe(data => {
      console.log(data);
      this.saveImage();      
   //   this.router.navigate(['login'], {queryParams: { registered: 'true' } });
    },
    error => console.log(error));
  }
  saveImage() {
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.employee.emailid);
    this.employeeService.saveImage(uploadImageData).subscribe(data => {
      console.log(data);      
      this.router.navigate(['admin'], {queryParams: { registered: 'true' } });
    },
    error => console.log(error));
    
  }
  onChange() {
  }

  onSubmit() {
    this.createEmployee();
  }


}
