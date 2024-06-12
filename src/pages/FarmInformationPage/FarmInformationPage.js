import React from "react";
import "./style.scss";
import {
    UserAddOutlined,
    HomeOutlined,
    DownCircleOutlined,
    CaretRightOutlined,
} from "@ant-design/icons";
export default function FarmInformationPage() {
    return (
        <div className="container-FarmInformationPage">
            <div className="background-image"></div>
            <div className="wrapper-content">
                <div className="information-common">
                    <div className="left-section ">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Ripple_Hill_Farm_28.jpg/640px-Ripple_Hill_Farm_28.jpg"
                            alt="avatar"
                        />
                    </div>
                    <div className="right-section ">
                        <div>
                            <div>
                                <h1> YOLO FARM</h1>
                                <HomeOutlined />
                                <span>2 Locations</span>
                                <UserAddOutlined />
                                <span>1234 Followers</span>
                            </div>
                        </div>
                    </div>
                </div>

                <br />
                <br />
                <br />
                <br />

                <div className="information-detail">
                    <div className="left-section-detail">
                        <div className="left-section-detail-title">
                            THÔNG TIN CHUNG
                        </div>
                        <div className="left-section-detail-content"></div>
                    </div>

                    <div className="right-section-detail">
                        <div className="right-section-detail-title">
                            THÔNG TIN LIÊN HỆ
                        </div>
                        <div className="right-section-detail-content">
                            <div className="items-detail">
                                <DownCircleOutlined />
                                <p>Vị trí trang trại</p>
                            </div>

                            <div className="items-detail">
                                <CaretRightOutlined />
                                <p>Cơ sở 1: Lý Trường Kiệt, Q10, Tp.HCM</p>
                            </div>
                            <div className="items-detail">
                                <CaretRightOutlined />
                                <p>Cơ sở 2: Dĩ An, Bình Dương</p>
                            </div>
                            <div className="items-detail">
                                <DownCircleOutlined />
                                <p>Liên hệ:</p>
                            </div>

                            <div className="items-detail">
                                <CaretRightOutlined />
                                <p>Email: yolofarm@hcmut.edu.vn</p>
                            </div>
                            <div className="items-detail">
                                <CaretRightOutlined />
                                <p>Phone: 0288 345 345</p>
                            </div>
                            <div className="items-detail">
                                <DownCircleOutlined />
                                <p>Xem vị trí trang trại</p>
                            </div>
                            <div className="google-map">
                                <div className="mapouter">
                                    <div className="gmap_canvas">
                                        <iframe
                                            className="gmap_iframe"
                                            frameBorder="0"
                                            scrolling="no"
                                            marginHeight="0"
                                            marginWidth="0"
                                            title="GoogleMap"
                                            src="https://maps.google.com/maps?width=100%&height=100%&hl=en&q=Ho Chi Minh City University of Technology (HCMUT)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                                        />
                                    </div>
                                    <style
                                        dangerouslySetInnerHTML={{
                                            __html: ".mapouter{position:relative;text-align:left;width:406px;height:337px;}.gmap_canvas {overflow:hidden;background:none!important;width:406px;height:337px;}.gmap_iframe {width:360px!important;height:300px!important;}",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
