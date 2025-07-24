export default function Loading() {
  return (
    <div className="px-40 flex flex-1 justify-center py-5 animate-pulse">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1 space-y-6">
        {/* Header */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="h-10 w-64 bg-gray-200 rounded" />
        </div>

        {/* Filters */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <div className="h-14 w-full bg-gray-200 rounded-lg" />
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <div className="h-14 w-full bg-gray-200 rounded-lg" />
        </div>

        {/* Table Skeleton */}
        <div className="flex overflow-hidden rounded-xl border border-[#d4dce2] bg-gray-50">
          <table className="flex-1 w-full">
            <thead>
              <tr className="bg-gray-50">
                {[...Array(5)].map((_, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left text-[#101518] text-sm font-medium leading-normal"
                  >
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, i) => (
                <tr key={i} className="border-t border-[#d4dce2]">
                  {/* Content */}
                  <td className="px-4 py-2">
                    <div className="h-10 w-full bg-gray-200 rounded" />
                  </td>
                  {/* Sender */}
                  <td className="px-4 py-2">
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                  </td>
                  {/* Receiver */}
                  <td className="px-4 py-2">
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                  </td>
                  {/* Date */}
                  <td className="px-4 py-2">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-2 flex gap-2">
                    <div className="w-24 h-10 bg-gray-200 rounded" />
                    <div className="w-24 h-10 bg-gray-200 rounded" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
