export default function Header() {
  return (
    <header className="bg-[#121214] border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/rotman-r-logo.png"
            alt="Rotman"
            className="h-9 w-9 rounded-lg object-cover"
          />
          <div className="flex flex-col justify-center">
            <span className="text-white font-bold text-base leading-tight tracking-tight">Rotman</span>
            <span className="text-white/45 text-[9px] tracking-widest uppercase leading-none">School of Management</span>
          </div>
        </div>
        <div className="text-white/40 text-xs tracking-wide hidden md:block">
          University of Toronto
        </div>
      </div>
    </header>
  );
}
