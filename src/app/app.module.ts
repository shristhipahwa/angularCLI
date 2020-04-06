import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular//material/grid-list';
import{MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import 'hammerjs';
import { VarietyComponent } from './variety/variety.component';
import { DressdetailComponent } from './dressdetail/dressdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import {MatSliderModule} from '@angular/material/slider';

import {OwnerService} from './services/owner.service';
import {DressService} from './services/dress.service';
import {PromotionService} from './services/promotion.service';
import {ProcessHTTPMsgService} from './services/process-httpmsg.service';
import {FeedbackService} from './services/feedback.service';

import { LoginComponent } from './login/login.component';

import {baseURL} from './shared/baseurl';
import { HighlightDirective } from './directives/highlight.directive';
@NgModule({
  declarations: [
    AppComponent,
    VarietyComponent,
    DressdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    HttpClientModule,
    
  ],
  providers: [DressService,
    PromotionService,
    OwnerService,
    ProcessHTTPMsgService,
    FeedbackService,
  {provide:'BaseURL',useValue:baseURL}
 
],
  entryComponents:[
      LoginComponent
    ],
   
  bootstrap: [AppComponent]
})
export class AppModule { }