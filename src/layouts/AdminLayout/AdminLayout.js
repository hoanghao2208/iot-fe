import React from "react";
import Footer from "../../components/Footer";
import AdminHeader from "../../components/AdminHeader/AdminHeader";

export default function AdminLayout({ children }) {
    return (
        <div>
            <AdminHeader /> {children}
            <Footer />
        </div>
    );
}
