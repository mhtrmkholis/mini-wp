<template>
  <div
    class="edit-menu d-flex justify-content-between"
    style="text-align: center; padding-top: 10px; padding-bottom: 13px; padding-left: 170px; padding-right: 170px; width: 100%; height: 2rem"
  >
    <div class="d-flex flex-row w-100 justify-content-between">
      <a href="#" class="d-flex align-self-center" style="text-decoration: none; text-transform: capitalize" @click="goToHomePage">
        <p class="category">Home</p>
      </a>
      <a href="#" class="d-flex align-self-center" style="text-decoration: none; text-transform: capitalize" v-for="tag in tags" :key="tag._id" @click="searchByTag(tag.name)">
        <p class="category">{{tag.name}}</p>
      </a>
      <div class="d-flex align-self-center">
        <form action=""><input type="text" class="form-control no-border" placeholder="Search here..." style="height: 100%" v-model="search" v-on:keyup="searchArticle"/></form>
        <i class="fas fa-search d-flex align-self-center"></i>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  props: {
    searchValue: String,
    tags: Array
  },
  data() {
    return {
      search: this.searchValue
    }
  },
  methods: {
    searchArticle() {
      this.$emit('search-article', this.search)
    },

    searchByTag(tagName) {
      this.$emit('search-by-tag', tagName)
    },

    goToHomePage() {
      this.$emit('go-to-home-page')
    }
  }
  
};
</script>

<style>
</style>
