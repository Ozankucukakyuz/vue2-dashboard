<template>
  <v-app-bar app color="primary" class="navbar">
    <v-img src="@/assets/narbulut-logo.svg" alt="Narbulut Logo" max-height="40" contain class="navbar-logo" />

    <v-toolbar-title class="title-centered">{{ pageTitle }}</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-btn icon>
      <v-avatar>
        <span class="white--text">{{ initials }}</span>
      </v-avatar>
    </v-btn>
    <v-btn text @click="showProfileDialog = true">{{ currentUser.firstName }} {{ currentUser.lastName }}</v-btn>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on">Logout</v-btn>
      </template>
      <v-list>
        <v-list-item @click="logout">
          <v-list-item-title>Çıkış Yap</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-dialog v-model="showProfileDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Kullanıcı Değiştir</v-card-title>
        <v-list>
          <v-list-item
            v-for="user in users"
            :key="user.id"
            @click="changeUser(user)"
          >
            <v-list-item-title>{{ user.firstName }} {{ user.lastName }}</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-btn color="primary" text @click="showProfileDialog = false">Kapat</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      showProfileDialog: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    users() {
      return this.$store.state.users;
    },
    initials() {
      if (!this.currentUser) return "";
      return this.currentUser.firstName.charAt(0) + this.currentUser.lastName.charAt(0);
    },
    pageTitle() {
      return this.$store.getters.pageTitle;
    },
    isAuthenticated() {
      return this.$store.state.isAuthenticated || false;
    },
  },
  methods: {
    changeUser(user) {
      if (this.currentUser.id !== user.id) {
        this.$store.dispatch("setCurrentUser", user);
        this.showProfileDialog = false; // Pop-up'ı kapat
      }
    },
    logout() {
      this.$store.dispatch("logout");
    }
  },
};
</script>

<style scoped>
.navbar-logo {
  max-height: 40px;
  position: absolute;
  left: 16px;
  width: 200px; 
}

.title-centered {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
}

.v-avatar {
  width: 40px;
  height: 40px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffc9c9;
}
</style>
