import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTasksComponent } from './admin-tasks/admin-tasks.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  
  {path: 'create-employee', component: CreateEmployeeComponent}  ,
  {path: 'login', component: LoginComponent},
  {path: ' ',component: LoginComponent},
  {path: 'details/:emailId',component:EmployeeDetailsComponent},
  {path: 'employee-list/:emailId',component:EmployeeListComponent},
  {path: 'forgot-password',component:ForgotPasswordComponent},
  {path: 'admin', component:AdminTasksComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
