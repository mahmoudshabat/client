import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import {Layout, Menu, Icon, Input} from 'antd';
import PatientMain from './components/patient/PatientMain'

const {Header, Content, Footer, Sider} = Layout;

class App extends Component {

    render() {
        return (
            <Layout>
                <Sider style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}>
                    {/*<div className="logo" />*/}
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                        <Menu.Item key="1">
                            <Icon type="user"/>
                            <span className="nav-text">Patients</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{marginLeft: 200}}>
                    <Router>
                        <Route exact path="/" component={PatientMain}/>
                    </Router>

                    <Footer style={{textAlign: 'center'}}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default App;