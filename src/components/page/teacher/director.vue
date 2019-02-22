<template ref="chatContent">
    <div class="table" >
    	<Header></Header>
        <div class="container" >
            <el-form :model="form" ref="form" class="item-add-list" >
            	<!-- <div>跟课报告</div> -->
              	<el-form-item label="跟课报告">
                    <el-select v-model="lesson" filterable placeholder="请选择班级" @change="handelchange">
                      <el-option v-for="item in classes" :key="item.id" :label="item.className" :value="item.id"></el-option>
                    </el-select>  
              	</el-form-item>
				<el-form-item v-if="tableshow" label="Local teacher合作学校老师：">
              		<el-input type="text" v-model="form.localTeacher" style="margin-top: 10px;" placeholder="请输入Local teacher合作学校老师"></el-input>
              	</el-form-item>
				<el-form-item v-if="tableshow" label="Time duration 听课时段：">
              		<el-input type="text" v-model="form.duration" style="margin-top: 10px;" placeholder="请输入Time duration 听课时段"></el-input>
              	</el-form-item>              	    
				<el-form-item v-if="tableshow" label="Sales manager 销售经理：">
              		<el-input type="text" v-model="form.salesManager" style="margin-top: 10px;" placeholder="请输入Sales manager 销售经理"></el-input>
              	</el-form-item>   
				<el-form-item v-if="tableshow" label="Observer听课人：">
              		<el-input type="text" v-model="form.observer" style="margin-top: 10px;" placeholder="请输入Observer听课人"></el-input>
              	</el-form-item>                 	           	              	
              	<el-form-item v-if="tableshow">
					<div class="exam-title">Evaluation 评估标准5：exceeds expectations优秀4：highly proficient 良好3：satisfactorily 合格2：need improvement待改进</div>
					<div class="exam-title">RUBRICS</div>
					<template  v-for="(item, index) in list.rubrics">
		                <div>{{item.itemName}}</div>
		                <!-- <div>{{item.itemName[1]}}</div> -->
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
              	</el-form-item>

				<el-form-item v-if="tableshow">
					<div class="exam-title">LEARNING ENVIRONMENT 学习氛围</div>
					<template  v-for="(item, index) in list.learningEnvironment">
		                <div>{{item.itemName}}</div>
		                <!-- <div>{{item.itemName[1]}}</div> -->
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
              	</el-form-item>              	

				<el-form-item v-if="tableshow">
					<div class="exam-title">SUBJECT MATTER KNOWLEDGE 学科知识</div>
					<template  v-for="(item, index) in list.subjectMatterKnowledge">
		                <div>{{item.itemName}}</div>
		                <!-- <div>{{item.itemName[1]}}</div> -->
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
              	</el-form-item>              	
              	         	
				<el-form-item v-if="tableshow">
					<div class="exam-title">ENGAGING AND SUPPORTING 参与和支持</div>
					<template  v-for="(item, index) in list.engagingAndSupportin">
		                <div>{{item.itemName}}</div>
		                <!-- <div>{{item.itemName[1]}}</div> -->
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
              	</el-form-item> 

				<el-form-item v-if="tableshow">
					<div class="exam-title">ASSESSING STUDENT LEARNING学习评估</div>
					<template  v-for="(item, index) in list.assessingStudentLearning">
		                <div>{{item.itemName}}</div>
		                <!-- <div>{{item.itemName[1]}}</div> -->
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
              	</el-form-item>   

				<el-form-item v-if="tableshow">
					<div class="exam-title">ASSESSING STUDENT LEARNING学习评估</div>
					<template  v-for="(item, index) in list.planningDesigningAndDelivering">
		                <div>{{item.itemName}}</div>
		                <!-- <div>{{item.itemName[1]}}</div> -->
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
              	</el-form-item>              	 
              	<el-form-item v-if="tableshow">
					<div class="exam-title">Observer Comments 教学主任评语：</div>
              		<el-input type="textarea" v-model="form.comment" style="margin-top: 20px;"></el-input>
              	</el-form-item>   
				<el-form-item v-if="tableshow">
					<div class="exam-title">Lecturer Reflection on the Lesson 授课老师课后教学反思：</div>
              		<el-input type="textarea" v-model="form.reflection" style="margin-top: 20px;"></el-input>
              	</el-form-item>              	             	                 	         	
            </el-form>
        	<div class="exam_btn" style="margin-left:80px;">
          		<el-button type="primary" @click="submit">提交跟课报告</el-button>
        	</div>            
        </div>
    </div>
</template>

<script>
	import Header from "../../common/Header.vue"
  export default {
    name: 'comment',
    data() {
      return {
        form: {
          comment:'',
          reflection:'',
          duration:'',
          localTeacher:'',
          salesManager:'',
          observer:''
        },
        lesson:"",
        selected:'',
        exam:[],
        classes:[],
        list:{
        	assessingStudentLearning:[],
        	engagingAndSupportin:[],
        	learningEnvironment:[],
        	lecturerReflection:[],
        	observerComments:[],
        	planningDesigningAndDelivering:[],
        	rubrics:[],
        	subjectMatterKnowledge:[]
        },
        itemName:'',
        data:'',
        commentshow:false,
        tableshow:false,
        other:[],
        returndata:''
      }
    },
    created(){
      this.getSelectData();
      this.id = localStorage.getItem('classId');
    },
    computed: {
      
    },
    methods: {
        getSelectData(){
            this.classId = localStorage.getItem('classId')
            // console.log( this.classId);
            this.$get('realclasses?pageSize=100').then((res) => {
            if(res.code === 0){
                this.classes = res.data.list;
            }else{
                this.$message.error('接口数据请求失败');
            }
          }).catch(() => {this.loading = false})            
        },
        handelchange(){
           this.getlistData();
           this.form={}
         },
        getlistData(){
          this.$get('academicdeans/'+this.id+'/classes/'+this.lesson+'/getclassevaluation').then((res) => {
            if(res.code === 0){
              // this.datalength = res.data.length;
              this.tableshow = true;
            if(!res.data.other){
                this.list = JSON.parse(JSON.stringify(res.data))
                // console.log(this.list);
            }else{
              	this.list = JSON.parse(JSON.stringify(res.data))
                this.form = res.data.other 
                this.returndata = res.data;  
                // for(var i=0;i<res.data.length;i++){
                // 	this.exam = res.data[i].answer.toString()  
                // }
                        	
              	// console.log(this.list);
				for(var i=0;i<res.data.assessingStudentLearning.length;i++){
              		res.data.assessingStudentLearning[i].exam = res.data.assessingStudentLearning[i].answer?res.data.assessingStudentLearning[i].answer.toString():''
              	}
				for(var i=0;i<res.data.engagingAndSupportin.length;i++){
              		res.data.engagingAndSupportin[i].exam = res.data.engagingAndSupportin[i].answer?res.data.engagingAndSupportin[i].answer.toString():''
              	}              	
				for(var i=0;i<res.data.learningEnvironment.length;i++){
              		res.data.learningEnvironment[i].exam = res.data.learningEnvironment[i].answer?res.data.learningEnvironment[i].answer.toString():''
              	}              	
				for(var i=0;i<res.data.planningDesigningAndDelivering.length;i++){
              		res.data.planningDesigningAndDelivering[i].exam = res.data.planningDesigningAndDelivering[i].answer?res.data.planningDesigningAndDelivering[i].answer.toString():''
              	}              	
				for(var i=0;i<res.data.rubrics.length;i++){
              		res.data.rubrics[i].exam = res.data.rubrics[i].answer?res.data.rubrics[i].answer.toString():''
              	} 
				for(var i=0;i<res.data.subjectMatterKnowledge.length;i++){
              		res.data.subjectMatterKnowledge[i].exam = res.data.subjectMatterKnowledge[i].answer?res.data.subjectMatterKnowledge[i].answer.toString():''
              	}              	             	          	
                this.list = JSON.parse(JSON.stringify(res.data))
                this.form = res.data.other     
	        	// console.log(this.form)
              }
            }else{
                this.$message.error('接口数据请求失败');
            }

          }).catch(() => {this.loading = false})            
        },
        submit(){
	        this.loading = true
	        this.exam = []  
	        var item;
	        var other=[]
	        // console.log(this.returndata);
	        if(!this.returndata.other){
	            for(var i=0; i <this.list.assessingStudentLearning.length; i++ ){
	              item={"itemId":this.list.assessingStudentLearning[i].itemId,"choose":this.list.assessingStudentLearning[i].exam?this.list.assessingStudentLearning[i].exam:''}
	                this.exam.push(item)
	            }   
	 			for(var i=0; i <this.list.engagingAndSupportin.length; i++ ){
	              item={"itemId":this.list.engagingAndSupportin[i].itemId,"choose":this.list.engagingAndSupportin[i].exam?this.list.engagingAndSupportin[i].exam:''}
	                this.exam.push(item)
	            }              
	 			for(var i=0; i <this.list.learningEnvironment.length; i++ ){
	              item={"itemId":this.list.learningEnvironment[i].itemId,"choose":this.list.learningEnvironment[i].exam?this.list.learningEnvironment[i].exam:''}
	                this.exam.push(item)
	            } 
				for(var i=0; i <this.list.observerComments.length; i++ ){
	              item={"itemId":this.list.observerComments[i].itemId,"choose":this.list.observerComments[i].exam?this.list.observerComments[i].exam:''}
	                this.exam.push(item)
	            } 		            
				for(var i=0; i <this.list.lecturerReflection.length; i++ ){
	              item={"itemId":this.list.lecturerReflection[i].itemId,"choose":this.list.lecturerReflection[i].exam?this.list.lecturerReflection[i].exam:''}
	                this.exam.push(item)
	            } 	                         
	 			for(var i=0; i <this.list.planningDesigningAndDelivering.length; i++ ){
	              item={"itemId":this.list.planningDesigningAndDelivering[i].itemId,"choose":this.list.planningDesigningAndDelivering[i].exam?this.list.planningDesigningAndDelivering[i].exam:''}
	                this.exam.push(item)
	            }              
	 			for(var i=0; i <this.list.rubrics.length; i++ ){
	              item={"itemId":this.list.rubrics[i].itemId,"choose":this.list.rubrics[i].exam?this.list.rubrics[i].exam:''}
	                this.exam.push(item)
	            }              
	 			for(var i=0; i <this.list.subjectMatterKnowledge.length; i++ ){
	              item={"itemId":this.list.subjectMatterKnowledge[i].itemId,"choose":this.list.subjectMatterKnowledge[i].exam?this.list.subjectMatterKnowledge[i].exam:''}
	                this.exam.push(item)
	            }      
	        }else{
	        	// this.form = this.data.other
	        	console.log(this.form)
				for(var i=0; i <this.list.assessingStudentLearning.length; i++ ){
	              item={"id":this.list.assessingStudentLearning[i].id,"choose":this.list.assessingStudentLearning[i].exam?this.list.assessingStudentLearning[i].exam:''}
	                this.exam.push(item)
	            }   
	 			for(var i=0; i <this.list.engagingAndSupportin.length; i++ ){
	              item={"id":this.list.engagingAndSupportin[i].id,"choose":this.list.engagingAndSupportin[i].exam?this.list.engagingAndSupportin[i].exam:''}
	                this.exam.push(item)
	            }              
	 			for(var i=0; i <this.list.learningEnvironment.length; i++ ){
	              item={"id":this.list.learningEnvironment[i].id,"choose":this.list.learningEnvironment[i].exam?this.list.learningEnvironment[i].exam:''}
	                this.exam.push(item)
	            } 
				for(var i=0; i <this.list.observerComments.length; i++ ){
	              item={"id":this.list.observerComments[i].id,"choose":this.list.observerComments[i].exam?this.list.observerComments[i].exam:''}
	                this.exam.push(item)
	            } 		            
				for(var i=0; i <this.list.lecturerReflection.length; i++ ){
	              item={"itemId":this.list.lecturerReflection[i].id,"choose":this.list.lecturerReflection[i].exam?this.list.lecturerReflection[i].exam:''}
	                this.exam.push(item)
	            } 	                         
	 			for(var i=0; i <this.list.planningDesigningAndDelivering.length; i++ ){
	              item={"id":this.list.planningDesigningAndDelivering[i].id,"choose":this.list.planningDesigningAndDelivering[i].exam?this.list.planningDesigningAndDelivering[i].exam:''}
	                this.exam.push(item)
	            }              
	 			for(var i=0; i <this.list.rubrics.length; i++ ){
	              item={"id":this.list.rubrics[i].id,"choose":this.list.rubrics[i].exam?this.list.rubrics[i].exam:''}
	                this.exam.push(item)
	            }              
	 			for(var i=0; i <this.list.subjectMatterKnowledge.length; i++ ){
	              item={"id":this.list.subjectMatterKnowledge[i].id,"choose":this.list.subjectMatterKnowledge[i].exam?this.list.subjectMatterKnowledge[i].exam:''}
	                this.exam.push(item)
	            }      	        	
	        }
            this.$post("academicdeans/"+this.id+"/classes/"+this.lesson+"/classevaluation",{
                scoreList: this.exam,
                other:this.form,
                }).then((res) => {
              if(res.code === 0){
                this.$message({message:res.data,type: 'success'});
                 this.tableshow = false;
                // window.reload()
              }else{
                this.$message.error(res.data);
              }
            })          
	    }
    },
	components: {
		Header
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
  .exam-title{
  	border: 1px solid #EEEEEE;
  }
</style>

