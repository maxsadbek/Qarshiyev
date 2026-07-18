'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', applications: 40 },
  { name: 'Feb', applications: 30 },
  { name: 'Mar', applications: 20 },
  { name: 'Apr', applications: 27 },
  { name: 'May', applications: 18 },
  { name: 'Jun', applications: 23 },
  { name: 'Jul', applications: 34 },
];

export function OverviewCharts() {
  return (
    <div className="w-full h-80 text-black">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="applications" stroke="#8884d8" strokeWidth={3} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

