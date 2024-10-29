<template>
  <v-container>
    <v-card>
      <v-card-title>Kullanıcı Bilgileri</v-card-title>
      <v-card-text>
        <p>İsim: {{ currentUser.firstName }} {{ currentUser.lastName }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.currentUser || this.$store.state.users[0];
    }
  }
};
</script>
