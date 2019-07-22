<template>
  <div id="page-container">
    <div id="content-wrap">
      <Header
        :user="user"
        :pages="pages"
        @logout="logout"
        @go-to-add-article-page="goToAddArticlePage"
        @go-to-home-page="goToHomePage"
        @go-to-my-article="goToMyArticlePage"
      ></Header>

      <div style="height: 4.45rem;">&nbsp;</div>

      <Search
        v-if="pages.homePage"
        :tags="tags"
        :searchValue="searchValue"
        @search-by-tag="searchByTag"
        @search-article="searchArticle"
        @go-to-home-page="goToHomePage"
      ></Search>

      <div style="height: 2rem; background-color: #fff" v-if="pages.homePage">&nbsp;</div>

      <LoginForm :pages="pages" :user="user" @login="login" @go-to-register-page="goToRegisterPage"></LoginForm>

      <RegisterForm
        :pages="pages"
        :user="user"
        @register="register"
        @go-to-login-page="goToLoginPage"
      ></RegisterForm>

      <section id="home" v-if="pages.homePage && user.isLogin">
        <div class="container d-flex flex-column">
          <div
            :key="article.id"
            v-for="(article, index) in articles"
            class="my-card d-flex justify-content-between"
          >
            <Card
              :article="article"
              :index="index"
              :pages="pages"
              @show-detail-article="showDetailArticle"
              @search-by-tag="searchByTag"
            ></Card>
          </div>
        </div>
      </section>

      <section v-if="pages.articleDetail">
        <div class="container d-flex flex-column">
          <div
            class="edit-menu border-bottom d-flex justify-content-around"
            style="text-align: center; padding-top: 10px; padding-bottom: 13px"
          >
            <a href="#" class @click="goToHomePage" style="text-decoration: none">
              <i class="fas fa-chevron-left" style="margin-right: 5px"></i>Back
            </a>
          </div>

          <div
            class="my-card d-flex justify-content-center"
            v-if="pages.articleDetail"
            style="margin-top: 0; padding-top: 60px"
          >
            <ArticleDetail :article="article" :pages="pages" @search-by-tag="searchByTag"></ArticleDetail>
          </div>
        </div>
      </section>

      <AddArticle
        :newArticle="newArticle"
        :pages="pages"
        :user="user"
        @submit-create="createArticle"
        @go-to-home-page="goToHomePage"
      ></AddArticle>

      <section id="my-article" v-if="pages.myArticlePage && user.isLogin">
        <div
          class="container d-flex flex-column"
          style="background-color: white;"
          v-if="pages.myArticlePage && user.isLogin"
        >
          <h2
            class="your-article"
            style="text-align: center; padding-top: 10px; padding-bottom: 13px; width: 76.3%"
          >Your Articles</h2>
          <div style="height: 4.45rem;">&nbsp;</div>
          <div
            :key="article.id"
            v-for="(article) in myArticles"
            class="my-card d-flex justify-content-between"
          >
            <Card
              :article="article"
              :pages="pages"
              @show-detail-article="showDetailArticle"
              @go-to-edit-page="editArticle"
              @delete-article="deleteArticle"
            ></Card>
          </div>
        </div>
      </section>

      <section id="edit-article" v-if="pages.editArticlePage">
        <EditArticle
          :pages="pages"
          :user="user"
          :article="article"
          @go-to-my-article-page="goToMyArticlePage"
          @delete-article-d="deleteArticle"
          @submit-edit-d="submitEdit"
        ></EditArticle>
      </section>

      <section v-if="nmf && pages.homePage">
        <div class="d-flex justify-content-center" style="padding-top: 100px">
          <h3>No match found</h3>
        </div>
      </section>
    </div>

    <Footer id="footer" v-if="user.isLogin"></Footer>
  </div>
</template>

<script>
const userPath = `http://localhost:3000/api/users`;
const articlePath = `http://localhost:3000/api/articles`;
const tagPath = `http://localhost:3000/api/tags`;

import LoginForm from "./js/components/login-form";
import RegisterForm from "./js/components/register-form";
import Header from "./js/components/header";
import Card from "./js/components/card";
import AddArticle from "./js/components/add-article";
import ArticleDetail from "./js/components/article-detail";
import MyArticle from "./js/components/my-article";
import EditArticle from "./js/components/edit-article";
import Search from "./js/components/search";
import Footer from "./js/components/footer";

export default {
  components: {
    LoginForm,
    RegisterForm,
    Header,
    Card,
    AddArticle,
    ArticleDetail,
    MyArticle,
    EditArticle,
    Search,
    Footer
  },
  data() {
    return {
      nmf: false,
      searchValue: "",
      articles: [],
      myArticles: [],
      tags: [],
      pages: {
        loginPage: true,
        registerPage: false,
        homePage: false,
        addArticlePage: false,
        articleDetail: false,
        myArticlePage: false,
        editArticlePage: false
      },
      user: {
        isLogin: false,
        name: "",
        email: ""
      },
      article: {
        _id: "",
        title: "",
        content: "",
        image: "",
        tags: []
      },
      newArticle: {
        id: "",
        title: "",
        content: "",
        image: "",
        tags: []
      }
    };
  },
  methods: {
    onSignIn: function(googleUser) {
      var profile = googleUser.getBasicProfile();
      console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log("Name: " + profile.getName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
      var id_token = googleUser.getAuthResponse().id_token;
      console.log("masok gs");
      axios
        .post(`${userPath}/signinGoogle`, { headers: { token: id_token } })
        .then(({ data }) => {
          console.log(data);
          localStorage.token = data.token;
          localStorage.name = data.name;
          this.user.name = data.name;
          this.user.isLogin = true;
          this.fetchArticles();
          this.fetchTags();
          this.goToHomePage();
        })
        .catch(err => {
          console.log(err);
        });
    },
    login(loginForm) {
      axios
        .post(`${userPath}/signin`, {
          email: loginForm.email,
          password: loginForm.password
        })
        .then(({ data }) => {
          Swal.fire({
            type: "success",
            title: "Login Success",
            showConfirmButton: false,
            timer: 1500
          });
          loginForm = {};
          localStorage.token = data.token;
          localStorage.name = data.name;
          localStorage.id = data.id;
          this.user.name = localStorage.name;
          setTimeout(() => {
            this.user.isLogin = true;
            this.goToHomePage();
            this.fetchArticles();
            this.fetchTags();
          }, 1800);
        })
        .catch(err => {
          loginForm = {};
          Swal.fire({
            type: "error",
            text: `${err.response.data}`
          });
        });
    },

    register(registerForm) {
      axios
        .post(`${userPath}/signup`, {
          name: registerForm.name,
          email: registerForm.email,
          password: registerForm.password
        })
        .then(({ data }) => {
          Swal.fire({
            type: "success",
            title: "Register Success",
            showConfirmButton: false,
            timer: 1500
          });
          registerForm = {};
          localStorage.token = data.token;
          localStorage.name = data.name;
          localStorage.id = data.id;
          this.user.name = data.name;
          setTimeout(() => {
            this.user.isLogin = true;
            this.goToHomePage();
            this.fetchArticles();
          }, 1800);
        })
        .catch(err => {
          registerForm = {};
          Swal.fire({
            type: "error",
            text: `${err.response.data}`
          });
        });
    },

    logout() {
      // var auth2 = gapi.auth2.getAuthInstance();
      // auth2.signOut().then(function() {
      //   gapi.signin2.render("google-signin-button");
      // });

      localStorage.clear();
      this.articles = [];
      this.tags = [];
      (this.searchValue = ""), (this.user.isLogin = false);
      this.goToLoginPage();
    },

    fetchArticles() {
      console.log("masok");
      axios
        .get(`${articlePath}`, { headers: { token: localStorage.token } })
        .then(({ data }) => {
          console.log(data);
          this.articles = data;
        })
        .catch(err => console.log(err.response.data));
    },

    fetchMyArticles() {
      axios
        .get(`${articlePath}/myArticles`, {
          headers: { token: localStorage.token, id: localStorage.id }
        })
        .then(({ data }) => {
          console.log(data);
          this.myArticles = data;
        })
        .catch(err => console.log(err.response.data));
    },

    createArticle(data) {
      let formData = new FormData();
      formData.append(
        "title",
        this.newArticle.title ? this.newArticle.title : "Untitled"
      );
      formData.append("content", this.newArticle.content);
      if (data.image) formData.append("image", this.newArticle.image);
      if (data.tags.length)
        formData.append("tags", JSON.stringify(this.newArticle.tags));
      axios
        .post(`${articlePath}`, formData, {
          headers: { token: localStorage.token }
        })
        .then(({ data }) => {
          Swal.fire({
            type: "success",
            title: "Article Published",
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(() => {
            this.newArticle = {};
            this.articles.unshift(data);
            this.fetchTags();
            this.goToHomePage();
          }, 1800);
        })
        .catch(err => {
          console.log(err.response.data);
          Swal.fire({
            type: "error",
            text: `${err.response.data}`
          });
        });
    },

    showDetailArticle(id) {
      this.article = this.articles.filter(el => el._id == id)[0];
      this.goToArticleDetail();
    },

    editArticle(id) {
      this.article = this.myArticles.filter(el => el._id == id)[0];
      this.goToEditArticlePage();
    },

    submitEdit(id) {
      // let formData = new FormData();
      // formData.append("title", this.article.title);
      // formData.append("content", this.article.content);
      // if (this.article.image) formData.append("image", this.article.image);
      // if (this.article.tags.length) formData.append("tags", JSON.stringify(this.article.tags));
      // console.log(...formData)
      axios
        .put(`${articlePath}/${id}`, this.article, {
          headers: { token: localStorage.token, id: localStorage.id }
        })
        .then(({ data }) => {
          // this.myArticles = this.myArticles.map(el => el._id == id ? el = data : false)
          this.article = {};
          this.goToMyArticlePage();
        })
        .catch(err => console.log(err.response.data));
    },

    deleteArticle(id) {
      axios
        .delete(`${articlePath}/${id}`, {
          headers: { token: localStorage.token, id: localStorage.id }
        })
        .then(({ data }) => {
          this.articles.findIndex(el => el._id == data._id) > 0
            ? this.articles.splice(
                this.articles.findIndex(el => el._id == data._id),
                1
              )
            : false;
          this.myArticles.findIndex(el => el._id == data._id) > 0
            ? this.myArticles.splice(
                this.myArticles.findIndex(el => el._id == data._id),
                1
              )
            : false;
          this.goToMyArticlePage();
        })
        .catch(err => console.log(err.response.data));
    },

    searchArticle(value) {
      this.nmf = false;
      this.searchValue = value;
      if (!this.searchValue) {
        this.fetchArticles();
      } else {
        var value = this.searchValue.toLowerCase();
        const regex = new RegExp(value, "i");
        let filtered = this.articles.filter(article =>
          article.title.match(regex)
        );
        if (filtered.length) this.articles = filtered;
        if (!filtered.length) {
          this.articles = [];
          this.nmf = true;
        }
      }
    },

    searchByTag(tagName) {
      this.searchValue = tagName;
      console.log(this.searchValue);
      axios
        .get(`${tagPath}/search?name=${this.searchValue}`, {
          headers: { token: localStorage.token }
        })
        .then(data => {
          this.scrollToTop();
          this.articles = Object.values(data.data.ArticleId);
        })
        .catch(err => console.log(err.response.data));
    },

    fetchTags() {
      axios
        .get(`${tagPath}`, { headers: { token: localStorage.token } })
        .then(({ data }) => {
          this.tags = data;
        })
        .catch(err => console.log(err.response.data));
    },

    goToLoginPage() {
      this.pages.loginPage = true;
      this.pages.registerPage = false;
      this.pages.homePage = false;
      this.pages.addArticlePage = false;
      this.pages.articleDetail = false;
      this.pages.myArticlePage = false;
      this.pages.editArticlePage = false;
    },

    goToRegisterPage() {
      this.pages.loginPage = false;
      this.pages.registerPage = true;
      this.pages.homePage = false;
      this.pages.addArticlePage = false;
      this.pages.articleDetail = false;
      this.pages.myArticlePage = false;
      this.pages.editArticlePage = false;
    },

    goToHomePage() {
      this.fetchArticles();
      this.searchValue = "";
      this.nmf = false;
      this.pages.loginPage = false;
      this.pages.registerPage = false;
      this.pages.homePage = true;
      this.pages.addArticlePage = false;
      this.pages.articleDetail = false;
      this.pages.myArticlePage = false;
      this.pages.editArticlePage = false;
      this.newArticle = {};
      this.scrollToTop();
    },

    goToAddArticlePage() {
      this.pages.loginPage = false;
      this.pages.registerPage = false;
      this.pages.homePage = false;
      this.pages.addArticlePage = true;
      this.pages.articleDetail = false;
      this.pages.myArticlePage = false;
      this.pages.editArticlePage = false;
      this.scrollToTop();
    },

    goToArticleDetail() {
      this.pages.loginPage = false;
      this.pages.registerPage = false;
      this.pages.homePage = false;
      this.pages.addArticlePage = false;
      this.pages.articleDetail = true;
      this.pages.myArticlePage = false;
      this.pages.editArticlePage = false;
      this.scrollToTop();
    },

    goToMyArticlePage() {
      this.fetchMyArticles();
      this.pages.loginPage = false;
      this.pages.registerPage = false;
      this.pages.homePage = false;
      this.pages.addArticlePage = false;
      this.pages.articleDetail = false;
      this.pages.myArticlePage = true;
      this.pages.editArticlePage = false;
    },

    goToEditArticlePage() {
      this.pages.loginPage = false;
      this.pages.registerPage = false;
      this.pages.homePage = false;
      this.pages.addArticlePage = false;
      this.pages.articleDetail = false;
      this.pages.myArticlePage = false;
      this.pages.editArticlePage = true;
      this.scrollToTop();
    },

    scrollToTop() {
      window.scrollTo(0, 0);
    }
  },
  mounted() {
    if (localStorage.token) {
      this.user.isLogin = true;
      this.user.name = localStorage.name;
      this.goToHomePage();
      this.fetchArticles();
      this.fetchTags();
    }
  }
};
</script>

<style>
</style>
