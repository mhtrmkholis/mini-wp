<template>
  <div>
    <nav class="navbar navbar-light my-nav 
                my-nav--fixed 
                white 
                " v-show="user.isLogin">
      <a href="#" class="nav-plus" v-if="pages.addArticlePage || pages.articleDetail" @click="clickHome"><i class="fas fa-chevron-left"></i></a>
      <a href="#" class="nav-plus" v-if="!pages.addArticlePage && !pages.articleDetail" @click="toAddArticlePage"><i class="fas fa-plus"></i></a>
      <a href="#"><span class="navbar-brand mb-0 h1 sharea" style="color: #fff; margin: 0px" @click="clickHome" :class="{'pl-10': pages.addArticlePage || pages.articleDetail }">shArea</span></a>
    <div class="d-flex">
  <div class="dropdown mr-1">
    <a href="#" class="nav-plus" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="10,200"><i class="fas fa-chevron-down"></i></a>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuOffset" style="margin-left: -140px;">
      <span class="dropdown-item" href="#" style="padding-left: 10px; padding-right: 10px"><b>{{user.name ? user.name : 'User'}}</b></span>
      <a class="dropdown-item" href="#" @click="toAddArticlePage" style="padding-left: 10px; padding-right: 10px">New Articles</a>
      <a class="dropdown-item" href="#" @click="toMyArticlePage" style="padding-left: 10px; padding-right: 10px">My Articles</a>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" href="#" @click="clickLogout" style="padding-left: 10px; padding-right: 10px">Logout</a>
    </div>
  </div>
</div>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    pages: Object
  },
  data() {
    return {

    }
  },
  methods: {
    clickLogout() {
      this.$emit('logout')
    },

    toAddArticlePage() {
      this.$emit('go-to-add-article-page')
    },

    toMyArticlePage() {
      this.$emit('go-to-my-article')
    },

    clickHome() {
      this.$emit('go-to-home-page')
    }
  }
};
</script>

<style>
</style>
