import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { EstateUnits } from 'src/app/core/models/estate-units/estate-unit';
import { ApiService } from 'src/app/core/https/http.service';
import { User } from 'src/app/core/models/user/user';
import { PhoneNumberSuffix } from 'src/app/core/pipes/phoneNumberSuffix';
import { PhoneNumberPreffix } from 'src/app/core/pipes/phoneNumberPreffix';
import { FormCanDeactivate } from 'src/app/shareds/form-validate/form-can-deactivate';
import { Router } from '@angular/router';
import { url } from 'inspector';

@Component({
  selector: 'app-form-estate-unit',
  templateUrl: './form-estate-unit.component.html',
  styleUrls: ['./form-estate-unit.component.scss']
})
export class FormEstateUnitComponent extends FormCanDeactivate implements OnInit {

  @Input() public unitModel: EstateUnits;
  @Input() public header: string;
  @Input() public buttonName: string;
  @Output() public resultEstateUnit = new EventEmitter<any>();
  @Output() formEmit = new EventEmitter<any>();
  public unitComplex: FormGroup;
  private representativeId: number;


  @ViewChild('form')
  form: NgForm;

  phoneNumber: any;
  mobileNumber: any;
  buttonValue: any;
  buttonChange: any;


  public selectData: { countries: any[], states: any[], cities: any[], identificationType: any[] } = {
    countries: [],
    states: [],
    cities: [],
    identificationType: []
  };

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private phoneNumberSuffix: PhoneNumberSuffix,
    private phoneNumberPreffix: PhoneNumberPreffix,
    private router: Router) { super() }

  ngOnInit(): void {
    this.formComplexUnit();
    this.getCountry();
    this.getIdentificationTypes();
    this.getStatus();
    this.setStatus();
  }
  public formComplexUnit() {
    const unit = this.convertUnit();
    if (unit.countryId) {
      this.getState(unit.countryId);
    }
    if (unit.stateId) {
      this.getCity(unit.stateId);
    }
    const disabledUnit = this.buttonName ? false : true;
    this.unitComplex = this.formBuilder.group({
      countrySelector: new FormControl({ value: unit.countryId, disabled: disabledUnit }, [Validators.required]),
      stateSelector: new FormControl({ value: unit.stateId, disabled: disabledUnit }, [Validators.required]),
      estateUnitName: new FormControl({ value: unit.estateUnitName, disabled: disabledUnit }, [Validators.required]),
      cityId: new FormControl({ value: unit.cityId, disabled: disabledUnit }, [Validators.required]),
      address: new FormControl({ value: unit.address, disabled: disabledUnit }, [Validators.required]),
      nit: new FormControl({ value: unit.nit, disabled: disabledUnit }, [Validators.required]),
      cadastreNumber: new FormControl({ value: unit.cadastreNumber, disabled: disabledUnit }, [Validators.required]),
      identificationTypeId: new FormControl({ value: unit.identificationTypeId, disabled: disabledUnit }, [Validators.required]),
      identificationNumber: new FormControl({ value: unit.identificationNumber, disabled: disabledUnit }, [Validators.required]),
      name: new FormControl({ value: unit.name, disabled: disabledUnit }, [Validators.required]),
      lastName: new FormControl({ value: unit.lastName, disabled: disabledUnit }, [Validators.required]),
      phone: new FormControl({ value: this.phoneNumberSuffix.transform(unit.phone), disabled: disabledUnit }, [Validators.required]),
      phoneCountry: new FormControl({ value: this.phoneNumberPreffix.transform(unit.phone), disabled: disabledUnit }, [Validators.required]),
      mobile: new FormControl({ value: this.phoneNumberSuffix.transform(unit.mobile), disabled: disabledUnit }, [Validators.required]),
      mobileCountry: new FormControl({ value: this.phoneNumberPreffix.transform(unit.mobile), disabled: disabledUnit }, [Validators.required]),
      email: new FormControl({ value: unit.email, disabled: disabledUnit }, [Validators.required]),
      numberGroup: new FormControl({ value: unit.numberGroup, disabled: disabledUnit }, [Validators.required]),
      numberIndependentUnit: new FormControl({ value: unit.numberIndependentUnit, disabled: disabledUnit }, [Validators.required]),
      numberPedestrianEntrance: new FormControl({ value: unit.numberPedestrianEntrance, disabled: disabledUnit }, [Validators.required]),
      numberVehicularEntrance: new FormControl({ value: unit.numberVehicularEntrance, disabled: disabledUnit }, [Validators.required]),
      numberParkingLots: new FormControl({ value: unit.numberParkingLots, disabled: disabledUnit }, [Validators.required]),
      status: new FormControl({ value: unit.status, disabled: disabledUnit }, [Validators.required])
    });

    this.unitComplex.statusChanges.subscribe(() => {
      this.formEmit.emit(this.form)
    })

  }

  private convertUnit() {
    const unitComplex = {
      id: this.validateData('id', 0),
      estateUnitName: this.validateData('estateUnitName', ''),
      countryId: this.validateData('countryId', ''),
      stateId: this.validateData('stateId', ''),
      cityId: this.validateData('cityId', ''),
      address: this.validateData('address', ''),
      nit: this.validateData('nit', ''),
      cadastreNumber: this.validateData('cadastreNumber', ''),
      identificationTypeId: this.validateData('identificationTypeId', 0),
      identificationNumber: this.validateData('identificationNumber', ''),
      name: this.validateData('name', ''),
      lastName: this.validateData('lastName', ''),
      phone: this.validateData('phone', ''),
      mobile: this.validateData('mobile', ''),
      email: this.validateData('email', ''),
      numberGroup: this.validateData('numberGroup', ''),
      numberIndependentUnit: this.validateData('numberIndependentUnit', ''),
      numberPedestrianEntrance: this.validateData('numberPedestrianEntrance', ''),
      numberVehicularEntrance: this.validateData('numberVehicularEntrance', ''),
      numberParkingLots: this.validateData('numberParkingLots', ''),
      status: this.validateData('status', 0),
      IdRepresentative: 0
    };
    return unitComplex;
  }

  private getCountry(): void {
    this.api.get('/location/countries').then((result: any) => {
      this.selectData.countries = [];
      result.forEach(country => {
        this.selectData.countries.push({
          id: country.id,
          name: country.name,
          code: country.code,
          phoneCode: country.phoneCode
        });
      });
    });
  }

  public getState(id: any): void {
    this.api.get('/location/states/' + id).then((result: any) => {
      this.selectData.states = [];
      result.forEach(state => {
        this.selectData.states.push({
          id: state.id,
          name: state.name,
          code: state.code
        });
      });
    });
  }

  public getCity(id: any): void {
    this.api.get('/location/cities/' + id).then((result: any) => {
      this.selectData.cities = [];
      result.forEach(city => {
        this.selectData.cities.push({
          id: city.cityId,
          name: city.cityName,
          code: city.cityCode,
          stateId: city.stateId
        });
      });
    });
  }

  private getIdentificationTypes(): void {
    this.api.get('/Users/identificationsType').then
      ((result: any) => {
        this.selectData.identificationType = [];
        result.forEach(identificationType => {
          this.selectData.identificationType.push({
            id: identificationType.id,
            description: identificationType.description,
            abbreviation: identificationType.abbreviation
          });
        });
      });
  }

  setStatus() {
    if (this.router.url === '/dashboard/administrator-estate-units/create') {
      this.unitComplex.patchValue({ status: 1 });
    }

  }

  getStatus() {
    this.buttonValue = this.unitComplex.get('status').value;
  }

  setPhoneNumber() {
    const indicativePhone = this.unitComplex.get('phoneCountry').value;
    const phone = this.unitComplex.get('phone').value;
    const indicativeMobile = this.unitComplex.get('mobileCountry').value;
    const mobile = this.unitComplex.get('mobile').value;

    this.mobileNumber = '(+' + indicativeMobile + ')' + mobile;
    this.phoneNumber = '(+' + indicativePhone + ')' + phone;
  }


  public saveStateUnit() {
    if (this.unitComplex.valid) {

      this.unitComplex.patchValue({
        numberGroup: this.convertNumber('numberGroup'),
        numberPedestrianEntrance: this.convertNumber('numberPedestrianEntrance'),
        numberParkingLots: this.convertNumber('numberParkingLots'),
        numberIndependentUnit: this.convertNumber('numberIndependentUnit'),
        numberVehicularEntrance: this.convertNumber('numberVehicularEntrance')
      });
      this.setPhoneNumber();
      const unit = Object.assign({}, this.unitComplex.value);
      unit.idRepresentative = this.representativeId;
      unit.phone = this.phoneNumber;
      unit.mobile = this.mobileNumber;

      this.resultEstateUnit.emit(unit);
    }
  }

  public getUserById(): void {
    const idNumber = this.unitComplex.get('identificationNumber').value;
    const idType = this.unitComplex.get('identificationTypeId').value;
    this.api.get('/users/user/' + idType + '/' + idNumber).then((result: User) => {
      if (result != null) {
        this.unitComplex.patchValue({ name: result.names, lastName: result.surnames, email: result.email });
        this.representativeId = result.id;
      } else {
        this.unitComplex.patchValue({ name: '', lastName: '', email: '' });
        this.representativeId = 0;
      }
    }, error => {
      this.unitComplex.patchValue({ name: '', lastName: '', email: '', phone: '' });
      this.representativeId = 0;
    }
    );
  }

  public changesStateToggleSwich(event: any) {

    var value1;

    if (event) {
      value1 = 1;
    } else {
      value1 = null;
    }

    if (value1 == this.buttonValue) {
      this.buttonChange = false;
    } else {
      this.buttonChange = true;
    }

    this.unitComplex.patchValue({ status: (event ? 1 : 0) });
  }

  private convertNumber(control: string): number {
    return +this.unitComplex.get(control).value;
  }

  private validateData(control: string, defaultValue: any) {
    return this.unitModel && this.unitModel[control] ? this.unitModel[control] : defaultValue;
  }

  public errorHandler(control: string): string {
    let message = ' ';
    const errors = this.unitComplex.controls[control].errors;
    if (this.unitComplex.controls[control].touched && errors) {
      const p = Object.keys(this.unitComplex.controls[control].errors)[0];
      switch (p) {
        case 'pattern':
          message = 'ERROR_PATTERN_' + this.errorPattern(control);
          break;
        case 'minlength':
          message = 'ERROR_MINLENGTH_NUMERIC';
          break;
        case 'email':
          message = 'ERROR_EMAIL';
          break;
        default:
          message = 'ERROR_REQUIRED_FIELD';
          break;
      }
    }
    return message;
  }

  private errorPattern(control: string): string {
    let data = '';
    switch (control) {
      case 'email':
        data = 'EMAIL';
        break;
      case 'nit' || 'cadestreNumber':
        data = 'ALPHANUMERIC';
        break;
      default:
        data = 'NUMERIC';
        break;
    }
    return data;
  }

  public validateInput(data: string) {
    let value = '';
    const input = this.unitComplex.get(data).value.toString();
    let pattern: any;
    if (data === 'cadastreNumber') {
      pattern = new RegExp('(^[a-zA-Z0-9-.]{1,50}$)');
    }
    if (data === 'nit') {
      pattern = new RegExp('(^[a-zA-Z0-9-.]{1,50}$)');
    }
    if (data === 'phone') {
      pattern = new RegExp('(^[0-9]+$)');
    }
    if (data === 'mobile') {
      pattern = new RegExp('(^[0-9]+$)');
    }
    if (data === 'numberGroup') {
      pattern = new RegExp('(^[0-9]+$)');
    }
    if (data === 'numberIndependentUnit') {
      pattern = new RegExp('(^[0-9]+$)');
    }
    if (data === 'numberPedestrianEntrance') {
      pattern = new RegExp('(^[0-9]+$)');
    }
    if (data === 'numberVehicularEntrance') {
      pattern = new RegExp('(^[0-9]+$)');
    }
    if (data === 'numberParkingLots') {
      pattern = new RegExp('(^[0-9]+$)');
    }
    if (data === 'identificationNumber') {
      pattern = new RegExp('(^[a-zA-Z0-9-.]{1,50}$)');
    }
    if (data === 'name') {
      pattern = new RegExp('(^[a-zA-Z ]{1,50}$)');
    }
    if (data === 'lastName') {
      pattern = new RegExp('(^[a-zA-Z ]{1,50}$)');
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < input.length; i++) {
      if (input[i].search(pattern) !== -1) {
        value += input[i];
      }
    }
    value = (value.length > 50) ? value.substring(0, 30) : value;
    switch (data) {
      case 'name':
        this.unitComplex.patchValue({
          name: value
        });
        break;
      case 'lastName':
        this.unitComplex.patchValue({
          lastName: value
        });
        break;
      case 'cadastreNumber':
        this.unitComplex.patchValue({
          cadastreNumber: value
        });
        break;
      case 'nit':
        this.unitComplex.patchValue({
          nit: value
        });
        break;
      case 'phone':
        this.unitComplex.patchValue({
          phone: value
        });
        break;
      case 'mobile':
        this.unitComplex.patchValue({
          mobile: value
        });
        break;
      case 'numberGroup':
        this.unitComplex.patchValue({
          numberGroup: value
        });
        break;
      case 'numberIndependentUnit':
        this.unitComplex.patchValue({
          numberIndependentUnit: value
        });
        break;
      case 'numberPedestrianEntrance':
        this.unitComplex.patchValue({
          numberPedestrianEntrance: value
        });
        break;
      case 'numberVehicularEntrance':
        this.unitComplex.patchValue({
          numberVehicularEntrance: value
        });
        break;
      case 'numberParkingLots':
        this.unitComplex.patchValue({
          numberParkingLots: value
        });
        break;
      case 'identificationNumber':
        this.unitComplex.patchValue({
          identificationNumber: value
        });
        break;

    }
  }


}
