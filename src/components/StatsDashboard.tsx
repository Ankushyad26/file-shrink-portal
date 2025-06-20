
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, FileText, Clock, Zap } from 'lucide-react';

const StatsDashboard = () => {
  // Mock data for demonstration
  const compressionData = [
    { algorithm: 'Huffman', ratio: 65, time: 1.2, files: 45 },
    { algorithm: 'RLE', ratio: 45, time: 0.8, files: 32 },
    { algorithm: 'LZ77', ratio: 72, time: 2.1, files: 28 },
    { algorithm: 'DEFLATE', ratio: 68, time: 1.8, files: 41 }
  ];

  const fileTypeData = [
    { name: 'Text Files', value: 35, color: '#3B82F6' },
    { name: 'Images', value: 28, color: '#10B981' },
    { name: 'Documents', value: 22, color: '#F59E0B' },
    { name: 'Others', value: 15, color: '#8B5CF6' }
  ];

  const performanceData = [
    { day: 'Mon', files: 12, avgRatio: 62 },
    { day: 'Tue', files: 19, avgRatio: 58 },
    { day: 'Wed', files: 15, avgRatio: 65 },
    { day: 'Thu', files: 25, avgRatio: 61 },
    { day: 'Fri', files: 22, avgRatio: 67 },
    { day: 'Sat', files: 18, avgRatio: 63 },
    { day: 'Sun', files: 14, avgRatio: 59 }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Files Processed</p>
                <p className="text-white text-2xl font-bold">1,247</p>
              </div>
              <FileText className="w-8 h-8 text-blue-400" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-green-400 text-sm">+12% from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Avg Compression</p>
                <p className="text-white text-2xl font-bold">63%</p>
              </div>
              <Zap className="w-8 h-8 text-green-400" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-green-400 text-sm">+5% efficiency</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Data Saved</p>
                <p className="text-white text-2xl font-bold">2.4 GB</p>
              </div>
              <TrendingUp className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="flex items-center mt-2">
              <span className="text-slate-400 text-sm">Total space reduced</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Avg Processing</p>
                <p className="text-white text-2xl font-bold">1.6s</p>
              </div>
              <Clock className="w-8 h-8 text-orange-400" />
            </div>
            <div className="flex items-center mt-2">
              <span className="text-slate-400 text-sm">Per file average</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Algorithm Performance */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Algorithm Performance</CardTitle>
            <CardDescription className="text-slate-300">
              Compression ratio comparison across different algorithms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={compressionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="algorithm" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="ratio" fill="#3B82F6" name="Compression Ratio %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* File Type Distribution */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">File Type Distribution</CardTitle>
            <CardDescription className="text-slate-300">
              Types of files processed this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fileTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {fileTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Performance Trend */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Weekly Performance Trend</CardTitle>
          <CardDescription className="text-slate-300">
            Daily file processing and average compression ratios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#94A3B8" />
              <YAxis yAxisId="left" stroke="#94A3B8" />
              <YAxis yAxisId="right" orientation="right" stroke="#94A3B8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1E293B', 
                  border: '1px solid #334155',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="files" fill="#10B981" name="Files Processed" />
              <Line yAxisId="right" type="monotone" dataKey="avgRatio" stroke="#F59E0B" strokeWidth={3} name="Avg Compression %" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsDashboard;
