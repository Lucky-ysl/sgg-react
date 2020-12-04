import React,{Component} from 'react';
import  PropTypes from 'prop-types';
import {
    Form,
    Select,
    Input, Button,

} from 'antd';
import {LockOutlined, UserOutlined} from "@ant-design/icons/lib";
/*
添加分类的form组件
 */


const Option=Select.Option;
const Item=Form.Item;
export default class AddForm extends React.Component{
    formRef = React.createRef();

    static  propTypes={
        setForm:PropTypes.func.isRequired,  //用于传递form对象的函数
        categorys:PropTypes.array.isRequired,  //一级分类的数组
        parentId:PropTypes.string.isRequired  //父分类的ID

    }

    componentWillMount() {
        this.props.setForm(this.formRef)
    }

    render(){
        const {categorys,parentId}=this.props;
        // const {getFieldDecorator}=this.props.form;
         return (
             <Form
                 name='add'
                 ref={this.formRef}
                 initialValues={{   //给选项设置默认初始值
                     parentId:parentId
                 }}
             >

                 <Item name='parentId'
                       lable='所属分类'
                      rules={[{ required: true ,whitespace:true, message:'请选择分类'}]}
                 >
                     <Select

                     >
                         <Option value='0' >一级分类</Option>
                         {
                             categorys.map((item)=><Option  key={item._id}value={item._id}>{item.name}</Option>)
                         }
                     </Select>

                 </Item>
                 <Item
                     name='categoryName'
                     rules={[{required: true, whitespace: true, message: '分类名称必须输入'}]}
                 >
                     <Input placeholder='请输入分类名称'/>

                 </Item>

             </Form>
         )
     }
}

