import React, { useEffect } from 'react';

import { Typography, Spin } from '@douyinfe/semi-ui';
import "./style.css"
import { useNavigate } from "react-router-dom";
import sleep from '@/utils/sleep';

type Props = {};

const SplashPage = (props: Props) => {
    const { Title } = Typography;
    const navigate = useNavigate();
    useEffect(() => {
        sleep(2000).then(() => {
            navigate("/login")
        })
    }, []);

    return (
        <div id='home-content'>
            <Spin size="large" spinning={true}>
                <section className="home-page" id="home">
                    <div className="content">
                        <Title heading={3} className="app-name">
                            CHAT APP
                        </Title>
                        <Title heading={2} className="app-title">
                            MEETDY APP
                        </Title>
                    </div>
                </section>
            </Spin>
        </div>
    )
}

export default SplashPage;