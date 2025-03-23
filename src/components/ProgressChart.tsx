
import { useEffect, useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface DataPoint {
  date: string;
  value: number;
}

interface ProgressChartProps {
  title: string;
  data: DataPoint[];
  timeRange?: string;
  unit?: string;
  color?: string;
}

export function ProgressChart({ 
  title, 
  data, 
  timeRange = 'week',
  unit = '',
  color = 'hsl(var(--primary))'
}: ProgressChartProps) {
  const [selectedRange, setSelectedRange] = useState(timeRange);
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  
  useEffect(() => {
    // In a real app, this would filter data based on selected range
    setChartData(data);
  }, [data, selectedRange]);
  
  const getMinMax = () => {
    if (chartData.length === 0) return { min: 0, max: 100 };
    
    const values = chartData.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min) * 0.1;
    
    return {
      min: Math.max(0, min - padding),
      max: max + padding
    };
  };
  
  const { min, max } = getMinMax();
  
  const calculateChange = () => {
    if (chartData.length < 2) return 0;
    const first = chartData[0].value;
    const last = chartData[chartData.length - 1].value;
    return last - first;
  };
  
  const change = calculateChange();
  const changePercent = chartData[0]?.value 
    ? ((change / chartData[0].value) * 100).toFixed(1) 
    : '0.0';
  
  return (
    <Card className="overflow-hidden shadow-subtle">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Select defaultValue={selectedRange} onValueChange={setSelectedRange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground">{chartData.length > 0 ? 
              `Latest: ${chartData[chartData.length - 1].value}${unit}` : `No data`
            }</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-2xl font-semibold">
                {change > 0 ? '+' : ''}{change}{unit}
              </p>
              <p className={`text-sm ${change > 0 ? 'text-green-500' : change < 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
                {change > 0 ? '+' : ''}{changePercent}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }} 
                tickLine={false} 
                axisLine={false}
              />
              <YAxis 
                domain={[min, max]} 
                tick={{ fontSize: 12 }} 
                tickLine={false} 
                axisLine={false}
                width={30}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  backdropFilter: 'blur(4px)',
                  borderRadius: '8px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                }} 
                itemStyle={{ padding: '2px 0' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorGradient)" 
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
