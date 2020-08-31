<template>
  <v-row justify="center" align="center" style="height: 100vh">
    <v-col cols="12" sm="8" md="6" lg="4">
      <v-form
        ref="form"
        v-model="valid"
      >
        <v-card>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Forgot password</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="save">
              <input type="submit" hidden>
              <v-text-field
                v-model="user.reset_code"
                label="Reset code"
                prepend-icon="mdi-alphabetical"
                type="text"
                outlined
              />
              <v-text-field
                v-model="user.password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                :rules="[rules.password]"
                label="New password"
                prepend-icon="mdi-key-variant"
                hint="Minimum 8 chars"
                counter
                outlined
                @click:append="show1 = !show1"
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
              Set new password
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
      valid: true,
      show1: false,
      user: {
        reset_code: '',
        password: ''
      },
      rules: {
        password:
          (value) => {
            const pattern = /^(?=.{8,})/
            return (
              pattern.test(value) ||
              'Minimum 8 chars!'
            )
          }
      }
    }
  },
  created () {
    if (this.$route.query.reset_code) {
      this.user.reset_code = this.$route.query.reset_code
    }
  },
  methods: {
    save () {
      this.$axios.$post('user/reset_password/', this.user)
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
