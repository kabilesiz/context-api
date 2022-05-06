import React, {useContext, useEffect} from 'react';
import {Button, Form, Input, InputNumber, Select} from "antd";
import PersonContext from "../contexts/personContext";
import {useNavigate, useParams} from "react-router";

function UpdatePerson() {
    const {personList, dispatch} = useContext(PersonContext);
    const params = useParams();
    const navigate = useNavigate();
    let updatedPerson = personList.find(
        (x) => x.id === Number(params.id)
    );
    const formStyle = {
        marginTop: '7%',
        marginLeft: '30%',
    }
    const [form] = Form.useForm();
    const onFinish = (values) => {
        values.id = updatedPerson.id
        values.key = updatedPerson.key
        dispatch({
            method: "EDIT_PERSON",
            person: values
        });
        navigate("/");
    };

    useEffect(() => {
        form.setFieldsValue({
            name: updatedPerson.name,
            surname: updatedPerson.surname,
            age: updatedPerson.age,
            gender: updatedPerson.gender
        })
    })

    return (
        <Form form={form} name="control-hooks" onFinish={onFinish} style={formStyle}>
            <Form.Item
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Lütfen isim bilgisini giriniz"
                    },
                ]}
            >
                <Input value={updatedPerson.name} style={{width: '50%'}} placeholder={"İsim..."}/>
            </Form.Item>
            <Form.Item
                name="surname"
                rules={[
                    {
                        required: true,
                        message: "Lütfen soy isim bilgisini giriniz"
                    },
                ]}
            >
                <Input style={{width: '50%'}} placeholder={"Soyisim..."}/>
            </Form.Item>
            <Form.Item
                name="age"
                rules={[
                    {
                        required: true,
                        message: "Lütfen yaş bilgisini giriniz"
                    },
                ]}
            >
                <InputNumber style={{width: '50%'}} min={15} max={99} placeholder={"Yaşınız..."}/>
            </Form.Item>
            <Form.Item
                name="gender"
                rules={[
                    {
                        required: true,
                        message: "Lütfen cinsiyet bilgisini giriniz"
                    },
                ]}
            >
                <Select
                    placeholder="Cinsiyetiniz..."
                    allowClear
                    style={{width: '50%'}}
                >
                    <Select.Option value="Erkek">Erkek</Select.Option>
                    <Select.Option value="Kadın">Kadın</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
            >
                {({getFieldValue}) =>
                    getFieldValue('gender') === 'other' ? (
                        <Form.Item
                            name="customizeGender"
                            label="Customize Gender"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                    ) : null
                }
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{width: '50%'}}>
                    Güncelle
                </Button>
            </Form.Item>
        </Form>
    );
}

export default UpdatePerson;