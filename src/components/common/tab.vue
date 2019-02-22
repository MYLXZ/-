<template>
<div class="tab">
      <div class="tab-item">
        <a><router-link :to="{path:'sign'}">跟课报告</router-link></a>
      </div>
      <div class="tab-item"><a><router-link :to="{path:'comment'}">学生出勤</router-link></a>
      </div>
    </div>
  </div>    
</template>

<script>
  export default {
    name: 'tab',
    data() {
      return {
      }
    },
    created(){
        
    },
    computed: {

    },
  }
</script>

<style>
    .tab{
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        /*background: yellow;*/
        border:1px solid rgba(7, 17, 27, 0.1);
    }
    .tab-item{
        flex: 1;
        text-align: center ;       
    }
    .tab .tab-item a{
        display: block;
        font-size: 14px;
        color:grey;
        active:red;
    }
    .router-link-active {
      background: yellow;
        /*text-decoration: none;*/
    }
  
     
</style>
