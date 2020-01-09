import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeFrom: FormGroup;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  // onSubmit() {
  //   const newRecipe = new Recipe(
  //     this.recipeFrom.value['name'],
  //     this.recipeFrom.value['imagePath'],
  //     this.recipeFrom.value['description'],
  //     this.recipeFrom.value['ingredients']
  //   );
  //   if (this.editMode) {
  //     this.recipeService.updateRecipe(this.id, newRecipe)
  //   } else {
  //     this.recipeService.addRecipe(newRecipe);
  //   }
  // }

  //can take advantage of our formatting that is will be a valid recipe
  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeFrom.value)
    } else {
      this.recipeService.addRecipe(this.recipeFrom.value);
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeFrom.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.recipeFrom.get('ingredients')).removeAt(index);
  }

  onRemoveAll(){
    (<FormArray>this.recipeFrom.get('ingredients')).clear();
  }

  get controls() {
    return (<FormArray>this.recipeFrom.get('ingredients')).controls;
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    //if in editMode we want the inputs to populate with the recipe data stored
    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      //only if the recipe has ingredients
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    this.recipeFrom = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    })
  }
}
