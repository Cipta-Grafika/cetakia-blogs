import Image from "next/image";

type ThemeLogoProps = {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

export function ThemeLogo({ lightSrc, darkSrc, alt, width, height, className, priority = false }: ThemeLogoProps) {
  return (
    <span className={`theme-logo${className ? ` ${className}` : ""}`}>
      <span className="theme-logo__slot theme-logo__slot--light">
        <Image
          src={lightSrc}
          alt={alt}
          width={width}
          height={height}
          className="theme-logo__asset"
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
        />
      </span>
      <span className="theme-logo__slot theme-logo__slot--dark" aria-hidden="true">
        <Image
          src={darkSrc}
          alt=""
          width={width}
          height={height}
          className="theme-logo__asset"
          loading={priority ? "eager" : undefined}
          fetchPriority={priority ? "low" : undefined}
        />
      </span>
    </span>
  );
}
