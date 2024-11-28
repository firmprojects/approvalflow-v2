'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { FileUp, Loader2, X } from 'lucide-react';
import { analyzeContract } from '@/lib/services/contract-analysis';
import { ContractAnalysisResult } from '@/lib/types/contract';
import { AnalysisProgress } from './analysis-progress';
import { ContractSummary } from './contract-summary';

export function ContractUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<ContractAnalysisResult[]>([]);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(
      file => file.type === 'application/pdf' || 
              file.type === 'application/msword' ||
              file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );

    if (validFiles.length !== acceptedFiles.length) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload only PDF or Word documents.',
        variant: 'destructive',
      });
    }

    setFiles(prev => [...prev, ...validFiles]);
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAnalysis = async () => {
    setIsAnalyzing(true);
    setProgress(0);
    const results: ContractAnalysisResult[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const result = await analyzeContract(files[i]);
        results.push(result);
        setProgress(((i + 1) / files.length) * 100);
      }

      setAnalysisResults(results);
      toast({
        title: 'Analysis complete',
        description: `Successfully analyzed ${files.length} contract${files.length > 1 ? 's' : ''}.`,
      });

      setFiles([]);
    } catch (error) {
      toast({
        title: 'Analysis failed',
        description: 'An error occurred while analyzing the contracts.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Contracts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
              isDragActive ? 'border-primary bg-primary/5' : 'border-muted'
            }`}
          >
            <input {...getInputProps()} />
            <FileUp className="mx-auto h-12 w-12 text-muted-foreground" />
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium">
                Drag and drop contract documents here, or click to select files
              </p>
              <p className="text-xs text-muted-foreground">
                Supports PDF and Word documents up to 10MB
              </p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 border rounded-md"
                >
                  <span className="text-sm truncate flex-1">{file.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    disabled={isAnalyzing}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              {isAnalyzing ? (
                <AnalysisProgress
                  fileName={files[Math.floor((progress / 100) * files.length)]?.name}
                  progress={progress}
                />
              ) : (
                <Button
                  onClick={handleAnalysis}
                  disabled={files.length === 0}
                  className="w-full"
                >
                  Analyze {files.length} Contract{files.length > 1 ? 's' : ''}
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {analysisResults.length > 0 && (
        <div className="space-y-6">
          {analysisResults.map((result) => (
            <ContractSummary key={result.id} analysis={result} />
          ))}
        </div>
      )}
    </div>
  );
}