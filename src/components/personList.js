import React, {useContext} from 'react';
import PersonContext from "../contexts/personContext";
import {Popconfirm, Table, message, Button} from "antd";
import {DeleteOutlined, EditOutlined, FormOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";

function PersonList() {
    const navigate = useNavigate();
    const {personList, dispatch} = useContext(PersonContext);
    const tableStyle = {
        marginTop: '1%',
        marginLeft: '10%',
        marginRight: '10%',
    }

    function confirm(id) {
        dispatch({
            method: "REMOVE_PERSON",
            id: id,
        });
        message.success('Kayıt başarıyla silindi...');

    }

    function cancel() {
        message.info('Kaydı silmekten vazgeçtiniz...');
    }

    const columns = [
        {
            title: 'Ad',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Soyad',
            width: 100,
            dataIndex: 'surname',
            key: 'surname',
            fixed: 'left',
        },
        {
            title: 'Yaş',
            width: 100,
            dataIndex: 'age',
            key: 'age',
            fixed: 'left',
        },
        {
            title: 'Cinsiyet',
            width: 100,
            dataIndex: 'gender',
            key: 'gender',
            fixed: 'left',
        },
        {
            title: 'İşlemler',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (text, record) => <>
                <Popconfirm
                    title="Bu kaydı silmek istediğinizden emin misiniz ?"
                    onConfirm={() => confirm(record.id)}
                    onCancel={cancel}
                    okText="Evet"
                    cancelText="Hayır"
                >
                    <DeleteOutlined style={{marginRight: '10px'}}/>
                </Popconfirm>
                <Link to={`/person/${record.id}`}><EditOutlined/></Link>


            </>,
        },
    ];

    return (
        <>
            <Button style={{marginLeft: '73%', marginTop: '5%', width: '17%'}}
                    type={"primary"}
                    icon={<FormOutlined/>}
                    onClick={() => navigate("/person/create")}>Yeni Kayıt Ekle</Button>
            <br/>
            <Table pagination={false} style={tableStyle} columns={columns} dataSource={personList} scroll={{x: 1300}}/>
        </>

    );
}


export default PersonList;