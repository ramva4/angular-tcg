import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  idx: number;
  editMode = false;
  form: FormGroup;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.editMode = params['idx'] != null;
        this.idx = +params['idx'] - 1;
        this.initForm();
      });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([] as any[]);

    if (this.editMode) {
      let recipe = this.recipeService.getRecipe(this.idx)
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingr of recipe['ingredients']) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingr.name, Validators.required),
              'quantity': new FormControl(ingr.quantity, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            }));
        }
      }
    }

    this.form = new FormGroup(
      {
        name: new FormControl(recipeName, Validators.required),
        imagePath: new FormControl(recipeImagePath, Validators.required),
        description: new FormControl(recipeDescription, Validators.required),
        ingredients: recipeIngredients
      }
    );
  }

  getIngredientControls() {
    return (this.form.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    (this.form.get('ingredients') as FormArray).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'quantity': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      }));
  }

  onDelIngredient(idx: number) {
    (this.form.get('ingredients') as FormArray).removeAt(idx);
  }

  onSubmit() {
    const recipe = new Recipe(
      this.form.value['name'],
      this.form.value['description'],
      this.form.value['imagePath'],
      this.form.value['ingredients']
    );

    if (this.editMode) {
      this.recipeService.updateRecipe(this.idx, recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }

    /* Navigate away */
    this.navigateAway();
  }

  navigateAway() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
