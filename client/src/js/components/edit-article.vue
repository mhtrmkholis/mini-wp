<template>
<div class="container d-flex flex-column" v-if="pages.editArticlePage">
        <div
          class="edit-menu border-bottom d-flex justify-content-around"
          style="text-align: center; padding-top: 10px; padding-bottom: 13px"
        >
        <a href="#" class="" @click="goToMyArticlePage" style="text-decoration: none"><i class="fas fa-chevron-left" style="margin-right: 5px"></i>Back</a>
        <a href="#" class="" @click="submitEdit(article._id)" style="text-decoration: none"><i class="fas fa-share-square" style="margin-right: 5px"></i>Update</a>
        <a href="#" class="" @click="deleteArticle(article._id)" style="text-decoration: none"><i class="fas fa-trash" style="margin-right: 5px"></i>Delete</a>
        </div>
        <div style="height: 3.15rem; background-color: #fff">&nbsp;</div>
        <div
          class="my-card d-flex justify-content-center"
          style=" height: 100%; margin-top: 0px"
          v-if="pages.editArticlePage"
        >
  <div v-if="pages.editArticlePage && user.isLogin" style="
  padding-left: 200px; 
    padding-right: 200px; 
    padding-top: 0px; 
    padding-bottom: 80px; 
    width: 100%">
   <div>
      <form action="">
      <div class="d-flex flex-column" style="width: 100%">
        <div class="form-group">
          <img :src="article.image" alt="article-img" style="max-width: 508.75; max-height: 286.64; width: 100%" />
          <div class="form-group">
            <input type="text" class="form-control sharea" placeholder=" Enter title" v-model="article.title" style="height: 80px; font-size: 35px; text-align: center; padding-bottom: 0; margin-bottom: 50px">
          </div>
          <div class="d-flex justify-content-between" style="margin-bottom: 10px">
            <div> 
              <input 
                type="file" 
                name="image"
                ref="file"
                accept="image/*"
                v-on:change="handleFileUpload"
              >
            </div>
            <div>
              <label for="tags">Tags:</label>
              <input type="text" placeholder="Eg. Business, Design" v-model="article.tags">
            </div>
          </div>
          <wysiwyg v-model="article.content">
        </div>
      </div>
    </form>
   </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  props: {
    pages: Object,
    user: Object,
    article: Object
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0)
    },

    submitEdit(id) {
      this.$emit('submit-edit-d', id)
    },

    goToMyArticlePage() {
      this.$emit('go-to-my-article-page')
    },

    deleteArticle(id) {
      this.$emit('delete-article-d', id)
    },
    handleFileUpload(event) {
      this.article.image = event.target.files[0]
    }
  }
}
</script>

<style>

</style>
