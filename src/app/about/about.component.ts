import { Component, OnInit,Inject } from '@angular/core';
import {Owner} from '../shared/owner';
import {OwnerService} from '../services/owner.service';
import {flyInOut,expand} from '../animations/app.animation';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host:{
    "[@flyInOut]":"true",
    'style':'display:block;'
      },
      animations:[
        flyInOut(),
        expand()
      ]
    })

export class AboutComponent implements OnInit {
  owners:Owner[];

  constructor(private ownerService:OwnerService,
    @Inject ('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.ownerService.getOwners()
    .subscribe(owners => this.owners = owners);
  }

}
