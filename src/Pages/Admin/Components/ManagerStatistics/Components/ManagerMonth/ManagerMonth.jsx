import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import classNames from 'classnames/bind';
import styles from './ManagerMonth.module.scss';

const cx = classNames.bind(styles);

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const RealEstateReport = () => {
    const [monthlyPostData, setMonthlyPostData] = useState({}); // State to hold monthly post data
    const [monthlyPropertyData, setMonthlyPropertyData] = useState({}); // State to hold monthly property data
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedProvince, setSelectedProvince] = useState('all');
    const [selectedTabIndex, setSelectedTabIndex] = useState(0); // State to track the selected tab
    const [monthlyAveragePriceData, setMonthlyAveragePriceData] = useState({}); // State for average price data
    const [monthlyRevenueData, setMonthlyRevenueData] = useState({}); // State to hold monthly revenue data
    const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const provinces = ['All', 'Hà Nội', 'Hồ Chí Minh'];

    // Function to fetch post counts for all months in the selected year
    const fetchMonthlyPostData = async (year) => {
        const data = {};
        for (let month = 1; month <= 12; month++) {
            const response = await fetch(`http://localhost:8080/api/posts/count?month=${month}&year=${year}`);
            const count = await response.json();
            data[month] = count; // Store the count for each month
        }
        setMonthlyPostData(data);
    };

    const fetchMonthlyAveragePriceData = async (year, province) => {
        const data = {};
        for (let month = 1; month <= 12; month++) {
            const response = await fetch(
                `http://localhost:8080/api/statistic/average-price?province=${province}&month=${month}&year=${year}`,
            );
            const result = await response.json();
            const averagePriceInBillion = parseFloat(result.averagePrice.replace(' tỷ', '')); // Convert "6.00 tỷ" to 6.00
            data[month] = averagePriceInBillion;
        }
        setMonthlyAveragePriceData(data);
    };

    // Function to fetch property counts for all months in the selected year and province
    const fetchMonthlyPropertyData = async (year, province) => {
        const data = {};
        for (let month = 1; month <= 12; month++) {
            const response = await fetch(
                `http://localhost:8080/api/properties/filter?province=${province}&month=${month}&year=${year}`,
            );
            const count = await response.json();
            data[month] = count; // Store the count for each month
        }
        setMonthlyPropertyData(data);
    };

    const fetchMonthlyRevenueData = async (year) => {
        const data = {};
        for (let month = 1; month <= 12; month++) {
            const response = await fetch(`http://localhost:8080/api/statistic/revenue?month=${month}&year=${year}`);
            const revenueData = await response.json();
            data[month] = revenueData.totalRevenue; // Store the revenue for each month
        }
        setMonthlyRevenueData(data);
    };

    // Effect to fetch data when the selected year or province changes
    useEffect(() => {
        fetchMonthlyPostData(selectedYear);
        fetchMonthlyPropertyData(selectedYear, selectedProvince === 'All' ? '' : selectedProvince);
        fetchMonthlyRevenueData(selectedYear); // Fetch revenue data
    }, [selectedYear, selectedProvince, selectedTabIndex]);

    // tab 0
    let maxValue = 0;
    const getMonthlyPostChartData = () => {
        const monthlyValues = Array(12).fill(0); // Initialize array for 12 months

        // Fill the monthly values based on the fetched data
        for (let month = 1; month <= 12; month++) {
            monthlyValues[month - 1] = monthlyPostData[month] || 0; // Use 0 if data is not available
        }
        maxValue = Math.max(...monthlyValues);
        return {
            labels: allMonths,
            datasets: [
                {
                    data: monthlyValues,
                    fill: false,
                    borderColor: 'rgb(54, 162, 235)',
                    tension: 0.1,
                },
            ],
        };
    };

    // tab1

    const getMonthlyPropertyChartData = () => {
        const monthlyValues = Array(12).fill(0); // Initialize array for 12 months

        // Fill the monthly values based on the fetched data
        for (let month = 1; month <= 12; month++) {
            monthlyValues[month - 1] = monthlyPropertyData[month] || 0; // Use 0 if data is not available
        }
        maxValue = Math.max(...monthlyValues);

        return {
            labels: allMonths,
            datasets: [
                {
                    data: monthlyValues,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                },
            ],
        };
    };

    // tab2
    useEffect(() => {
        if (selectedTabIndex === 2) {
            // Only fetch average price data when on the Average Price tab
            fetchMonthlyAveragePriceData(selectedYear, selectedProvince === 'All' ? '' : selectedProvince);
        }
    }, [selectedYear, selectedProvince, selectedTabIndex]);

    const getMonthlyAveragePriceChartData = () => {
        const monthlyValues = Array(12).fill(0);

        for (let month = 1; month <= 12; month++) {
            monthlyValues[month - 1] = monthlyAveragePriceData[month] || 0; // Use 0 if data is not available
        }

        return {
            labels: allMonths,
            datasets: [
                {
                    data: monthlyValues,
                    fill: false,
                    borderColor: 'rgb(153, 102, 255)',
                    tension: 0.1,
                    label: 'Average Price (Billion VND)', // Label to indicate unit
                },
            ],
        };
    };
    // tab3
    const getMonthlyRevenueChartData = () => {
        const monthlyValues = Array(12).fill(0); // Initialize array for 12 months

        // Fill the monthly values based on the fetched data
        for (let month = 1; month <= 12; month++) {
            monthlyValues[month - 1] = monthlyRevenueData[month] || 0; // Use 0 if data is not available
        }

        return {
            labels: allMonths,
            datasets: [
                {
                    data: monthlyValues,
                    fill: false,
                    borderColor: 'rgb(255, 206, 86)', // Choose a different color for the revenue line
                    tension: 0.1,
                },
            ],
        };
    };

    // options
    const optionsForAvaragePrice = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Real Estate Statistics for ${selectedYear}`,
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value) {
                        return value + ' tỷ'; // Append " tỷ" to the y-axis labels
                    },
                },
            },
        },
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Real Estate Statistics for ${selectedYear}`,
            },
        },
        scales: {
            y: {
                min: 0, // Set minimum value to 0
                ticks: {
                    stepSize: 1, // Define the interval for the ticks
                    callback: function (value) {
                        return Number.isInteger(value) ? value : ''; // Show only integer values
                    },
                },
            },
        },
    };

    const optionsForRevenue = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Real Estate Statistics for ${selectedYear}`,
            },
        },
        scales: {
            y: {
                min: 0, // Set minimum value to 0
                ticks: {
                    stepSize: 10000, // Set step size to 10,000 VND
                    callback: function (value) {
                        return Number.isInteger(value) ? value.toLocaleString() : ''; // Show only integer values and format them with commas
                    },
                },
            },
        },
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('year-selector')}>
                <label>Select Year: </label>
                <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
                    <option value={2023}>2023</option>
                    <option value={2024}>2024</option>
                    {/* Add more years as needed */}
                </select>
            </div>

            <Tabs selectedIndex={selectedTabIndex} onSelect={(index) => setSelectedTabIndex(index)}>
                <TabList>
                    <Tab>Total Posts</Tab>
                    <Tab>Total Properties</Tab>
                    <Tab>Average Price</Tab>
                    <Tab>Total Revenue</Tab>
                </TabList>

                <TabPanel>
                    <h4>Total Posts Report</h4>
                    <Line data={getMonthlyPostChartData()} options={options} />
                </TabPanel>
                <TabPanel>
                    <h4>Total Properties Report</h4>
                    {selectedTabIndex === 1 && ( // Only show province selector when on the Total Properties tab
                        <div className={cx('province-selector')}>
                            <label>Select Province: </label>
                            <select value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}>
                                {provinces.map((province) => (
                                    <option key={province} value={province}>
                                        {province}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <Line data={getMonthlyPropertyChartData()} options={options} />
                </TabPanel>
                <TabPanel>
                    <h4>Average Price Report</h4>
                    {selectedTabIndex === 2 && (
                        <div className={cx('province-selector')}>
                            <label>Select Province: </label>
                            <select value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}>
                                {provinces.map((province) => (
                                    <option key={province} value={province}>
                                        {province}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <Line data={getMonthlyAveragePriceChartData()} options={optionsForAvaragePrice} />
                </TabPanel>
                <TabPanel>
                    <h4>Total Revenue Report</h4>
                    <Line data={getMonthlyRevenueChartData()} options={optionsForRevenue} />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default RealEstateReport;
