interface GCVLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

export const GCVLogo = ({ size = 'md', variant = 'dark' }: GCVLogoProps) => {
  const sizes = {
    sm: { mark: 28, textClass: 'text-sm' },
    md: { mark: 36, textClass: 'text-base' },
    lg: { mark: 48, textClass: 'text-xl' },
  };
  const s = sizes[size];
  const textColor = variant === 'light' ? 'text-white' : 'text-foreground';
  const subColor = variant === 'light' ? 'text-white/60' : 'text-muted-foreground';

  return (
    <div className="flex items-center gap-3">
      <svg width={s.mark} height={s.mark} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect
          width="48"
          height="48"
          rx="8"
          fill={variant === 'light' ? 'rgba(255,255,255,0.15)' : 'oklch(0.25 0.12 250)'}
        />
        <polygon
          points="8,10 24,38 40,10 33,10 24,28 15,10"
          fill={variant === 'light' ? 'white' : 'white'}
          opacity="1"
        />
        <polygon
          points="16,10 24,25 32,10 26,10 24,17 22,10"
          fill={variant === 'light' ? 'oklch(0.75 0.15 68)' : 'oklch(0.75 0.15 68)'}
        />
      </svg>
      <div>
        <div className={`font-semibold leading-tight tracking-tight ${s.textClass} ${textColor}`}>
          Grupo Corporativo Vértice
        </div>
        <div className={`text-xs leading-tight ${subColor}`}>Portal de Novedades</div>
      </div>
    </div>
  );
};
