import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', attacks: 4 },
  { name: 'Tue', attacks: 3 },
  { name: 'Wed', attacks: 7 },
  { name: 'Thu', attacks: 5 },
  { name: 'Fri', attacks: 8 },
  { name: 'Sat', attacks: 12 },
  { name: 'Sun', attacks: 9 },
];

export const AttackMetrics = () => {
  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle>Weekly Attack Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="attackGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#F1F0FB'
                }}
              />
              <Area
                type="monotone"
                dataKey="attacks"
                stroke="#8B5CF6"
                fillOpacity={1}
                fill="url(#attackGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};