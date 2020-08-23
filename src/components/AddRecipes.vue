<template>
  <div class="add-recipe container">
    <h2 class="center-align indigo-text">Add a recipe</h2>
    <form @submit.prevent="addRecipe">
      <div class="field title">
        <label for="title">Add name:</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div v-for="(ing, index) in ingredients" :key="index" class="field">
        <label for="ingredients">ingredients:</label>
        <input type="text" v-model="ingredients[index]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add ingredients:</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another" />
      </div>
      <div class="filed center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="btn pink">Add recipe</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "../firebase/init";
import slugify from "slugify";
export default {
  name: "AddRecipes",
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null
    };
  },
  methods: {
    addRecipe() {
      if (this.title) {
        this.feedback = null;
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        console.log(this.slug);
        db.collection("recipes")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug
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
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
        console.log(this.ingredients);
      } else {
        this.feedback = "Please add ingredients";
      }
    },
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient != ing;
      });
    }
  }
};
</script>
<style>
.add-recipe {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-recipe h2 {
  font-size: 2em;
  margin: 20px auto;
}
.add-recipe .field {
  margin: 20px auto;
  position: relative;
}
.add-recipe .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #444;
  font-size: 1.4em;
  cursor: pointer;
}
</style>