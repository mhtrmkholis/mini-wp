let baseUrl = 'http://localhost:3000/api'

// var quill = new Quill('#editor-container', {
//   modules: {
//     toolbar: [
//       [{ header: [1, 2, false] }],
//       ['bold', 'italic', 'underline'],
//       ['image', 'code-block']
//     ]
//   },
//   // placeholder: 'Type here...',
//   theme: 'snow'  // or 'bubble'
// });

let app = new Vue({
  el: '#app',
  data: {
    publishedArticles: [],
    filteredArticles: [],
    section: {
      publishedArticlesPage: false,
      createArticlePage: false,
      editArticlePage: false,
      searchArticlePage: false
    },
    article: {
      title: '',
      content: ''
    },
    formArticle: {
      title: '',
      content: ''
    },
    editArticle: {
      id: '',
      title: '',
      content: ''
    },
    search: ''
  },
  methods: {
    showPage(input) {
      Object.keys(this.section).forEach(page => {
        this.section[page] = false
      })
      this.section[input] = true

      if (input == 'publishedArticlesPage') {
        this.fetchArticles()
      }
    },

    uploadArticle() {
      axios.post(`${baseUrl}/articles`, {
        title: this.formArticle.title,
        content: this.formArticle.content
      })
        .then(({ data }) => {
          console.log('Creating article...')
          this.showPage('publishedArticlesPage')
        })
        .catch(err => console.log(err))
    },

    fetchArticles() {
      axios.get(`${baseUrl}/articles`)
        .then(({ data }) => {
          console.log('Fetching articles...')
          this.publishedArticles = data
        })
        .catch(err => {
          console.log(err)
        })
    },

    updateArticle(articleId) {
      axios.get(`${baseUrl}/articles/${articleId}`)
        .then(({ data }) => {
          console.log('Page Edit')
          this.editArticle.id = data._id
          this.editArticle.title = data.title
          this.editArticle.content = data.content
          this.showPage('editArticlePage')
        })
        .catch(err => console.log(err))
    },

    update() {
      axios.patch(`${baseUrl}/articles/${this.editArticle.id}`, { 
        title: this.editArticle.title,
        content: this.editArticle.content
      })
        .then(data => {
          console.log('Updating')
          this.showPage('publishedArticlesPage')
        })
        .catch(err => console.log(err))
    },

    deleteArticle(articleId) {
      axios.delete(`${baseUrl}/articles/${articleId}`)
        .then(data => {
          console.log('Deleting article...')
          this.publishedArticles = this.publishedArticles.filter(el => el._id != articleId)
        })
        .catch(err => {
          console.log(err)
        })
    },
    
    searchArticle() {
      let value = this.search.toLowerCase()
      const regex = new RegExp(value, 'i')
      let filtered = this.publishedArticles.filter(articles => articles.title.match(regex))

      if (filtered.length) {
        this.filteredArticles = filtered
        console.log(this.filteredArticles)
        this.showPage('searchArticlesPage')
      }
      else {
        
      }
    }
  }
})