import React, {Component, useState, forwardRef, useEffect} from 'react';
import  PropTypes from 'prop-types';
import {
    Form,
    Input,

} from 'antd';
/*;
更新分类的form组件
 */
// const result=e.categoryName;


export default class UpdateForm extends React.Component {
    formRef = React.createRef();
    static propTypes={
         // categoryName:PropTypes.string.isRequired,
        setForm:PropTypes.func.isRequired
    };

    componentWillMount() {
        // 将formRef对象通过setForm（）传递给父组件
        this.props.setForm(this.formRef)
    }



    render() {
        const {categoryName}=this.props;

        return (
            <Form ref={this.formRef} name="update-ref" >

                <Form.Item
                     name="categoryName"
                    label="分类名称"
                    initialValue={categoryName}
                    rules={[{required: true, whitespace: true, message: '分类名称必须输入'}]}
                >
                    <Input placeholder={'请输入分类名称'}/>
                </Form.Item>
            </Form>
        );
    }
}


/*
class UpdateForm extends Component{


    constructor(props){
        super(props);
        this.state={}
    }
    formRef=React.createRef();

    componentDidUpdate() {
        this.formRef.current.setFieldsValue({
            categoryName:"cccccc",
        });
    }


    render(){
        const {categoryName}=this.props;

        return (
            <div>

               <Update categoryName={categoryName} ref={this.formRef}/>
            </div>

        )
    }
}


//将子组件中的categoryname传递给父组件


const Update=(e)=>{
    const result=e.categoryName;
    //创建form控制实例
    const [form]=Form.useForm();
    const  Item=Form.Item;
    const Option=Select.Option;
   console.log("aaaa",e);
   const onFinish=(values)=>{
       console.log("values",values);
   }


    return (

        <Form
            form={form}
            name='update'
            initialValues={{   //给选项设置默认初始值
                categoryName:result
            }}
        >
            <Item name='categoryName'
            >
                <Input placeholder='请输入分类名称'/>
            </Item>

        </Form>
    )
}
export  default  UpdateForm;
*/