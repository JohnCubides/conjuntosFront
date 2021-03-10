import { Component, OnInit, Input, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EstateUnits } from 'src/app/core/models/estate-units/estate-unit';
import { ApiService } from 'src/app/core/https/http.service';
import { User } from 'src/app/core/models/user/user';
import { ActivatedRoute } from '@angular/router';
import { AbstractModal } from 'src/app/core/models/abstracts/abstract-modal/abstract-modal';

@Component({
  selector: 'app-consult-estate-unit',
  templateUrl: './consult-estate-unit.component.html',
  styleUrls: ['./consult-estate-unit.component.scss']
})
export class ConsultEstateUnitComponent extends AbstractModal implements OnInit {
  public header = 'ESTATE_UNIT_CONSULT';
  public btnName = 'SAVE';
  public estateUnit: EstateUnits;

  constructor(
    private formBuilder: FormBuilder,
    public api: ApiService,
    private route: ActivatedRoute,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {

    this.api.get(`/EstateUnits/${this.route.snapshot.paramMap.get('id')}`).then((result: EstateUnits) => {

      this.estateUnit = result;
    }).catch(() => {
      // this.imageDefault = 'assets/images/avatar.png';
    });

   

  }


  closeStateUnit($event){
    
  }

  // public getCity(id: any): void {
  //   this.api.get('/Location/City/' + id).then((city: any) => {
  //       this.cities = [];
  //       this.cities.push({
  //             id: city.cityId,
  //             name: city.cityName,
  //             code: city.cityCode,
  //             stateId: city.stateId,
  //           });
  //       this.getState(city.countryId);
  //       this.countryId = city.countryId;
  //       this.stateId = city.stateId;

  //     });
  // }


}
