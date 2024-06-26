import { useEffect } from 'react';

import { Typography, Spin } from '@douyinfe/semi-ui';
import "./style.css"
import { useNavigate } from "react-router-dom";
import sleep from '@/utils/sleep';
import lang from '@/i18n';

const SplashPage = () => {
    const { Title } = Typography;
    const navigate = useNavigate();
    const { t } = lang();
    useEffect(() => {
        sleep(2000).then(() => {
            navigate("/auth/login")
        })
    }, []);

    return (
        <div id='home-content'>
            <Spin size='large' spinning={true}>
                <section className="home-page" id="home">
                    <div className="content">
                        <Title heading={3} className="app-name">
                            {t("common.app_title")}
                        </Title>
                        <Title heading={2} className="app-title">
                            {t("common.app_name")}
                        </Title>
                    </div>
                </section>
            </Spin>
        </div>
    )
}

export default SplashPage;