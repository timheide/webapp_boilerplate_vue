<template>
  <v-content>
    <section>
      <v-layout>
        <v-container>
          <v-flex>
            <v-row justify="center">
              <v-col class="pt-md-16 pb-10" cols="12" sm="8" md="4">
                <v-form ref="form" v-model="valid">
                  <v-card class=" elevation-24">
                    <v-toolbar color="primary" dark flat>
                      <v-toolbar-title>Registration</v-toolbar-title>
                      <v-spacer />
                    </v-toolbar>
                    <v-card-text>
                      <v-text-field v-model="user.email" :rules="[v => /.+@.+\..+/.test(v) || 'E-mail incorrect']" label="E-mail" outlined required />
                      <v-text-field
                        v-model="user.password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        :rules="[rules.password]"
                        label="Password"
                        hint="At least 8 chars"
                        counter
                        outlined
                        @click:append="show1 = !show1"
                      />
                      <v-checkbox :rules="[v => !!v || 'Required']" label="" required>
                        <template v-slot:label>
                          <div>
                            Accept
                            <v-dialog v-model="dialog_data" scrollable max-width="600px">
                              <template v-slot:activator="{ on }">
                                <a href="#" v-on="on">Data protection</a>
                              </template>
                              <v-card>
                                <v-card-title>Data Protection</v-card-title>
                                <v-divider class="pt-5" />
                                <v-card-text style="height: 300px;">
                                  <DataProtection />
                                </v-card-text>
                                <v-divider />
                                <v-card-actions>
                                  <v-btn color="blue darken-1" text @click="dialog_data = false">
                                    Close
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </div>
                        </template>
                      </v-checkbox>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn :disabled="!valid" color="success" @click="save">
                        Register!
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-form>
              </v-col>
            </v-row>
          </v-flex>
        </v-container>
      </v-layout>
    </section>
  </v-content>
</template>
<script>

import DataProtection from '~/components/DataProtection.vue'

export default {
  components: {
    DataProtection
  },

  middleware: '',
  layout: 'login',
  data () {
    return {
      dialog_conditions: null,
      dialog_data: null,
      valid: true,
      show1: false,
      rules: {
        password:
            (value) => {
              const pattern = /^(?=.{8,})/
              return (
                pattern.test(value) ||
                'Minimum 8 chars!'
              )
            }
      },
      user: {
        email: '',
        password: ''
      }
    }
  },
  async created () {

  },
  methods: {
    save () {
      this.$axios.$post('user/', this.user)
        .then((response) => {
          if (response.status.code === 200) {
            this.$router.push('/users/activate')
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
