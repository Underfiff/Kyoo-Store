export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Admin Panel</h1>

      <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Edit Poster (Banner)
        </h2>

        {/* Judul */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Judul Banner
          </label>
          <input
            type="text"
            placeholder="🎉 Promo Followers!"
            className="w-full border border-gray-300 rounded px-4 py-2 text-gray-900 placeholder-gray-400"
          />
        </div>

        {/* Deskripsi */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi
          </label>
          <textarea
            placeholder="Dapatkan 1000 followers dalam 24 jam!"
            className="w-full border border-gray-300 rounded px-4 py-2 h-24 resize-none text-gray-900 placeholder-gray-400"
          ></textarea>
        </div>

        {/* Upload Gambar */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Gambar Banner
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              className="text-sm text-gray-500
                           file:mr-4 file:py-2 file:px-4
                           file:rounded file:border-0
                           file:text-sm file:font-semibold
                           file:bg-blue-50 file:text-blue-700
                           hover:file:bg-blue-100"
            />
          </div>
        </div>

        {/* Tombol Simpan */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}
