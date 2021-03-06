import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../services/category.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  form: FormGroup

  validation_messages = {
    'name': [
      { type: 'required', message: 'O nome é obrigatório' }
    ]
  }

  constructor(private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private location: Location) {

    this.form = this.formBuilder.group({
      name: [null, Validators.required]
    });
   }

  ngOnInit(): void {
  }

  createCategory(){
    if(this.form.valid) {
      this.categoryService.save(this.form.value)
      .subscribe(data => this.sucess(),
      error =>this.onError());
    } else {
      this.snackBar.open('Os campos precisam ser prenchidos!!!', 'X', {duration: 3000});
    }
  }

  cancel(){
    this.location.back();
  }

  private sucess(){
    this.snackBar.open('Categoria cadastrada com sucesso!', 'Close', {duration: 3000});
    this.cancel();
  }

  private onError(){
    this.snackBar.open('Erro ao cadastrar categoria!', 'Close', {duration: 3000});
  }

}
