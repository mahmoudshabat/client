import React from 'react'
import {Form, Icon, Input, Button, Select} from 'antd';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';

const FormItem = Form.Item;
const Option = Select.Option;

class App extends React.Component {

    static contextTypes = {
        router: () => true, // replace with PropTypes.object if you use them
    }

    state = {showSpecialization: false};

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                const names = values.name.split(' ');

                switch (values.type) {
                    case 'doctor':
                        await this.props.addDoctor({
                            variables: {
                                firstName: names[0],
                                lastName: names[1],
                                phoneNumber: values.phoneNumber,
                                gender: values.gender,
                                username: values.username,
                                password: values.password,
                                specialization: values.specialization,
                            }
                        });

                    case 'secretary':
                        await this.props.addSecretary({
                            variables: {
                                firstName: names[0],
                                lastName: names[1],
                                phoneNumber: values.phoneNumber,
                                gender: values.gender,
                                username: values.username,
                                password: values.password,
                            }
                        });
                    case 'cashier':
                        await this.props.addCashier({
                            variables: {
                                firstName: names[0],
                                lastName: names[1],
                                phoneNumber: values.phoneNumber,
                                gender: values.gender,
                                username: values.username,
                                password: values.password,
                            }
                        });
                }

                this.context.router.history.goBack()

            }
        });
    }
    handleSelectChange = (value) => {
        console.log(value);
        if (value == 'doctor') this.setState({showSpecialization: true})
        else this.setState({showSpecialization: false})
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div style={{width: '30%', margin: '0 auto', marginTop: '120px'}}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: 'Please input your first Name!'}],
                        })(
                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Name"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('phoneNumber', {
                            rules: [{required: true, message: 'Please input your phone number!'}],
                        })(
                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   placeholder="Phone Number"/>
                        )}
                    </FormItem>
                    <FormItem
                    >
                        {getFieldDecorator('gender', {
                            rules: [{required: true, message: 'Please select your gender!'}],
                        })(
                            <Select
                                placeholder="Gender"
                            >
                                <Option value="male">male</Option>
                                <Option value="female">female</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                    >
                        {getFieldDecorator('type', {
                            rules: [{required: true, message: 'Please select Employee Type!'}],
                        })(
                            <Select
                                placeholder="Employee Type"
                                onChange={this.handleSelectChange}
                            >
                                <Option value="doctor">Doctor</Option>
                                <Option value="secretary">Secretary</Option>
                                <Option value="cashier">Cashier</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please input your username!'}],
                        })(
                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   placeholder="Username"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your Password!'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                   placeholder="Password"/>
                        )}
                    </FormItem>
                    {
                        this.state.showSpecialization &&
                        <FormItem>
                            {getFieldDecorator('specialization', {
                                rules: [{required: true, message: 'Please input your specialization!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="Specialization"/>
                            )}
                        </FormItem>
                    }
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Add
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

App = Form.create()(App);

const mutDoc = gql`
    mutation addDoctor($firstName: String, $lastName: String, $phoneNumber: String, $gender: String,
    $specialization: String, $username: String, $password: String
    ) {
        addDoctor(param: {
            firstName: $firstName,
            lastName: $lastName,
            phoneNumber: $phoneNumber,
            gender: $gender,
            specialization: $specialization,
            username: $username,
            password: $password,
        }) {
            _id
        }
    }

`;


const mutSec = gql`
    mutation addSecretary($firstName: String, $lastName: String, $phoneNumber: String, $gender: String,
    $username: String, $password: String
    ) {
        addSecretary(param: {
            firstName: $firstName,
            lastName: $lastName,
            phoneNumber: $phoneNumber,
            gender: $gender,
            username: $username,
            password: $password,
        }) {
            _id
        }
    }

`;


const mutCash = gql`
    mutation addCashier($firstName: String, $lastName: String, $phoneNumber: String, $gender: String,
    $username: String, $password: String
    ) {
        addCashier(param: {
            firstName: $firstName,
            lastName: $lastName,
            phoneNumber: $phoneNumber,
            gender: $gender,
            username: $username,
            password: $password,
        }) {
            _id
        }
    }

`;


export default compose(
    graphql(mutDoc, {name: 'addDoctor'}),
    graphql(mutDoc, {name: 'addSecretary'}),
    graphql(mutDoc, {name: 'addCashier'}),
)(App);
