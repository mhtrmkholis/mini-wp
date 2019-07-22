<template>
 <div class="container d-flex flex-column" v-if="pages.addArticlePage">
    <div class="edit-menu border-bottom d-flex justify-content-around" style="text-align: center; padding-top: 10px; padding-bottom: 13px">
      <a href="#" class="" @click="clickBack" style="text-decoration: none"><i class="fas fa-chevron-left" style="margin-right: 5px"></i>Back</a>
      <a href="#" class="" @click="submitCreate" style="text-decoration: none"><i class="fas fa-file-upload" style="margin-right: 5px"></i>Publish</a>
    </div>

    <div
      class="my-card d-flex justify-content-center"
      style=" height: 100%"
      v-if="pages.addArticlePage"
    >

    <div v-if="pages.addArticlePage && user.isLogin" style="
      padding-left: 200px; 
      padding-right: 200px; 
      padding-top: 30px; 
      padding-bottom: 80px; 
      width: 100%">
   <div>

    <form action="" enctype="multipart/form-data">
      <div class="d-flex flex-column" style="width: 100%">
        <div class="form-group">

          <div class="form-group">
            <input type="text" 
              class="form-control sharea" 
              placeholder="Enter title" 
              v-model="newArticle.title" 
              style="height: 80px; font-size: 35px; text-align: center; padding-bottom: 0; margin-bottom: 50px">
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
              <input type="text" placeholder="Eg. Business, Design" v-model="tagValue">
            </div>
          </div>
          <wysiwyg v-model="newArticle.content">
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    pages: Object,
    newArticle: Object,
    user: Object
  },
  data() {
    return {
      tagValue: ''
    }
  },
  methods: {
    handleFileUpload(event) {
      this.newArticle.image = event.target.files[0]
      console.log(this.newArticle.image);
    },

    submitCreate() {
      if (!this.newArticle.tags) this.newArticle.tags = []
      if (this.tagValue.split('').some(el => el == ',')) {
        this.newArticle.tags = [...new Set(this.newArticle.tags = this.tagValue.split(',').map(el => el.trim()))]
      }
      else this.newArticle.tags.push(this.tagValue)
      this.$emit('submit-create', this.newArticle)
    },

    clickBack() {
      this.$emit('go-to-home-page')
    },
  }
};
</script>

<style>
</style>
