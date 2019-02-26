<template ref="chatContent">
    <div class="table" >
        <div class="container">
            <el-form :model="form" ref="form" class="item-add-list">
              <el-form-item label="请选择班级">
                    <el-select v-model="lesson" filterable placeholder="请选择班级" @change="handelchange">
                      <el-option v-for="item in classes" :key="item.id" :label="item.className" :value="item.id"></el-option>
                    </el-select>  
              </el-form-item>
              <template  v-for="(item, index) in list" v-if='index<8'>
                <div>{{item.itemName[0]}}</div>
                <div>{{item.itemName[1]}}</div>
                <el-form-item>
                    <el-radio-group v-model="item.exam">
                      <el-radio label="5"></el-radio>
                      <el-radio label="4"></el-radio>
                      <el-radio label="3"></el-radio>
                      <el-radio label="2"></el-radio>
                      <el-radio label="1"></el-radio>
                    </el-radio-group>
                  </el-form-item>
              </template>  
              <div  v-for="(item, index) in list" v-if='index==9' v-show="typeshow">
                <div>{{item.itemName[0]}}</div>
                <div>{{item.itemName[1]}}</div>                
                 <el-form-item>
                    <el-radio-group v-model="item.exam">
                      <el-radio label="1">书面作业</el-radio>
                      <el-radio label="2">口头作业</el-radio>
                      <el-radio label="3">小组作业</el-radio>
                    </el-radio-group>
                  </el-form-item>
              </div>   
              <template  v-for="(item, index) in list" v-if='index==8'>
                <div>{{item.itemName[0]}}</div>
                <div>{{item.itemName[1]}}</div>                
                 <el-form-item>
                    <el-radio-group v-model="item.exam" @change="changehome">
                      <el-radio label="1"  value="1">是</el-radio>
                      <el-radio label="0"  value="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="没有作业请注明原因" v-show="homeworkshow">
                    <el-input v-model="form.memo"></el-input>
                  </el-form-item>
              </template>  
              <el-form-item label="Comments if any 说明" class="comment" v-if="commentshow">
                <el-input type="textarea" v-model="form.comment"></el-input>
              </el-form-item> 
              <el-form-item label="第几节课" class="comment" v-if="commentshow">
                <el-input type="textarea" v-model="form.lesson"></el-input>
              </el-form-item>                                                                                       
            </el-form>
            <div class="exam_btn" style="margin-left:80px;">
              <el-button type="primary" @click="submit">提交跟课报告</el-button>
            </div>            
        </div>
    </div>
</template>

<script>
  export default {
    name: 'comment',
    data() {
      return {
        form: {
          comment:'',
          type:'',
          memo:'',
          lesson:''
        },
        value1:"1",
        value2:"0",
        checkedValue:'',
        lesson:"",
        selected:'',
        exam:[],
        classes:[],
        list:[],
        itemName:'',
        data:'',
        commentshow:false,
        homeworkshow:false,
        hometypeshow:false,
        typeshow:false,
      }
    },
    created(){
      this.getSelectData();
      this.id = localStorage.getItem('classId');
      console.log(this.checkedValue);
    },
    computed: {
      
    },
    methods: {
        getSelectData(){
            this.classId = localStorage.getItem('classId')
            // console.log( this.classId);
            this.$get('teachers/'+ this.classId).then((res) => {
            if(res.code === 0){
                this.classes = res.data.classList;
            }else{
                this.$message.error('接口数据请求失败');
            }
          }).catch(() => {this.loading = false})            
        },
        handelchange(){
           this.getlistData()
           this.form={}
          console.log(this.checkedValue);


         },
        getlistData(){
          this.$get('teachers/'+this.id+'/classes/'+this.lesson+'/getclassreport').then((res) => {
            if(res.code === 0){
              this.commentshow = true;
              if(!res.data.lesson){
                for(var i=0,len = res.data.length ; i< len;i++){
                  res.data[i].itemName = res.data[i].itemName.split("|")
                }
                this.list = JSON.parse(JSON.stringify(res.data))
                this.data = res.data;
               
              }else{
                // this.list = JSON.parse(JSON.stringify(res.data.itemList))
                // console.log(res.data.itemList[0].itemName);
                for(var i=0,len = res.data.itemList.length ; i< len;i++){
                  res.data.itemList[i].itemName = res.data.itemList[i].itemName.split("|")
                  res.data.itemList[i].exam = res.data.itemList[i].answer?res.data.itemList[i].answer.toString():"0"
                }
                  this.list = JSON.parse(JSON.stringify(res.data.itemList))
                  this.data = res.data;
                  this.form.comment = res.data.comment
                  this.form.memo = res.data.itemList[8].memo?res.data.itemList[8].memo:''  
                  this.form.lesson = res.data.lesson  
                  if(res.data.itemList[8].answer===1){
                    this.typeshow = true
                  }else if(res.data.itemList[8].answer===0){
                    this.homeworkshow = true                     
                  } 
                 
                  console.log(this.typeshow,this.homeworkshow)  
              }
            }else{
                this.$message.error('接口数据请求失败');
            }

          }).catch(() => {this.loading = false})            
        },
        changehome(event){
          // console.log(event);
          if(this.list[8].exam === '1'){
          this.typeshow = true
          this.homeworkshow = false             
          }else{
          this.typeshow = false
          this.homeworkshow = true
          }
                  
          console.log();
        },
        submit(){
          this.loading = true
          this.exam = []  
          var item;
          if(!this.data.lesson){
            for(var i=0; i <this.list.length; i++ ){
              item={"itemId":this.list[i].itemId,"choose":this.list[i].exam?this.list[i].exam:'',"memo":this.form.memo?this.form.memo:''}
                this.exam.push(item)
            }            
          }
          if(this.data.lesson){
            for(var i=0; i <this.list.length; i++ ){
              item={"itemId":this.list[i].itemId,"choose":this.list[i].exam?this.list[i].exam:'',"memo":this.form.memo?this.form.memo:'',"id":this.list[i].id}
                this.exam.push(item)
            }
          }
          
            // console.log(this.exam);
            if(!this.form.lesson){
               this.$message.error("课时不能为空");
            }else{
              this.$post("teachers/"+this.id+"/classes/"+this.lesson+"/classreports",{
                  lesson:this.form.lesson,
                  comment : this.form.comment,
                  chooseList: this.exam
                  }).then((res) => {
                  if(res.code === 0){
                    this.$message({message:res.data,type: 'success'});
                    this.$router.push('/index');
                  }else{
                    this.$message.error(res.data);
                  }
              })               
            }
            // this.$post("teachers/"+this.id+"/classes/"+this.lesson+"/classreports",{
            //     lesson:this.form.lesson,
            //     comment : this.form.comment,
            //     chooseList: this.exam
            //     }).then((res) => {
            //     if(res.code === 0){
            //       this.$message({message:res.data,type: 'success'});
            //       this.$router.push('/index');
            //     }else{
            //       this.$message.error(res.data);
            //     }
            // })          
        }
    }
  }
</script>

<style scoped>
.handle-box { margin-bottom: 20px;}
.handle-select {width: 120px;}
.handle-input {width: 300px;display: inline-block;}
.del-dialog-cnt{font-size: 16px; text-align: center;}
.el-icon-edit-outline{color:#ffc966; font-size:24px; margin-right:10px;}
.el-icon-info{color:#448eff; font-size:24px;}

</style>
<style>
.item-title{ height:42px; background:#f6f6f6; margin-bottom:20px;}
.item-title span{ font-size:14px; color:#666; height:22px; line-height:22px;display:block; margin:10px 0 0 20px; border-left:5px solid #ff7070; padding-left:10px;}
</style>
<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .content{
    padding: 10px!important;
  }
</style>

