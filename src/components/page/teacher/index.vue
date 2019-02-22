<template>
    <div>欢迎{{username}}老师进入系统</div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        username:""
      }
    },
    created(){
      this.username = localStorage.getItem('teacherName');
        
    },
    computed: {

    },
  }
</script>

