<template>
  <div
    v-if="pages.articleDetail"
    style="
    padding-left: 250px; 
    padding-right: 250px; 
    padding-top: 30px; 
    padding-bottom: 80px; 
    width: 100%"
  >
    <div>
      <h1 style="text-align: center">{{article.title}}</h1>
      <hr style="margin: 0px; margin-top: 10px; margin-bottom: 10px">
      <div class="user-info">
        <div class="circle-name d-flex justify-content-center">
          <span>{{article.UserId ? article.UserId.name[0].toUpperCase() : ""}}</span>
        </div>
        <br>
        <div>
          <div>{{article.UserId ? article.UserId.name : ''}}</div>
          <div>{{article.updatedAt}}</div>
        </div>
      </div>
        <img :src="article.image" alt="article-img" style="max-width: 508.75; max-height: 286.64; width: 100%" />
        <div class="article-content" v-html="this.article.content" style="margin-top: 20px"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: Object,
    pages: Object
  }
};
</script>

<style>
</style>
