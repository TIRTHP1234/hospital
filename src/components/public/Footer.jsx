import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-100 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <div className="flex items-center gap-2 text-slate-600 mb-4">
                    <Heart className="h-5 w-5 text-hospital-blue" />
                    <span className="font-semibold">MediAI Support Team</span>
                </div>
                <p className="text-slate-500 text-sm text-center">
                    Dedicated to providing exceptional healthcare assistance and streamlining patient communications.
                </p>
                <p className="text-slate-400 text-xs mt-4">
                    &copy; {new Date().getFullYear()} MediAI Support. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
