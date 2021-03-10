import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { GroupUnitsIndependent } from 'src/app/core/models/groups-units/group-units';
import { FormCanDeactivate } from 'src/app/shareds/form-validate/form-can-deactivate';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.scss']
})
export class FormCreateComponent extends FormCanDeactivate implements OnInit {

  @Input() public seeView: 'create' | 'modify' ;
  @Input() public errorMensagge: string;
  @Input() public tittle: string;
  @Output() public resultForm = new EventEmitter<any>();
  @Output() public resultError = new EventEmitter<any>();
  @Output() formEmit = new EventEmitter<any>();
  @Input() public groupForm: GroupUnitsIndependent;

  public formGroups: FormGroup;
  public porcentage = 0;

  @ViewChild('form')
  form: NgForm;

  constructor(private fb: FormBuilder) {super() }

  ngOnInit() {
    const group = this.convertForm()
    this.formGroups = this.fb.group({
      name: new FormControl({ value: group.name, disabled: false }, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
      independentAmount: new FormControl({ value: group.independentAmount, disabled: false }, [Validators.required, Validators.minLength(1), Validators.maxLength(5)])
    });

    this.formGroups.statusChanges.subscribe(()=>{
      this.formEmit.emit(this.form)
    })

  }

  private convertForm() {
    const groups = {
      id: this.groupForm && this.groupForm.id ? this.groupForm.id : 0,
      independentAmount: this.groupForm && this.groupForm.independentAmount ? this.groupForm.independentAmount : '',
      name: this.groupForm && this.groupForm.name ? this.groupForm.name : '',
    };
    return groups;
  }

  public sendData() {

    const data = Object.assign({}, this.formGroups.value);
    data.independentAmount = parseInt(data.independentAmount)

    if (this.groupForm == undefined) {
      data.estateUnit = 1;
      data.status = 1;
    }

    if (this.groupForm !== undefined) {
      data.idGroup = this.groupForm.id
    }

    this.resultForm.emit(data)
  }

  public validateInput(data: string) {
    let value = '';
    const input = this.formGroups.get(data).value.toString();
    let pattern: any;
    if (data === 'independentAmount') {
      pattern = new RegExp('(^[0-9]{1,5}$)');
    }
    if (data === 'name') {
      pattern = new RegExp('(^[a-zA-Z ]{1,50}$)');
    }

    for (let i = 0; i < input.length; i++) {
      if (input[i].search(pattern) !== -1) {
        value += input[i];
      }
    }
    value = (value.length > 5) ? value.substring(0, 30) : value;
    switch (data) {
      case 'independentAmount':
        this.formGroups.patchValue({
          independentAmount: value
        });
        break;

      case 'name':
        this.formGroups.patchValue({
          names: value
        });
        break;
    }
  }

}