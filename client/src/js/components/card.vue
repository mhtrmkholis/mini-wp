<template>
  <div class="d-flex justify-content-between w-100" :class="{'justify-content-around' : pages.myArticlePage }">
    <div class="content d-flex w-100">
      <div class="d-flex justify-content-between" :class="{'flex-row-reverse' : index % 2 == 0}" style="width: 100%">
        <div class="cursor-pointer d-flex align-self-end w-100" :class="{ 'img-home' : pages.homePage, 'width400' : pages.myArticlePage, 'pt-10' : pages.myArticlePage }" @click="clickCard(article._id)">
         <div class="d-flex">
            <img
            :src="article.image ? `${article.image}` : 'https://via.placeholder.com/700x400' "
            alt="article.img"
            style="width:100%;"
          />
        </div>
         </div>
        <div class="w-100 d-flex flex-column justify-content-between" :class="{'pr-15' : index % 2 == 0, 'pl-15' : index % 2 != 0, 'pt-10' : pages.myArticlePage }">
          <div
            class="my-card-header cursor-pointer d-flex justify-content-between"
            :class="{'fs-22': pages.myArticlePage}"
          >
          <div
            @click="pages.homePage ? clickCard('home', article._id) : clickCard('edit', article._id)"
          >{{article.title}}</div>
          <a href="#" class="iconku" style="text-decoration: none" @click="deleteArticle(article._id)" v-if="pages.myArticlePage"><i class="fas fa-trash" style="margin-right: 5px"></i></a>
          </div>
          <hr style="max-width: 550px; margin: 0px; margin-top: 10px; margin-bottom: 10px">
        
          
          <div
            class="my-card-content cursor-pointer"
            :class="{'fs-16': pages.myArticlePage}"
            v-html="article.content"
            @click="pages.homePage ? clickCard('home', article._id) : clickCard('edit', article._id)"
          ></div>
          <div
            v-if="pages.homePage"
            :class="{'d-flex justify-content-end' : index % 2 != 0}"
            class="color-grey4 cursor-pointer"
            style="margin-top: 10px;"
            @click="pages.homePage ? clickCard('home', article._id) : clickCard('edit', article._id)"
          ><i>{{article.UserId.name}}</i></div>

          <div
            :class="{'d-flex justify-content-end' : index % 2 != 0}"
            class="cursor-pointer"
            style="color: #616161;
                  font-weight: 500;
                  margin-top: 0px;
                  font-size: 13px;"
            @click="pages.homePage ? clickCard('home', article._id) : clickCard('edit', article._id)"
          >{{new Date(article.createdAt).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</div>
          
          <div v-if="Object.values(article.tags)[0]" 
            class="d-flex"
            :class="{'flex-row-reverse' : index % 2 == 0}"
          >
            <div 
              v-for="(tag, index) in article.tags"
              :key="index"
              @click="searchByTag(tag)"
              class="tag"       
            ># {{tag}}</div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: Number,
    article: Object,
    pages: Object
  },
  methods: {
    clickCard(path, id) {
      path == 'home' ? this.$emit('show-detail-article', id) : path == 'edit' ? this.$emit('go-to-edit-page', id) : false
    },

    deleteArticle(id) {
      this.$emit('delete-article', id)
    },

    searchByTag(tagName) {
      this.$emit('search-by-tag', tagName)
    }
  }
};
</script>

<style>
</style>
