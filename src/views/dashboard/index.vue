<template>
  <div class="dashboard-container">
   编排系统
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import {useRouter} from "vue-router";
export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {

  },
  created() {
    const router = useRouter();
    router.push("/nested/menu1");

  },
  mounted() {
    const router = useRouter();
    router.push("/nested/menu1");
  }
}
</script>
