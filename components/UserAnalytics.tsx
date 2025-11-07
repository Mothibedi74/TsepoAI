import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ANALYTICS_DATA } from '../constants';

const UserAnalytics: React.FC = () => {
    return (
        <section>
            <h3 className="text-2xl font-bold mb-6 text-center text-white">User Analytics & Reports</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-dark-bg p-6 rounded-lg border border-dark-border">
                    <h4 className="text-lg font-semibold mb-4 text-gray-300">Monthly Sales</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={ANALYTICS_DATA.sales}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
                            <XAxis dataKey="name" stroke="#8892b0" />
                            <YAxis stroke="#8892b0" />
                            <Tooltip contentStyle={{ backgroundColor: '#161b22', border: '1px solid #30363d' }} />
                            <Legend />
                            <Line type="monotone" dataKey="sales" stroke="#007bff" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-dark-bg p-6 rounded-lg border border-dark-border">
                    <h4 className="text-lg font-semibold mb-4 text-gray-300">Product Popularity</h4>
                    <ResponsiveContainer width="100%" height={300}>
                         <BarChart data={ANALYTICS_DATA.products}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
                            <XAxis dataKey="name" stroke="#8892b0" />
                            <YAxis stroke="#8892b0" />
                            <Tooltip contentStyle={{ backgroundColor: '#161b22', border: '1px solid #30363d' }} />
                            <Legend />
                            <Bar dataKey="sold" fill="#007bff" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
};

export default UserAnalytics;
