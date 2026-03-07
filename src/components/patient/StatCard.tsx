import React from 'react';
import { cn } from './InputField';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, className }) => {
    return (
        <div className={cn("bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow duration-300", className)}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-500 font-medium text-sm">{title}</h3>
                {Icon && (
                    <div className="p-2.5 bg-blue-50 text-hospital-blue rounded-xl">
                        <Icon className="h-5 w-5" />
                    </div>
                )}
            </div>
            <div className="flex items-end gap-3">
                <span className="text-3xl font-bold text-slate-800">{value}</span>
                {trend && (
                    <span className={cn(
                        "text-sm font-medium mb-1",
                        trend === 'up' ? 'text-emerald-500' : 'text-red-500'
                    )}>
                        {trend === 'up' ? '+' : '-'}{trendValue}%
                    </span>
                )}
            </div>
        </div>
    );
};

export default StatCard;
