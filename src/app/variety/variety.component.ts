import { Component, OnInit,Inject } from '@angular/core';
import {Dress} from '../shared/Dress';
import {DressService} from '../services/dress.service';
import {flyInOut,expand} from '../animations/app.animation';
@Component({
  selector: 'app-variety',
  templateUrl: './variety.component.html',
  styleUrls: ['./variety.component.scss'],
  host:{
"[@flyInOut]":"true",
'style':'display:block;'
  },
  animations:[
    flyInOut(),
    expand()
  ]
})
export class VarietyComponent implements OnInit {

  dresses:Dress[];
 errMess:string;
    
  
  constructor(private dressService:DressService,
    @Inject('BaseURL')private BaseURL) { }

  ngOnInit() {
     this.dressService.getDresses()
     .subscribe(dresses => this.dresses = dresses,
      errmess => this.errMess = <any>errmess);
  }
  
}
