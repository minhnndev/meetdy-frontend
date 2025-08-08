import { useNavigate } from "react-router-dom";
import { Table, Breadcrumb, Divider, Space, message, Popconfirm } from "antd";
import adminApi from "@/api/adminApi";
import { DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "./style.css";

function StickerPage(props) {
    const stickers = props.location.state;
    const navigate = useNavigate();
    const [dataSource, setDataSource] = useState([]);
    const [sticker, setSticker] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);

    function cancel() {
        message.error("Click on No");
    }

    const columns = [
        {
            title: "Sticker",
            //dataIndex: 'stickers',
            key: "stickers",
            render: (stickers: string) => (
                <span>
                    <a key={stickers}>
                        <img
                            width="125px"
                            height="75px"
                            src={stickers}
                            style={{ border: "1px solid black" }}
                        />
                        <br />
                    </a>
                </span>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (stickers: string, data: string, row: string) => (
                <Space size="middle">
                    <Popconfirm
                        title="Bạn có muốn xoá ?"
                        onConfirm={() => handleDeleteSticker("1", stickers)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a>
                            <DeleteOutlined />
                            Xoá Sticker{" "}
                        </a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    const handleGetAllGruopSricker = async () => {
        try {
            const list = await adminApi.fetchAllGroupSticker();
            return list;
        } catch (error) {}
    };

    useEffect(() => {
        handleGetAllGruopSricker()
            .then((result) => {
                setDataSource(result);
            })
            .catch((err) => {
                throw err;
            });
    }, []);

    const handleGetAllSricker = async () => {
        try {
            dataSource.map((result1) => {
                setSticker(result1.stickers);
                return result1.stickers;
            });
        } catch (error) {}
    };

    const handleDeleteSticker = (id: string, urlstickers: string) => {
        try {
            adminApi.deleteSticker(id, urlstickers);
            navigate(`/admin/stickers`);
            window.location.reload();
            message.success("Đã xoá sticker", 5);
        } catch (error) {
            message.error("chưa xoá được sticker", 5);
            console.log("fail ");
        }
    };

    return (
        <>
            <div className="ant-col-xs-8">
                <h1>DANH SÁCH STICKER</h1>
            </div>
            <Divider></Divider>
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>&ensp; Admin</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="/admin/stickers">Group Sticker</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">Stickers</a>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Divider></Divider>

            <Table
                dataSource={stickers}
                columns={columns}
                bordered
                pagination={{
                    current: page,
                    pageSize: pageSize,
                    showSizeChanger: false,
                    onChange: (page, pageSize) => {
                        setPage(page);
                        setPageSize(pageSize);
                    },
                }}
                rowKey={(record) => record.stickers}
            ></Table>
        </>
    );
}

export default StickerPage;
