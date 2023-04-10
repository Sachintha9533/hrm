import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../employee.service';
import { Employee } from '../../employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent {
  formGroup = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(20)]],
    gender: ['', [Validators.required]],
    age: ['', [Validators.required]],
  });

  saved = false;

  @Output() onSave = new EventEmitter<Employee>();

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  onSubmit(event: any) {
    event.preventDefault();
    this.saved = false;
    if (this.formGroup.invalid) {
      return;
    }
    this.employeeService.save(this.formGroup.value).subscribe((data) => {
      this.saved = true;
      this.onSave.emit(data);
      this.formGroup.reset();
    });
  }

  makeEmpty() {
    this.formGroup.patchValue({ name: '', age: '' });
  }

  hasInputError(inputName: string) {
    return (
      this.formGroup.get(inputName)?.dirty ||
      this.formGroup.get(inputName)?.touched
    );
  }
}
