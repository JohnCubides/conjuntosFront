import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { ApiService } from 'src/app/core/https/http.service';
import { AssociatedUser } from 'src/app/core/models/associated-user/associated-user';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-form-unit-users',
  templateUrl: './form-unit-users.component.html',
  styleUrls: ['./form-unit-users.component.scss']
})
export class FormUnitUsersComponent implements OnInit {
  @Input() public userForm: AssociatedUser;
  @Input() public header: string;
  @Input() public buttonName: string;
  @Output() public formEmit = new EventEmitter<any>();
  @Output() public resultAssociatedUser = new EventEmitter<any>();
  @Output() public resultForm = new EventEmitter<any>();
  public associatedUser: FormGroup;
  unitId: number;
  public selectData: { identificationType: any[], personType: any[], card: any[] } = {
    identificationType: [],
    personType: [],
    card: []
  };
  @ViewChild('form')
  form: NgForm;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.formUser();
    this.getPersonTypes();
    this.getUnitId();
    this.getIdentificationTypes();
  }
  public formUser() {
    const disabledUser = this.buttonName ? false : true;
    const person = this.convertPerson();
    this.associatedUser = this.formBuilder.group({
      personTypeId: new FormControl({ value: person.personTypeId, disabled: disabledUser }),
      identificationTypeId: new FormControl({ value: person.identificationTypeId, disabled: disabledUser }, [Validators.required]),
      identificationNumber: new FormControl({ value: person.identificationNumber, disabled: disabledUser }, [Validators.required]),
      names: new FormControl({ value: person.names, disabled: disabledUser }, [Validators.required]),
      peopleIncome: new FormControl({ value: person.peopleIncome, disabled: disabledUser }),
      surnames: new FormControl({ value: person.surnames, disabled: disabledUser }, [Validators.required]),
      email: new FormControl({ value: person.email, disabled: disabledUser }, [Validators.required]),
      phone: new FormControl({ value: person.phone, disabled: disabledUser }, [Validators.required]),
      mobile: new FormControl({ value: person.mobile, disabled: disabledUser }, [Validators.required]),
      vehiclepeopleIncome: new FormControl({ value: person.vehiclepeopleIncome, disabled: disabledUser }),
    });
    this.associatedUser.statusChanges.subscribe(() => {
      this.formEmit.emit(this.form);
    });
  }
  private convertPerson() {
    const person = {
      id: this.validateData('id', 0),
      personTypeId: this.validateData('personTypeId', ''),
      identificationTypeId: this.validateData('identificationTypeId', 0),
      identificationNumber: this.validateData('identificationNumber', ''),
      names: this.validateData('names', ''),
      peopleIncome: this.validateData('peopleIncome', 0),
      surnames: this.validateData('surnames', ''),
      email: this.validateData('email', ''),
      phone: this.validateData('phone', ''),
      mobile: this.validateData('mobile', ''),
      vehiclepeopleIncome: this.validateData('vehiclepeopleIncome', 0),
    };
    return person;
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
  private getPersonTypes(): void {
    this.api.get('/Users/UserTypes').then
      ((result: any) => {
        this.selectData.personType = [];
        result.forEach(person => {
          this.selectData.personType.push({
            id: person.id,
            description: person.description
          });
        });
      });
  }
  private validateData(control: string, defaultValue: any) {
    return this.userForm && this.userForm[control] ? this.userForm[control] : defaultValue;
  }
  getUnitId() {
    this.unitId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
  }
  public saveUser() {
    const person = Object.assign({}, this.associatedUser.value);
    this.resultAssociatedUser.emit(person);
  }
  public errorHandler(control: string): string {
    let message = ' ';
    const errors = this.associatedUser.controls[control].errors;
    if (this.associatedUser.controls[control].touched && errors) {
      const p = Object.keys(this.associatedUser.controls[control].errors)[0];
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
    const input = this.associatedUser.get(data).value.toString();
    let pattern: any;
    if (data === 'phone') {
      pattern = new RegExp('(^[0-9]+$)');
    }
    if (data === 'mobile') {
      pattern = new RegExp('(^[0-9]+$)');
    }
    if (data === 'identificationNumber') {
      pattern = new RegExp('(^[0-9]{1,30}$)');
    }
    if (data === 'names') {
      pattern = new RegExp('(^[a-zA-Z ]{1,50}$)');
    }
    if (data === 'surnames') {
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
      case 'names':
        this.associatedUser.patchValue({
          names: value
        });
        break;
      case 'surnames':
        this.associatedUser.patchValue({
          surnames: value
        });
        break;
      case 'phone':
        this.associatedUser.patchValue({
          phone: value
        });
        break;
      case 'mobile':
        this.associatedUser.patchValue({
          mobile: value
        });
        break;
      case 'identificationNumber':
        this.associatedUser.patchValue({
          identificationNumber: value
        });
        break;
    }
  }
  public sendUser() {
    const user = Object.assign({}, this.associatedUser.value);
    user.independentUnit = this.unitId;
    this.resultForm.emit(user);
  }
}
