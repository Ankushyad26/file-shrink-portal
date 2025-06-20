
import React, { useState, useRef } from 'react';
import { Upload, Download, FileText, BarChart3, Info, Zap, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import FileUpload from '@/components/FileUpload';
import CompressionResults from '@/components/CompressionResults';
import AlgorithmInfo from '@/components/AlgorithmInfo';
import StatsDashboard from '@/components/StatsDashboard';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<'huffman' | 'rle'>('huffman');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [results, setResults] = useState<any>(null);
  const [mode, setMode] = useState<'compress' | 'decompress'>('compress');

  const algorithms = [
    {
      id: 'huffman',
      name: 'Huffman Coding',
      description: 'Variable-length prefix coding for optimal compression',
      icon: <Zap className="w-5 h-5" />,
      efficiency: 'High',
      bestFor: 'Text files, source code'
    },
    {
      id: 'rle',
      name: 'Run-Length Encoding',
      description: 'Compresses consecutive identical characters',
      icon: <Settings className="w-5 h-5" />,
      efficiency: 'Medium',
      bestFor: 'Images with repeated patterns'
    }
  ];

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setResults(null);
  };

  const handleProcess = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setProcessingProgress(0);

    // Simulate processing with progress updates
    const progressInterval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock results for demonstration
      const mockResults = {
        originalSize: selectedFile.size,
        compressedSize: Math.floor(selectedFile.size * 0.7),
        compressionRatio: 30,
        processingTime: 1.2,
        algorithm: selectedAlgorithm,
        filename: selectedFile.name
      };

      setResults(mockResults);
      setProcessingProgress(100);
    } catch (error) {
      console.error('Processing error:', error);
    } finally {
      clearInterval(progressInterval);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Data Compression Portal
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            Explore the power of data compression algorithms. Upload files, analyze compression efficiency, 
            and download optimized results with real-time statistics.
          </p>
        </div>

        <Tabs defaultValue="compress" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="compress" className="text-white data-[state=active]:bg-blue-600">
              <Upload className="w-4 h-4 mr-2" />
              Compress
            </TabsTrigger>
            <TabsTrigger value="statistics" className="text-white data-[state=active]:bg-blue-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Statistics
            </TabsTrigger>
            <TabsTrigger value="learn" className="text-white data-[state=active]:bg-blue-600">
              <Info className="w-4 h-4 mr-2" />
              Learn
            </TabsTrigger>
          </TabsList>

          <TabsContent value="compress" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* File Upload Section */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-400" />
                    File Upload
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Select a file to compress or decompress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUpload onFileSelect={handleFileSelect} selectedFile={selectedFile} />
                </CardContent>
              </Card>

              {/* Algorithm Selection */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-400" />
                    Algorithm Selection
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Choose your compression algorithm
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {algorithms.map((algo) => (
                    <div
                      key={algo.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedAlgorithm === algo.id
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-slate-600 hover:border-slate-500'
                      }`}
                      onClick={() => setSelectedAlgorithm(algo.id as 'huffman' | 'rle')}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-blue-400">{algo.icon}</div>
                        <h3 className="text-white font-semibold">{algo.name}</h3>
                        <Badge variant="secondary" className="ml-auto">
                          {algo.efficiency}
                        </Badge>
                      </div>
                      <p className="text-slate-300 text-sm mb-2">{algo.description}</p>
                      <p className="text-slate-400 text-xs">Best for: {algo.bestFor}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Processing Section */}
            {selectedFile && (
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Process File</CardTitle>
                  <CardDescription className="text-slate-300">
                    Ready to {mode} {selectedFile.name} using {algorithms.find(a => a.id === selectedAlgorithm)?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <Button
                      onClick={() => setMode('compress')}
                      variant={mode === 'compress' ? 'default' : 'outline'}
                      className="flex-1"
                    >
                      Compress
                    </Button>
                    <Button
                      onClick={() => setMode('decompress')}
                      variant={mode === 'decompress' ? 'default' : 'outline'}
                      className="flex-1"
                    >
                      Decompress
                    </Button>
                  </div>
                  
                  {isProcessing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">Processing...</span>
                        <span className="text-blue-400">{processingProgress}%</span>
                      </div>
                      <Progress value={processingProgress} className="h-2" />
                    </div>
                  )}
                  
                  <Button
                    onClick={handleProcess}
                    disabled={!selectedFile || isProcessing}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    {isProcessing ? 'Processing...' : `${mode === 'compress' ? 'Compress' : 'Decompress'} File`}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Results Section */}
            {results && (
              <CompressionResults results={results} />
            )}
          </TabsContent>

          <TabsContent value="statistics">
            <StatsDashboard />
          </TabsContent>

          <TabsContent value="learn">
            <AlgorithmInfo />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
