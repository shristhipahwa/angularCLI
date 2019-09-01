import {Routes} from '@angular/router';

import { VarietyComponent } from '../variety/variety.component';
import { DressdetailComponent } from '../dressdetail/dressdetail.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';

export const routes:Routes=[
   {path:'home',component:HomeComponent},
   {path:'category',component:VarietyComponent},
   {path:'dressdetail/:id',component:DressdetailComponent},
   {path:'about',component:AboutComponent},
   {path:'contact',component:ContactComponent},
   {path:'',redirectTo:'/home', pathMatch:'full'}
] ;