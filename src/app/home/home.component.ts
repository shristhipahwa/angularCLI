import { Component, OnInit ,Inject} from '@angular/core';
import {Dress} from '../shared/dress';
import {DressService} from '../services/dress.service';
import {Promotion} from '../shared/promotion';
import {PromotionService} from '../services/promotion.service';
import {Owner} from '../shared/owner';
import {OwnerService} from '../services/owner.service';
import {flyInOut,expand} from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host:{
    "[@flyInOut]":"true",
    'style':'display:block;'
      },
      animations:[
        flyInOut(),
        expand()
      ]
    
})
export class HomeComponent implements OnInit {
dress:Dress;
promotion:Promotion;
owner:Owner;
dressErrMess:string;
promoErrMess:string;
ownerErrMess:string;

  constructor(private dressService:DressService,
    private promotionService:PromotionService,
    private ownerService:OwnerService,
    @Inject ('BaseURL') private BaseURL) { }

  ngOnInit() {

    this.dressService.getFeaturedDress()
    .subscribe(dress => this.dress = dress,
    errmess =>this.dressErrMess =<any>errmess);

     this.promotionService.getFeaturedPromotion()
     .subscribe(promotion => this.promotion = promotion,
      errmess=> this.promoErrMess = <any>errmess);

    this.ownerService.getFeaturedOwner()
    .subscribe(owner => this.owner = owner,
      errmess => this.ownerErrMess = <any>errmess);
  }




}
