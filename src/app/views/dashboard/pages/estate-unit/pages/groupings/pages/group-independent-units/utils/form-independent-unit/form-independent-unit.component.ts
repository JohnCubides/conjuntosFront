import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { Independentunit } from 'src/app/core/models/independent-unit/independent-unit';
import { ActivatedRoute } from '@angular/router';
import { FormCanDeactivate } from 'src/app/shareds/form-validate/form-can-deactivate';


@Component({
  selector: 'app-form-independent-unit',
  templateUrl: './form-independent-unit.component.html',
  styleUrls: ['./form-independent-unit.component.scss']
})

export class FormIndependentUnitComponent extends FormCanDeactivate implements OnInit {
  
  public formGroups: FormGroup;

  @Input() public seeView: 'create' | 'modify' ;
  @Input() public errorMensagge: string;
  @Input() public tittle: string;
  @Output() public resultForm = new EventEmitter<any>();
  @Output() public resultError = new EventEmitter<any>();
  @Output() formEmit = new EventEmitter<any>();
  @Input() public groupForm: Independentunit;

  
  @ViewChild('form')
  form: NgForm;

  constructor(private fb: FormBuilder,private route: ActivatedRoute) {super() }

  ngOnInit() {
    const user = this.convertUser();
    this.formGroups = this.fb.group({
      name: new FormControl({ value: user.name, disabled: false }, [Validators.required]),
      cadastre: new FormControl({ value: user.cadastre, disabled: false }, [Validators.required]),
      squareMeter: new FormControl({ value: user.squareMeter, disabled: false }, [Validators.required])
    });

    this.formGroups.statusChanges.subscribe(()=>{
      this.formEmit.emit(this.form)
    })
  }
  
  private validateData(control: string, defaultValue: any) {
    return this.groupForm && this.groupForm[control] ? this.groupForm[control] : defaultValue;
  }

  private convertUser() {
    const user = {
      id: this.validateData('id', 0),     
      name: this.validateData('name', ''),     
      cadastre: this.validateData('cadastre', ''),
      squareMeter:  this.validateData('squareMeter', ''),
      status:  this.validateData('status', ''),
      groupId:  this.validateData('groupId', ''),
    };
    return user;
  }

  private convertForm() {
    const groups = {
      id: this.groupForm && this.groupForm.id ? this.groupForm.id : 0,
      name: this.groupForm && this.groupForm.Name ? this.groupForm.Name : '',
      cadastre: this.groupForm && this.groupForm.Cadastre ? this.groupForm.Cadastre : '',
      squareMeter: this.groupForm && this.groupForm.SquareMeter ? this.groupForm.SquareMeter : '',
      groupId: this.groupForm && this.groupForm.GroupId ? this.groupForm.GroupId : 0,
    };
    return groups;
  }
  public sendData() {
    const data = Object.assign({}, this.formGroups.value);
    if (this.groupForm === undefined) {
      data.groupId = `${this.route.snapshot.paramMap.get('id')}`;
    }
    if (this.groupForm !== undefined) {
      data.idGroup = this.groupForm.id;
    }
    this.resultForm.emit(data);
  }
  public validateInput(data: string) {
    let value = '';
    const input = this.formGroups.get(data).value.toString();
    let pattern: any;
    if (data === 'cadastre') {
      pattern = new RegExp('(^[0-9]{1,20}$)');
    }
    if (data === 'squareMeter'  ) {
      pattern = new RegExp('(^[0-9\.]{1,5}$)');
    }
    if (data === 'name') {
      pattern = new RegExp('(^[a-zA-Z0-9 \d!@#$%^&*()_+,.-]{1,30}$)');
    }  
    for (let i = 0; i < input.length; i++) {
      if (input[i].search(pattern) !== -1) {
        value += input[i];
      }
    }
    value = (value.length > 30) ? value.substring(0, 30) : value;
    switch (data) {
      case 'cadastre':
        this.formGroups.patchValue({
          cadastre: value
        });
        break;
      case 'squareMeter':
        this.formGroups.patchValue({
          squareMeter: value
        });
        break;
      case 'name':
        this.formGroups.patchValue({
          name: value
        });
        break;
    }
  }
}
