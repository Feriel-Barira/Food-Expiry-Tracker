const Introduction = () => {
  return (
    <section className="mb-10 p-6 bg-white rounded-xl shadow-md">
      <img
        src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg"
        alt="Cuisine moderne bien organisée avec des légumes, fruits et produits d'épicerie rangés dans des bocaux étiquetés"
        className="w-full rounded-lg mb-6 object-cover h-64"
      />
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Stop Wasting Food
      </h2>
      <p className="text-gray-600 mb-4">
        Millions of tons of food are wasted every year because we forget about
        expiration dates. With Food Expiry Tracker, you can easily monitor your
        groceries and get notified before they go bad.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <h3 className="font-medium text-gray-800">Fresh</h3>
          <p className="text-sm text-gray-600">Plenty of time left</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <h3 className="font-medium text-gray-800">Expiring Soon</h3>
          <p className="text-sm text-gray-600">Use within 3 days</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
          <h3 className="font-medium text-gray-800">Expired</h3>
          <p className="text-sm text-gray-600">Time to dispose</p>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
