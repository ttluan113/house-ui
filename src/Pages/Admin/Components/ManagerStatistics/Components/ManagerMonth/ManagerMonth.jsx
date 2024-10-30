import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

import classNames from 'classnames/bind';
import styles from './ManagerMonth.module.scss';

const cx = classNames.bind(styles);

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const RealEstateReport = () => {
    // Dữ liệu giả
    const properties = [
        { id: 1, createdAt: '2024-10-01', price: 500000000, soldPrice: 520000000, status: 'sold' },
        { id: 2, createdAt: '2024-10-05', price: 750000000, soldPrice: null, status: 'available' },
        { id: 3, createdAt: '2024-10-10', price: 900000000, soldPrice: 880000000, status: 'sold' },
        { id: 4, createdAt: '2024-10-15', price: 650000000, soldPrice: 670000000, status: 'sold' },
        { id: 5, createdAt: '2024-10-20', price: 800000000, soldPrice: null, status: 'available' },
        { id: 6, createdAt: '2024-10-25', price: 550000000, soldPrice: 560000000, status: 'sold' },
        { id: 7, createdAt: '2024-10-28', price: 1000000000, soldPrice: null, status: 'available' },
    ];

    // Tính toán thống kê
    const totalProperties = properties.length;
    const soldProperties = properties.filter((property) => property.status === 'sold').length;
    const averagePrice = properties.reduce((sum, property) => sum + property.price, 0) / properties.length;
    const totalRevenue = properties
        .filter((property) => property.soldPrice)
        .reduce((sum, property) => sum + property.soldPrice, 0);

    // Dữ liệu cho biểu đồ
    const chartData = {
        labels: properties.map((property) => property.createdAt),
        datasets: [
            {
                label: 'Giá Bán',
                data: properties.map((property) => property.soldPrice || 0),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
            {
                label: 'Giá Niêm Yết',
                data: properties.map((property) => property.price),
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
            },
        ],
    };

    // Tùy chọn biểu đồ
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Thống Kê Bất Động Sản Trong Tháng',
            },
        },
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <h4>Báo Cáo Bất Động Sản</h4>
                <p>Tổng số tin: {totalProperties}</p>
                <p>Tổng số bất động sản đã bán: {soldProperties}</p>
                <p>Giá trung bình: {averagePrice.toLocaleString()} VND</p>
                <p>Tổng số tiền thu được: {totalRevenue.toLocaleString()} VND</p>
            </div>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default RealEstateReport;
