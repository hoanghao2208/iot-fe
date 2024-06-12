import React from "react";
import {
    PhoneOutlined,
    HomeOutlined,
    SendOutlined,
    FacebookOutlined,
    YoutubeOutlined,
    LinkedinOutlined,
} from "@ant-design/icons";
import "./style.scss";
export default function Footer() {
    return (
        <div className="footer">
            <div className="ecosculpt">
                <div className="iotfarm-parent">
                    <b className="iotfarm1">
                        <span>IOT</span>
                        <span className="farm">farm</span>
                    </b>
                    <div className="cng-nhau-xy">{`Cùng nhau xây dựng nền nông nghiệp thông minh. `}</div>
                </div>
                <div className="sosmed">
                    <FacebookOutlined />
                    <YoutubeOutlined />
                    <LinkedinOutlined />
                </div>
            </div>
            <div className="quick-links">
                <div className="lin-kt">Liên kết</div>
                <div className="tx">
                    <div className="trang-ch">Trang chủ</div>
                    <div className="dch-v">Dịch vụ</div>
                    <div className="dch-v">Liên hệ</div>
                    <div className="dch-v">Blog</div>
                </div>
            </div>
            <div className="quick-links">
                <div className="v-chng-ti">Về chúng tôi</div>
                <div className="tx1">
                    <div className="email-parent">
                        <div className="email">
                            <SendOutlined />
                            <div className="iotfarmwebsitecom">
                                iotfarm@website.com
                            </div>
                        </div>
                        <div className="email">
                            <HomeOutlined />
                            <div className="iotfarmwebsitecom">
                                KTX khu A - ĐHQG TPHCM
                            </div>
                        </div>
                        <div className="email">
                            <PhoneOutlined />
                            <div className="iotfarmwebsitecom">
                                095-465-7899
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}