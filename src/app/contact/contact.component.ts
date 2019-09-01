import { Component, OnInit ,ViewChild} from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Feedback,ContactType} from '../shared/feedback';
import {flyInOut,expand} from '../animations/app.animation';
import {FeedbackService} from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]})

export class ContactComponent implements OnInit {
  feedbackForm: FormGroup;
  feedback:Feedback;
  contactType = ContactType;
  errMess:string;
  feedbackCopy:Feedback = null;
  spinner:boolean = false;

  @ViewChild('fform') feedbackFormDirective;// to reset form
  formErrors = {
    'firstname':'',
    'lastname':'',
    'telnum':'',
  'email':''  
};
validationMessages = {
  'firstname':{
    'required':'First name is required.',
    'minlength':'First name must be atleast 2 characters long',
    'malLength':'First name can not be more than 25 characters'
  },
  'lastname':{
    'required':'Last name is required.',
    'minlength':'Last name must be atleast 2 characters long',
    'maxlength':'Last name can not be more than 25 characters'
  },
  'telnum':{
    'required':'Tel. number is required.',
    'pattern':'Tel . number must contain only number'
  },
  'email':{
    'required':'Email is required.',
    'email':'Email not in valid format.'
  }
};

  constructor(private fb:FormBuilder,
    private feedbackService:FeedbackService) { 
    this.createForm();
  }



  ngOnInit() {
  }
 createForm(){
   this.feedbackForm = this.fb.group({
     firstname:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
     lastname:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
     telnum:[0,[Validators.required,Validators.pattern]],
     email:['',[Validators.required,Validators.email]],
     agree:false,
     contactType:'None',
     message:''
   });
   this.feedbackForm.valueChanges
    .subscribe(data =>this.onValueChanged(data));

    this.onValueChanged(); //reset form validation messages
 }
 onValueChanged(data?: any){
   if (!this.feedbackForm){
     return ;
   }
   const form = this.feedbackForm;
   for (const field in this.formErrors){
     if(this.formErrors.hasOwnProperty(field)){
       //clear previous error message(if any)
       this.formErrors[field]='';
       const control = form.get(field);
       if(control && control.dirty && !control.valid){
         const messages = this.validationMessages[field];
         for (const Key in control.errors){
           if(control.errors.hasOwnProperty(Key)){
             this.formErrors[field] += messages[Key] + ' ';
           }
         }
       }
     }
   }
 }

 onSubmit(){
   this.spinner=true;
  this.feedbackCopy = this.feedbackForm.value;
  this.feedbackService.submitFeedback(this.feedbackCopy)
   .subscribe(feedback=>{
     setTimeout(()=>{this.feedback = feedback; 
      this.spinner = false;
     console.log(this.feedback);

     setTimeout(()=> this.feedback=null,5000);},2000);
     
   },
   errmess=>{this.feedback = null;this.errMess =<any>errmess;});
  
   
   this.feedbackForm.reset({
     firstname:'',
     lastname:'',
     telnum:0,
     email:'',
     agree:'',
     contacttype:'None',
     message:''
   });
   this.feedbackFormDirective.resetForm();
 }
}
