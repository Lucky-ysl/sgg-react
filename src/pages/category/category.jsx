import React from 'react';
import {
    Card,
    Button,
    Table,
    message,
    Modal
} from 'antd';
import LinkButton from "../../components/link-button";
import {reqCategorys,reqUpdateCategorys,reqAddCategorys} from '../../api';
import {ArrowRightOutlined,PlusOutlined } from '@ant-design/icons';
import AddForm from './add-form';
import UpdateForm from './update-form';

/*
商品分类路由
*/

export default class Category extends React.Component{

    //设定状态
    state={
        categorys:[],//一级分类列表
        loading:false,//是否正在获取数据中
        subCategorys:[],  //二级分类列表
        parentId:'0',  //当前需要显示的分类列表的parentId
        parentName:'',  //当前需要显示的名称
        showStatus:0,  //标识添加、更新的确认框是否显示，0 都不显示 1 显示添加  2 显示更新


    }

    //初始化Table所有列的数组
    initColumns=()=>{
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',//指定显示数据对应的属性名

            },
            {
                title: '操作',
                //指定需要返回的界面标签
                width:300,
                render:(category)=>(
                    <span>
                     <LinkButton onClick={ ()=>{this.showUpdate(category)}}>修改分类</LinkButton>
                        {/*如何向事件回调函数传递参数：先定一个匿名函数，在函数调用处理函数并传入数据*/}
                        {this.state.parentId==='0' ? <LinkButton onClick={()=>{this.showSubCategorys(category)}}>查看子分类</LinkButton>:null}

                 </span>
                )
            },

        ];

    }


    /*
    * 异步获取一级|二级分类列表显示
    * parentId：如果没有指定根据状态中的parentId请求，如果指定了根据指定的请求
    */
    getCategorys=async (parentId)=>{

        parentId=parentId ||this.state.parentId;
        //在发送请求之前显示loading
        this.setState({
            loading:true
        })

        //发送异步ajax请求  获取数据
        const result =await reqCategorys(parentId);

        // 在发送请求之后，无论失败或者成功，loading都不显示
        this.setState({
            loading:false
        })

        //q取出分类数组：一级|二级
        if(result.status===0){
            const categorys=result.data;
            if(parentId==='0'){
                //更新一级分类状态
                this.setState({
                    categorys
                })
            }else{
                this.setState({
                    subCategorys:categorys
                })
            }


        }else{
            message.error('获取分类列表失败！');
        }

    }

    //显示一级分类列表
    showCategorys=()=>{
        //更新为显示一级列表的状态
        this.setState({
            parentId:'0',
            parentName:'',
            subCategorys:[]
        })

    }

    //显示二级列表
    showSubCategorys=(category)=>{
        this.setState({
            parentId:category._id,
            parentName:category.name,

        },()=>{   //在状态更新且重新render（）后执行
            //获取二级分类列表
            this.getCategorys()
        })

        /*
        * setState()不能立即获取最新的状态，因为setState()是异步更新状态的 -------------------？
         */

    };

   /*
   响应点击取消：隐藏确认框
    */
    handleCancel=()=>{
        //清楚输入数据
        this.form.current.resetFields();
        //隐藏显示框
        this.setState({
            showStatus:0
        })
    };

    /*
    响应显示添加
     */
    showAdd=()=>{
        this.setState({
            showStatus:1
        })
    }

    /*
   响应显示更新分类
     */
    showUpdate=(category)=>{
        //保存分类对象
        this.category=category;

        //更新状态
        this.setState({
            showStatus:2
        })
    }

    /*
 添加分类
  */
    addCategory=async ()=>{

        //先进行验证验证通过才进行添加

        this.form.current.validateFields().then(async (err,values)=>{
        //隐藏确认框
        this.setState({
            showStatus:0
        })

        //收集数据 提交请求
        const {parentId,categoryName}= this.form.current.getFieldsValue(['parentId','categoryName']);
        //清除输入的数据
        this.form.current.resetFields();
        const result=await reqAddCategorys(categoryName,parentId);
        if(result.status===0){
            //添加的分类就是当前分类列表下的分类
            if(parentId===this.state.parentId){
            //重新获取分类
                this.getCategorys()
            }else if(parentId==='0'){//在二级分类列表下添加一级分类，重新获取一级分类列表 但是不需要显示一级分类列表
                this.getCategorys('0')
            }

             // 重新获取分类列表显示
             // this.getCategorys()
        }

        // 重新获取分类列表显示

        })
        /*
        //隐藏确认框
        this.setState({
            showStatus:0
        })

        //收集数据 提交请求
        const {parentId,categoryName}= this.form.current.getFieldsValue(['parentId','categoryName']);
        //清除输入的数据
        this.form.current.resetFields();
        const result=await reqAddCategorys(categoryName,parentId);
        if(result.status===0){
            //添加的分类就是当前分类列表下的分类
            if(parentId===this.state.parentId){
            //重新获取分类
                this.getCategorys()
            }else if(parentId==='0'){//在二级分类列表下添加一级分类，重新获取一级分类列表 但是不需要显示一级分类列表
                this.getCategorys('0')
            }

             // 重新获取分类列表显示
             // this.getCategorys()
        }

        // 重新获取分类列表显示
*/
    }

    /*
     更新分类
  */
    updateCategory = async () => {
        //先进行表单验证 通过此才进行处理
        this.form.current.validateFields().then(async (err,values)=>{
            // 1.修改成功，隐藏确定框
            this.setState({
                showStatus: 0
            });
            // 准备数据
            const categoryId = this.category._id;
            const categoryName= this.form.current.getFieldValue('categoryName');
            // const {categoryName} = values;
            // 清除输入数据
            this.form.current.resetFields();
            // 2.发送请求更新分类
            const result = await reqUpdateCategorys(categoryId, categoryName);
            if (result.status === 0) {
                //3.重新显示列表
                this.getCategorys()
            }

        })
        /*

        // 1.修改成功，隐藏确定框
        this.setState({
            showStatus: 0
        });
        // 准备数据
        const categoryId = this.category._id;
        const categoryName= this.form.current.getFieldValue('categoryName');
        // const {categoryName} = values;
        console.log("jjjjjjj",this.form.current);
        console.log("categoryName", categoryName);
        // 清除输入数据
        this.form.current.resetFields();
        // 2.发送请求更新分类
        const result = await reqUpdateCategorys(categoryId, categoryName);
        if (result.status === 0) {
            //3.重新显示列表
            this.getCategorys()
        }
*/



    };


    // 为第一次render()准备数据
    componentWillMount(){
        this.initColumns();
    }

    //执行异步任务：发送异步ajax请求
    componentDidMount(){

        //这个地方获取显示的是一级列表
        this.getCategorys();

    }

    render(){

        //读取指定的分类  如果还没有category 指定一个空对象
        const  category=this.category ||{};
        //读取状态数据
        const {categorys,loading,subCategorys,parentId,parentName,showStatus}=this.state;


        //card的左侧
        // const title="一级分类列表";
        const  title=parentId==='0'? "一级分类列表":(
            <span>
                <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
                <ArrowRightOutlined style={{marginRight:5}} />
                <span>{parentName}</span>
            </span>
        )

        //card的右侧
        const extra=(
            <Button type={'primary'} onClick={this.showAdd}>
                <PlusOutlined />
                添加
            </Button>
        )

        return (
             <div>
                 <Card title={title} extra={extra} >
                     <Table
                         bordered
                         rowKey='_id'
                         loading={loading}
                         dataSource={parentId==='0'? categorys:subCategorys}
                         columns={this.columns}
                         pagination={{defaultPageSize:5,showQuickJumper:true}}
                     />
                     <Modal
                         title="添加分类"
                         visible={showStatus===1}
                         onOk={this.addCategory}
                         onCancel={this.handleCancel}
                     >
                         <AddForm
                             categorys={categorys}
                             parentId={parentId}
                             setForm={(form)=>{
                                 this.form=form
                             }}
                         />

                     </Modal>
                     <Modal
                         title="修改"
                         visible={showStatus===2}
                         onOk={this.updateCategory}
                         onCancel={this.handleCancel}
                     >
                         <UpdateForm
                             categoryName={category.name}
                             setForm={(form) => {
                                 this.form = form
                             }}
                         />
                     </Modal>

                 </Card>
             </div>
         )
    }

}

