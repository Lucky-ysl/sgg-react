import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {
    From,
    Input,
    Tree,

} from 'antd';

const Item =From.Item;
export default class AuthForm extends Component{
    static propTypes={
        role:PropTypes.object
    }

 render(){
     const {role}=this.props;
     console.log(this.props);
     const formItemLayout={
         labelCol:{span:4},
         wrapperCol:{span:15},
     }
     const treeData = [
         {
             title: 'parent 1',
             key: '0-0',
             children: [
                 {
                     title: 'parent 1-0',
                     key: '0-0-0',
                     disabled: true,
                     children: [
                         {
                             title: 'leaf',
                             key: '0-0-0-0',
                             disableCheckbox: true,
                         },
                         {
                             title: 'leaf',
                             key: '0-0-0-1',
                         },
                     ],
                 },
                 {
                     title: 'parent 1-1',
                     key: '0-0-1',
                     children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }],
                 },
             ],
         },
     ];
     const onSelect = (selectedKeys, info) => {
         console.log('selected', selectedKeys, info);
     };

     const onCheck = (checkedKeys, info) => {
         console.log('onCheck', checkedKeys, info);
     };
     return (
         <div>
             <Item {...formItemLayout}
             label={'角色名称'}
             >
                 <Inptut value={role.name} disabled/>
             </Item>
             <Tree
                 checkable
                 defaultExpandedKeys={['0-0-0', '0-0-1']}
                 defaultSelectedKeys={['0-0-0', '0-0-1']}
                 defaultCheckedKeys={['0-0-0', '0-0-1']}
                 onSelect={onSelect}
                 onCheck={onCheck}
                 treeData={treeData}

             />
         </div>


     )
 }
}

