import React from 'react';
import { Result } from 'antd';

NotFoundPage.propTypes = {};

function NotFoundPage(props) {
    return (
        <div id="not-found-page" class="w-11/12 mx-auto bg-white">
            <div className="main">
                <Result
                    status="404"
                    title="404"
                    subTitle="Trang không khả dụng"
                />
            </div>
        </div>
    );
}

export default NotFoundPage;
