import Link from 'next/link'

export default function SettingsModal() {
  return (
    <div
      className="relative z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop: clicking it navigates "back" to the home page */}
      <Link
        href="/"
        className="fixed inset-0 bg-black/50 transition-opacity"
        aria-label="Close modal background"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto pointer-events-none">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl p-6 pointer-events-auto max-w-sm w-full">
            <h2 id="modal-title" className="text-xl font-bold">
              Settings (Modal View)
            </h2>
            <p className="mt-2 text-gray-600 mb-6">
              This was intercepted via client-side routing.
            </p>

            <div className="flex justify-end">
              <Link
                href="/"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Close
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
