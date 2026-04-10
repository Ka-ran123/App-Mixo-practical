interface ReviewHeaderProps {
  totalReviews: number;
  pendingReviews: number;
  approvedReviews: number;
}

const ReviewHeader = ({
  totalReviews,
  pendingReviews,
  approvedReviews,
}: ReviewHeaderProps) => {
  return (
    <div className="mb-6 rounded-4xl bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 p-10 text-white shadow-2xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
            Review moderation
          </p>
          <h1 className="mt-3 text-4xl font-semibold">Review dashboard</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-200">
            Manage pending review approvals, edit review content, and reject
            reviews with a reason.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 md:w-auto">
          <div className="rounded-3xl bg-white/10 p-4 text-center backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
              Total reviews
            </p>
            <p className="mt-2 text-3xl font-semibold">{totalReviews}</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-4 text-center backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
              Pending
            </p>
            <p className="mt-2 text-3xl font-semibold">{pendingReviews}</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-4 text-center backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
              Approved
            </p>
            <p className="mt-2 text-3xl font-semibold">{approvedReviews}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewHeader;
