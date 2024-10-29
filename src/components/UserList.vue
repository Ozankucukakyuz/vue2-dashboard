<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" @click="addUser">+ Yeni Kullanıcı</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="users"
          class="elevation-1"
          item-key="id"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.username }}</td>
              <td>{{ item.fullName }}</td>
              <td>{{ item.assignedTasks }}</td>
              <td>{{ item.successfulTasks }}</td>
              <td>{{ item.failedTasks }}</td>
              <td>{{ item.delayedTasks }}</td>
              <td>
                <div class="action-buttons">
                  <v-btn text class="action-button" @click="viewTasks(item)">
                    Görevleri Listele
                  </v-btn>
                  <v-btn text class="action-button" @click="viewAssignedTasks(item)">
                    Atadığı Görevleri Listele
                  </v-btn>
                </div>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['usersWithTaskStats']),
    users() {
      return this.usersWithTaskStats;
    }
  },
  data() {
    return {
      headers: [
        { text: 'Kullanıcı Adı', value: 'username' },
        { text: 'İsim Soyisim', value: 'fullName' },
        { text: 'Atanmış Görev Sayısı', value: 'assignedTasks' },
        { text: 'Başarılı Görev Sayısı', value: 'successfulTasks' },
        { text: 'Başarısız Görev Sayısı', value: 'failedTasks' },
        { text: 'Geciken Görev Sayısı', value: 'delayedTasks' }
      ]
    };
  },
  methods: {
    addUser() {
      console.log("Yeni kullanıcı ekle");
    },
    viewTasks(user) {
      this.$store.dispatch('setFilters', { assignedUser: user.username, creatorUser: null });
      this.$router.push({ name: 'TaskList' });
    },
    viewAssignedTasks(user) {
      this.$store.dispatch('setFilters', { assignedUser: null, creatorUser: user.username });
      this.$router.push({ name: 'TaskList' });
    }
  }
};
</script>

<style scoped>
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 8px;
}

.action-button {
  border-radius: 8px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  width: 250px; 
  text-align: center;
  color: black;
}

.action-button:hover {
  background-color: #e0e0e0;
}
</style>
