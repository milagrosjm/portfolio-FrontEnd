import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { LoginComponent } from './components/login/login.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';

const routes: Routes = [
  {
    path:'',
    component: FrontPageComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    
    path:'portfolio/:username',
    component: PortfolioComponent
  },
  {
    
    path:'portfolio/edit/:username',
    component: PortfolioComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
