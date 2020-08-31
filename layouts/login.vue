<template>
  <v-app>
    <v-app-bar app flat>
      <v-toolbar-title class="d-flex">
        vue/rust webapp
      </v-toolbar-title>
      <v-spacer />
      <v-dialog v-model="dialog" max-width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            text
            v-on="on"
          >
            Login
          </v-btn>
        </template>
        <v-card>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-divider />
          <v-card-text class="pt-6">
            <v-form @submit.prevent="login">
              <input type="submit" hidden>
              <v-text-field
                v-model="email"
                label="email"
                name="email"
                prepend-icon="mdi-account"
                type="text"
                outlined
              />
              <v-text-field
                id="password"
                v-model="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                outlined
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="pwforgot">
              Forgot Password
            </v-btn>
            <v-spacer />
            <v-btn color="primary" @click.prevent="login">
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>
    <nuxt />
  </v-app>
</template>

<script>

export default {
  data () {
    return {
      email: '',
      password: '',
      dialog: false,
      dialog_data: false,
      dialog_conditions: false,
      dialog_impressum: false,
      color: 'primary',
      title: 'Test'
    }
  },
  methods: {
    pwforgot () {
      this.dialog = false
      this.$router.push('/users/forgotpw')
    },
    login () {
      this.$auth.loginWith('local', {
        data: {
          email: this.email,
          password: this.password
        }
      })
        .catch((error) => {
          this.$toasted.error(error.response.data.status.text, {
            theme: 'toasted-primary',
            position: 'top-right',
            iconPack: 'mdi',
            icon: 'mdi-book-open-page-variant',
            duration: 0,
            keepOnHover: true,
            action: [
              {
                text: 'Okay',
                onClick: (e, toastObject) => {
                  toastObject.goAway(0)
                }
              },
              {
                text: 'Forgot Password',
                onClick: (e, toastObject) => {
                  this.$router.push('/users/forgotpw')
                  toastObject.goAway(0)
                }
              }
            ]
          })
        })
    }
  }
}
</script>
