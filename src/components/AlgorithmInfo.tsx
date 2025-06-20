
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, Settings, Code, TrendingUp, Clock, FileText } from 'lucide-react';

const AlgorithmInfo = () => {
  const algorithms = [
    {
      id: 'huffman',
      name: 'Huffman Coding',
      icon: <Zap className="w-6 h-6" />,
      complexity: 'O(n log n)',
      efficiency: 'High',
      bestFor: ['Text files', 'Source code', 'JSON/XML'],
      description: 'A lossless data compression algorithm that uses variable-length codes for different characters based on their frequency of occurrence.',
      howItWorks: [
        'Count frequency of each character in the input',
        'Build a binary tree with characters as leaves',
        'Assign shorter codes to more frequent characters',
        'Replace each character with its corresponding code'
      ],
      pros: [
        'Optimal prefix-free codes',
        'Good compression for text',
        'No information loss',
        'Fast decompression'
      ],
      cons: [
        'Requires two passes over data',
        'Less effective on binary data',
        'Need to store the tree/table'
      ],
      example: {
        input: 'AABBBCCCCDDDD',
        frequencies: { A: 2, B: 3, C: 4, D: 4 },
        codes: { A: '10', B: '11', C: '0', D: '01' },
        output: '10 10 11 11 11 0 0 0 0 01 01 01 01'
      }
    },
    {
      id: 'rle',
      name: 'Run-Length Encoding',
      icon: <Settings className="w-6 h-6" />,
      complexity: 'O(n)',
      efficiency: 'Medium',
      bestFor: ['Images with patterns', 'Simple graphics', 'Repeated data'],
      description: 'A simple form of data compression that stores runs of data as a single data value and count.',
      howItWorks: [
        'Scan input data sequentially',
        'Count consecutive identical characters',
        'Replace runs with count-value pairs',
        'Store short runs as-is to avoid expansion'
      ],
      pros: [
        'Very simple to implement',
        'Fast compression/decompression',
        'Good for repetitive data',
        'Low memory usage'
      ],
      cons: [
        'Can increase file size',
        'Poor on random data',
        'Limited compression ratio',
        'Not suitable for text'
      ],
      example: {
        input: 'AAABBBCCCCCDDDD',
        process: 'A×3, B×3, C×5, D×4',
        output: '3A3B5C4D',
        saved: '15 chars → 8 chars'
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Understanding Compression Algorithms</h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Learn how different compression algorithms work, their strengths, and when to use them.
        </p>
      </div>

      <Tabs defaultValue="huffman" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border border-slate-700">
          {algorithms.map((algo) => (
            <TabsTrigger
              key={algo.id}
              value={algo.id}
              className="text-white data-[state=active]:bg-blue-600 flex items-center gap-2"
            >
              <div className="text-blue-400">{algo.icon}</div>
              {algo.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {algorithms.map((algo) => (
          <TabsContent key={algo.id} value={algo.id}>
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Overview */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <div className="text-blue-400">{algo.icon}</div>
                    {algo.name}
                    <Badge variant="secondary" className="ml-auto">
                      {algo.efficiency} Efficiency
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    {algo.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* How it Works */}
                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Code className="w-4 h-4 text-blue-400" />
                      How it Works
                    </h4>
                    <ol className="space-y-2">
                      {algo.howItWorks.map((step, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-slate-300">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Example */}
                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-green-400" />
                      Example
                    </h4>
                    <div className="bg-slate-900/50 p-4 rounded-lg space-y-3">
                      <div>
                        <span className="text-slate-400 text-sm">Input:</span>
                        <code className="block text-blue-300 font-mono mt-1">{algo.example.input}</code>
                      </div>
                      {algo.id === 'huffman' && (
                        <div>
                          <span className="text-slate-400 text-sm">Character Frequencies:</span>
                          <div className="grid grid-cols-2 gap-2 mt-1">
                            {Object.entries(algo.example.frequencies).map(([char, freq]) => (
                              <span key={char} className="text-slate-300 font-mono text-sm">
                                {char}: {freq}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div>
                        <span className="text-slate-400 text-sm">
                          {algo.id === 'huffman' ? 'Encoded:' : 'Process:'}
                        </span>
                        <code className="block text-green-300 font-mono mt-1">
                          {algo.id === 'huffman' ? algo.example.output : algo.example.process}
                        </code>
                      </div>
                      {algo.id === 'rle' && (
                        <div>
                          <span className="text-slate-400 text-sm">Result:</span>
                          <code className="block text-green-300 font-mono mt-1">{algo.example.saved}</code>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Properties */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-slate-400 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Complexity
                      </span>
                      <code className="text-blue-300">{algo.complexity}</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Efficiency
                      </span>
                      <Badge variant="secondary">{algo.efficiency}</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Best For */}
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Best For</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {algo.bestFor.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-slate-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Pros & Cons */}
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Pros & Cons</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h5 className="text-green-400 font-medium mb-2">Advantages</h5>
                      <ul className="space-y-1">
                        {algo.pros.map((pro, index) => (
                          <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                            <span className="text-green-400 mt-1">+</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-red-400 font-medium mb-2">Limitations</h5>
                      <ul className="space-y-1">
                        {algo.cons.map((con, index) => (
                          <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                            <span className="text-red-400 mt-1">−</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AlgorithmInfo;
