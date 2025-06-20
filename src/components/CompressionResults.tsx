
import React from 'react';
import { Download, Clock, FileText, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface CompressionResultsProps {
  results: {
    originalSize: number;
    compressedSize: number;
    compressionRatio: number;
    processingTime: number;
    algorithm: string;
    filename: string;
  };
}

const CompressionResults: React.FC<CompressionResultsProps> = ({ results }) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const savedBytes = results.originalSize - results.compressedSize;

  return (
    <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-green-400" />
          Compression Results
        </CardTitle>
        <CardDescription className="text-slate-300">
          Successfully processed {results.filename} using {results.algorithm}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 p-4 rounded-lg text-center">
            <FileText className="w-6 h-6 mx-auto text-blue-400 mb-2" />
            <p className="text-slate-400 text-xs uppercase tracking-wide">Original Size</p>
            <p className="text-white font-semibold">{formatFileSize(results.originalSize)}</p>
          </div>
          
          <div className="bg-slate-800/50 p-4 rounded-lg text-center">
            <FileText className="w-6 h-6 mx-auto text-green-400 mb-2" />
            <p className="text-slate-400 text-xs uppercase tracking-wide">Compressed Size</p>
            <p className="text-white font-semibold">{formatFileSize(results.compressedSize)}</p>
          </div>
          
          <div className="bg-slate-800/50 p-4 rounded-lg text-center">
            <TrendingDown className="w-6 h-6 mx-auto text-green-400 mb-2" />
            <p className="text-slate-400 text-xs uppercase tracking-wide">Compression Ratio</p>
            <p className="text-green-400 font-semibold">{results.compressionRatio}%</p>
          </div>
          
          <div className="bg-slate-800/50 p-4 rounded-lg text-center">
            <Clock className="w-6 h-6 mx-auto text-cyan-400 mb-2" />
            <p className="text-slate-400 text-xs uppercase tracking-wide">Processing Time</p>
            <p className="text-white font-semibold">{results.processingTime}s</p>
          </div>
        </div>

        {/* Compression Visualization */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Space Saved</span>
            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
              {formatFileSize(savedBytes)} saved
            </Badge>
          </div>
          <Progress value={results.compressionRatio} className="h-3" />
          <div className="flex justify-between text-sm text-slate-400">
            <span>0%</span>
            <span>{results.compressionRatio}% reduction</span>
            <span>100%</span>
          </div>
        </div>

        {/* Download Section */}
        <div className="flex gap-3">
          <Button 
            className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Compressed File
          </Button>
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            View Details
          </Button>
        </div>

        {/* Algorithm Info */}
        <div className="bg-slate-800/30 p-4 rounded-lg">
          <h4 className="text-white font-medium mb-2">Algorithm Performance</h4>
          <p className="text-slate-300 text-sm">
            {results.algorithm === 'huffman' 
              ? 'Huffman coding achieved optimal compression by using variable-length codes based on character frequency.'
              : 'Run-Length Encoding compressed consecutive identical characters into count-value pairs.'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompressionResults;
