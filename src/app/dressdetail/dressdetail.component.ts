import { Component, OnInit,ViewChild,Inject} from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { Dress } from '../shared/Dress';
import {DressService} from '../services/dress.service';
import {switchMap} from 'rxjs/operators';
import {Comment} from '../shared/comment';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {visibility,flyInOut,expand} from '../animations/app.animation';
@Component({
  selector: 'app-dressdetail',
  templateUrl: './dressdetail.component.html',
  styleUrls: ['./dressdetail.component.scss'],
  host:{
    "[@flyInOut]":"true",
    'style':'display:block;'
      },
    
  animations: [
   
    flyInOut(),
    visibility(),
    expand()
  ]
})
export class DressdetailComponent implements OnInit {
  commentForm : FormGroup;
  comment:Comment;
  dress : Dress;
  dressIds : string[];
  prev: string;
  next: string;
  errMess : string;
  dresscopy:Dress;
  visibility='shown';

  @ViewChild('fform') commentFormDirective;
  formErrors = {
    'author':'',
    'comment':'',
  };
  validationMessages = {
    'author':{
      'required':'author is required.',
      'minlength':'author must be atleast 2 characters long',
      'maxlength':'author can not be more than 25 characters'
    },
    'comment':{
      'required':'Comment is required.',
      'minlength':'Comment must be atleast 1 characters long'
    }}

  constructor(private dressService:DressService,
    private route:ActivatedRoute,
    private location:Location,
    private fb:FormBuilder,
   
    @Inject('BaseURL') private BaseURL) { 
      this.createForm();
    }

  ngOnInit() {
      this.dressService.getDressIds()
      .subscribe((dressIds)=> this.dressIds = dressIds);
     

     this.route.params
     .pipe(switchMap((params:Params)=>{this.visibility='hidden'; return this.dressService.getDress(params['id']);}))
     .subscribe(dress => {this.dress = dress;this.dresscopy= dress; this.setPrevNext(this.dress.id); this.visibility='shown';},
     errmess=> this.errMess= <any>errmess);
  }
  setPrevNext(dressId: string){
    const index = this.dressIds.indexOf(dressId);
    this.prev = this.dressIds[(this.dressIds.length + index -1)% this.dressIds.length];
    this.next = this.dressIds[(this.dressIds.length + index +1)% this.dressIds.length];

  }

  goBack():void{
    this.location.back();
  }

  createForm(){
    this.commentForm = this.fb.group({
      author:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      comment : ['',[Validators.required,Validators.minLength(1)]],
      rating:5

    });
    this.commentForm.valueChanges
  .subscribe(data =>this.onValueChanged(data));

  this.onValueChanged();

  }
onValueChanged(data?: any){
 if (!this.commentForm){
   return ;
 }
 const form = this.commentForm;
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
 this.comment = form.value;
}

  onSubmit(){
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.dresscopy.comments.push(this.comment);
    this.dressService.putDress(this.dresscopy)
    .subscribe(dress => {
      this.dress = dress; this.dresscopy = dress;
    },
    errmess => {this.dress = null;this.dresscopy = null;this.errMess = <any> errmess;});

    this.commentForm.reset({
      author:'',
   comment:'',
   rating: 5
    });
    this.commentFormDirective.resetForm();
  }

}
