import React from 'react';
import { Button, Result } from 'antd';

import { useNavigate } from "react-router-dom";
import BasicLayout from "layouts/authentication/components/BasicLayout";

const NotFoundPage = () => {
    const navigate = useNavigate(); // Use the hook inside the component

    return (
        <BasicLayout>

            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={() => navigate("/dashboard")}>Back Home</Button>}
            />
        </BasicLayout>
    );
};
export default NotFoundPage;