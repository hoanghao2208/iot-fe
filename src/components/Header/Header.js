import "./style.scss";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="header">
            <div className="bg">
                <Link className="header-logo" to="/">
                    <span className="iot">IOT</span>
                    <span className="farm">farm</span>
                </Link>

                <div className="items">
                    <Link className="" to="/manage-irrigation">
                        Quản lý tưới tiêu
                    </Link>

                    <Link className="" to="/statistical/*">
                        Thống kê
                    </Link>
                </div>
            </div>
        </div>
    );
}
