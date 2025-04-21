import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white p-4 flex flex-col">
      <div className="text-2xl font-bold mb-6">💼 HukukBot</div>
      <div className="space-y-2">
        <button className="w-full text-left px-4 py-2 bg-gray-800 rounded hover:bg-gray-700">Yeni Sohbet</button>
        <div className="text-sm text-gray-400 mt-4">Geçmiş Sohbetler</div>
        <ul className="space-y-1 text-sm mt-1">
          <li className="hover:underline cursor-pointer">Boşanma Hakkında</li>
          <li className="hover:underline cursor-pointer">Kira Sözleşmesi</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
