interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-3 text-sm text-gray-200">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        aria-label="Previous page"
        className="w-10 h-10 flex items-center justify-center rounded-full border border-white/15 bg-black/60 text-white shadow-lg shadow-black/30 backdrop-blur-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black/70 hover:border-amber-400"
      >
        <span className="text-lg">‹</span>
      </button>
      <span className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5">
        Page {page}
      </span>
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        aria-label="Next page"
        className="w-10 h-10 flex items-center justify-center rounded-full border border-white/15 bg-black/60 text-white shadow-lg shadow-black/30 backdrop-blur-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black/70 hover:border-amber-400"
      >
        <span className="text-lg">›</span>
      </button>
    </div>
  );
};

export default Pagination;
