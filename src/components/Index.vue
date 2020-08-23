<template>
  <div class="index container">
    <div class="card" v-for="recipe in recipes" :key="recipe.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteRecipe(recipe.id)">delete</i>
        <h3 class="indigo-text">{{recipe.title}}</h3>
        <ul class="ingredients">
          <li v-for="(ing, index) in recipe.ingredients" :key="index">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{name:'EditRecipe', params:{recipe_slug:recipe.slug}}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "../firebase/init";
export default {
  name: "Index",
  data() {
    return {
      recipes: []
    };
  },
  methods: {
    deleteRecipe(recipeId) {
      // delete from firebase
      db.collection("recipes")
        .doc(recipeId)
        .delete()
        .then(() => {
          // to delete it locally too
          this.recipes = this.recipes.filter(recipe => {
            return recipe.id != recipeId;
          });
          console.log("Document successfully deleted!");
        })
        .catch(error => {
          console.error("Error removing document: ", error);
        });
    }
  },
  created() {
    db.collection("recipes")
      .get()
      .then(snapshot => {
        //snapshot is a view of that collection we have meaning the data we stored
        snapshot.forEach(doc => {
          //we grabed each doc in that snapshot
          // console.log(doc.data());
          let recipe = doc.data();
          recipe.id = doc.id;
          this.recipes.push(recipe);
        });
      });
  }
};
</script>

<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h3 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .ingredients {
  margin: 30px auto;
}
.index .ingredients li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 1.4em;
  color: #444;
  cursor: pointer;
}
</style>