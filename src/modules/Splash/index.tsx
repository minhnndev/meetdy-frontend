import { Typography, Spin } from '@douyinfe/semi-ui';
import "./style.css"
import lang from '@/i18n';
import { IcApp } from '@/theme/icons/MDIcons';

const SplashPage = () => {
    const { Title } = Typography;
    const { t } = lang();

    return (
        <div id='home-content'>
            <Spin size='large' spinning={true} indicator={<IcApp color='blue' />}>
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