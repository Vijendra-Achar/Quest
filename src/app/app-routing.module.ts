import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { CreateNewPaperComponent } from './create-new-paper/create-new-paper.component';
import { AuthGuard } from './services/auth.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'view/:paperId', component: ViewComponent, canActivate: [AuthGuard] },
  { path: 'edit/:paperId', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'create-new-paper', component: CreateNewPaperComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
