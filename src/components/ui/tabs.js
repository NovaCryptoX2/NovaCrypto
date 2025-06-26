
export function Tabs({ children }) { return <div>{children}</div>; }
export function TabsList({ children, className }) { return <div className={className}>{children}</div>; }
export function TabsTrigger({ children, value }) { return <button>{children}</button>; }
export function TabsContent({ children, value }) { return <div>{children}</div>; }
