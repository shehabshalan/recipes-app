<template>
  <div v-if="recipe" class="edit-recipe container">
    <h2>{{recipe.title}} Recipe</h2>
    <form @submit.prevent="editRecipe">
      <div class="field title">
        <label for="title">Add name:</label>
        <input type="text" name="title" v-model="recipe.title" />
      </div>
      <div v-for="(ing, index) in recipe.ingredients" :key="index" class="field">
        <label for="ingredients">ingredients:</label>
        <input type="text" v-model="recipe.ingredients[index]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add ingredients:</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another" />
      </div>
      <div class="filed center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="btn pink">Update recipe</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "../firebase/init";
import slugify from "slugify";

export default {
  name: "EditRecipe",
  data() {
    return {
      recipe: null,
      another: null,
      feedback: null
    };
  },
  methods: {
    editRecipe() {
      if (this.recipe.title) {
        this.feedback = null;
        this.recipe.slug = slugify(this.recipe.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("recipes")
          .doc(this.recipe.id)
          .update({
            title: this.recipe.title,
            ingredients: this.recipe.ingredients,
            slug: this.recipe.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "You must enter a recipe title";
      }
    },
    addIng() {
      if (this.another) {
        this.recipe.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
        console.log(this.ingredients);
      } else {
        this.feedback = "Please add ingredients";
      }
    },
    deleteIng(ing) {
      this.recipe.ingredients = this.recipe.ingredients.filter(ingredient => {
        return ingredient != ing;
      });
    }
  },
  created() {
    let ref = db
      .collection("recipes")
      .where("slug", "==", this.$route.params.recipe_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.recipe = doc.data();
        this.recipe.id = doc.id;
        console.log(doc.data());
      });
    });
  }
};
</script>
<style>
.edit-recipe {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-recipe h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-recipe .field {
  margin: 20px auto;
  position: relative;
}
.edit-recipe .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #444;
  font-size: 1.4em;
  cursor: pointer;
}
</style>