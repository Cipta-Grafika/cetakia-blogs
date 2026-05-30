type BlogPostScrollerProps = {
  children: React.ReactNode;
};

export function BlogPostScroller({ children }: BlogPostScrollerProps) {
  return (
    <div className="bp-post-grid-wrap">
      <div className="bp-post-grid">{children}</div>
    </div>
  );
}
