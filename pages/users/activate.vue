<template>
  <v-row justify="center" align="center" style="height: 100vh">
    <v-col cols="12" sm="8" md="6" lg="4">
      <v-form
        ref="form"
        v-model="valid"
      >
        <v-card>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Activate account</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <p>
              Please enter the code from the email
            </p>
            <v-form @submit.prevent="save">
              <input type="submit" hidden>
              <v-text-field
                v-model="user.registration_code"
                label="Activation code"
                prepend-icon="mdi-alphabetical"
                type="text"
                outlined
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              to="/welcome"
              text
            >
              Cancel
            </v-btn>
            <v-spacer />
            <v-btn
              color="success"
              @click="save"
            >
              Activate Account
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
        registration_code: ''
      }
    }
  },
  created () {
    if (this.$route.query.registration_code) {
      this.user.registration_code = this.$route.query.registration_code
    }
  },
  methods: {
    save () {
      this.$axios.$post('users/activate/', this.user)
        .then((response) => {
          if (response.status.code === 200) {
            this.$auth.setUserToken(response.data.token)
          }
        })
        .catch((error) => {
          this.$toasted.global.error({
            message: error.response.data.status.text
          })
        })
    }
  }
}
</script>
