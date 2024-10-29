<template>
  <v-navigation-drawer
    app
    :mini-variant="mini"
    expand-on-hover
    permanent
    @mouseenter="expandSidebar"
    @mouseleave="collapseSidebar"
  >
    <v-list dense>
      <v-list-item @click="$emit('view-dashboard')">
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>

      <v-list-group prepend-icon="mdi-format-list-bulleted">
        <template v-slot:activator>
          <v-list-item>
            <v-list-item-title>Görevler</v-list-item-title>
          </v-list-item>
        </template>
        
        <v-list-item @click="$emit('view-tasks')">
          <v-list-item-content>
            <v-list-item-title>Görevler</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item @click="$emit('view-add-task')">
          <v-list-item-content>
            <v-list-item-title>Yeni Görev Ekle</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item @click="$emit('view-calendar')">
          <v-list-item-content>
            <v-list-item-title>Takvim</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-group prepend-icon="mdi-account-group">
        <template v-slot:activator>
          <v-list-item>
            <v-list-item-title>Kullanıcılar</v-list-item-title>
          </v-list-item>
        </template>
        <v-list-item @click="$emit('view-users')">
          <v-list-item-content>
            <v-list-item-title>Kullanıcılar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      mini: true
    };
  },
  methods: {
    expandSidebar() {
      this.mini = false;
    },
    collapseSidebar() {
      this.mini = true;
    }
  }
};
</script>

<style scoped>
.v-navigation-drawer {
  transition: width 0.3s ease;
}
.v-list-item-title {
  font-size: 16px;
  transition: opacity 0.3s ease; /* Transition for smoother appearance */
}
</style>
