<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" app flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="d-flex">
        vue/rust webapp
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :color="color"
      :expand-on-hover="expandOnHover"
      :mini-variant="miniVariant"
      :right="right"
      app
      fixed
      dark
    >
      <v-list dense nav class="py-0">
        <v-list-item v-if="user.image" :class="miniVariant && 'px-0'" two-line>
          <v-list-item-avatar class="mx-0" v-on="on">
            <img :src="user.image" alt="">
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item v-if="!user.image" :class="miniVariant && 'px-0'" two-line>
          <v-list-item-avatar class="mx-0">
            <img src="/owl.png" alt="">
          </v-list-item-avatar>
        </v-list-item>
        <v-divider />

        <v-tooltip v-for="(item, i) in items" :key="i" right>
          <template v-slot:activator="{ on }">
            <v-list-item
              :to="item.to"
              router
              exact
              class="mt-4"
            >
              <v-list-item-icon>
                <v-icon v-on="on">
                  {{ item.icon }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <span>{{ item.title }}</span>
        </v-tooltip>
      </v-list>
      <template v-slot:append>
        <v-list dense nav class="py-0">
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-list-item to="logout" @click="logout">
                <v-list-item-icon>
                  <v-icon v-on="on">
                    mdi-logout
                  </v-icon>
                </v-list-item-icon>
              </v-list-item>
            </template>
            <span>Logout</span>
          </v-tooltip>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app>
      <v-dialog v-model="dialog_data" scrollable max-width="600px">
        <template v-slot:activator="{ on }">
          <a v-on="on">Data protection</a>
        </template>
        <v-card>
          <v-card-title>Data protection</v-card-title>
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
    </v-footer>
  </v-app>
</template>

<script>

import DataProtection from '~/components/DataProtection.vue'
export default {
  components: {
    DataProtection
  },
  data () {
    return {
      dialog_data: false,
      bg: '',
      expandOnHover: false,
      miniVariant: false,
      clipped: false,
      drawer: true,
      fixed: false,
      right: false,
      user: [],
      color: 'primary',
      items: [
        {
          icon: 'mdi-account',
          title: 'My Account',
          to: '/users/me'
        }
      ],
      title: 'Webapp'
    }
  },
  async created () {
    const response = await this.$axios.$get('user/me')
    this.user = response.data
  },
  methods: {
    async logout () {
      await this.$auth.logout()
    }
  }
}
</script>
<style type="scss">
  .toasted {
    font-family: sans-serif !important;
    text-transform: none;
    font-weight: bold;
    right: 10px;
  }

  .toasted-container.top-right {
    top: 70px !important;
    right: 1% !important;
  }
</style>
