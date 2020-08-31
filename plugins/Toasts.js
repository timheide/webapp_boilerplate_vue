import vue from 'vue'

vue.toasted.register('success',
  (payload) => {
    if (!payload.message) {
      return 'Succesful!'
    }
    return payload.message
  },
  {
    theme: 'toasted-primary',
    position: 'top-right',
    iconPack: 'mdi',
    icon: 'mdi-book-open-page-variant',
    duration: 3000,
    keepOnHover: true,
    type: 'success'
  }
)

vue.toasted.register('error',
  (payload) => {
    if (!payload.message) {
      return 'Error!'
    }
    return payload.message
  },
  {
    theme: 'toasted-primary',
    position: 'top-right',
    iconPack: 'mdi',
    icon: 'mdi-book-open-page-variant',
    duration: 3000,
    keepOnHover: true,
    type: 'error'
  }
)
