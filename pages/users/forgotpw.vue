<template>
  <v-row justify="center" align="center" style="height: 100vh">
    <v-col cols="12" sm="8" md="6" lg="4">
      <v-form ref="form">
        <v-card>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Forgot password</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="save">
              <input type="submit" hidden>
              <v-text-field
                v-model="user.email"
                label="eMail address"
                prepend-icon="mdi-account"
                type="text"
                outlined
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn to="/welcome" text>
              Back
            </v-btn>
            <v-spacer />
            <v-btn color="success" @click="save">
              Send email
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>
<script>

export default {
  middleware: '',
  layout: 'login',
  data () {
    return {
      user: {
        email: ''
      }
    }
  },
  methods: {
    save () {
      this.$axios.$post('user/request_reset/', this.user)
        .then((response) => {
          if (response.status.code === 200) {
            this.$router.push('/users/completereset')
          }
        })
        .catch((error) => {
          this.$toasted.error(error.response.data.status.text, {
            theme: 'toasted-primary',
            position: 'top-right',
            iconPack: 'mdi',
            icon: 'mdi-book-open-page-variant',
            duration: 3000,
            keepOnHover: true
          })
        })
    }
  }
}
</script>
