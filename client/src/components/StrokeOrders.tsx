/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import chart from "../assets/stroke-order-chart.jpg"; // Đã import

type arrayElement = string | React.JSX.Element;
// --- Khai báo TypeScript Interface ---
interface StrokeRule {
  id: string;
  name: string;
  category: "Kana" | "Kanji" | "Special";
  rules: arrayElement[];
  positionSizeNote?: arrayElement;
  example?: arrayElement;
}

// --- Dummy Data: Dữ liệu Quy tắc Thứ tự Nét ---
const strokeRulesData: StrokeRule[] = [
  {
    id: "kanji",
    name: "Kanji (Hán Tự)",
    category: "Kanji",
    rules: [
      "Nguyên tắc cơ bản: Trên trước, dưới sau (上から下へ) và Trái trước, phải sau (左から右へ).",
      "Nét ngang trước, nét dọc sau (khi giao nhau): Ví dụ: 十.",
      "Nét phẩy trước, nét mác sau (với các nét chéo đối xứng): Ví dụ: 人.",
      "Viết phần giữa trước với các chữ đối xứng theo chiều dọc: Ví dụ: 水.",
      "Viết phần bao quanh ngoài trước, phần bên trong sau: Ví dụ: 国.",
      "Nét đóng/nét xuyên ngang/dọc qua nhiều nét khác thường viết SAU CÙNG: Ví dụ: 中.",
    ],
    positionSizeNote:
      "Viết cân đối trong 1 ô vuông. Tuân thủ thứ tự nét giúp chữ cân đối và dễ nhớ hơn.",
    example:
      "Chữ 田 (Điền): Viết nét ngoài trước, sau đó đến 2 nét ngang bên trong, cuối cùng là nét đóng dọc.",
  },
  {
    id: "hiragana",
    name: "Hiragana (ひらがな)",
    category: "Kana",
    rules: [
      "Trên trước, dưới sau.",
      "Trái trước, phải sau.",
      "Ngang trước, dọc sau (khi giao nhau).",
      "Viết các nét liền mạch, chú ý độ cong và móc mềm mại.",
    ],
    positionSizeNote: "Kích thước chuẩn (1 ô vuông).",
    example: "Chữ あ (a): Nét ngang - nét sổ/cong - nét phẩy nhỏ cuối cùng.",
  },
  {
    id: "katakana",
    name: "Katakana (カタカナ)",
    category: "Kana",
    rules: [
      "Trên trước, dưới sau.",
      "Trái trước, phải sau.",
      "Ngang trước, dọc sau.",
      "Các nét thẳng, góc cạnh rõ ràng, dứt khoát.",
    ],
    positionSizeNote: "Kích thước chuẩn (1 ô vuông).",
    example: "Chữ エ (e): Nét ngang trên - nét ngang giữa - nét sổ đứng.",
  },
  {
    id: "small_kana",
    name: "Chữ Nhỏ (Âm Ghép/Xúc Âm)",
    category: "Special",
    rules: [
      "Thứ tự nét KHÔNG ĐỔI so với phiên bản chữ cái lớn (ví dụ: Thứ tự nét của ゃ/ゅ/ょ giống や/ゆ/よ).",
      "Luôn viết **SAU CÙNG** (sau chữ Kana cơ bản đứng trước nó).",
    ],
    positionSizeNote: (
      <p>
        <span className="font-semibold text-teal-500">Kích thước:</span> Khoảng{" "}
        <span className="font-semibold text-teal-500">1/4</span> (chỉ bằng một
        nửa so với chữ thường).
        <p>
          <span className="font-semibold text-teal-500"> Vị trí: </span> Thấp
          hơn và nằm ở dưới bên phải (với âm ghép) hoặc chính giữa (với xúc âm
          <span className="text-sm"> っ ッ</span>).
        </p>
      </p>
    ),
    example: (
      <p className="inline">
        き <span className="text-sm">ゃ</span> (kya), カ{" "}
        <span className="text-sm">ッ</span> プ (kappu)
      </p>
    ),
  },
  {
    id: "dakuten",
    name: "Dấu Đục/Bán Đục (Thứ tự nét)",
    category: "Special",
    rules: [
      <p className="inline">
        Viết Dấu Đục **(゛)** và Bán Đục **(゜)**{" "}
        <span className="font-semibold text-teal-500">SAU CÙNG</span>.
      </p>,
      "Thứ tự viết chữ Kana cơ bản (vd: か, は) phải hoàn thành trước.",
    ],
    positionSizeNote: "Vị trí: **Góc trên bên phải** của chữ Kana cơ bản.",
    example: "が (ga), ぱ (pa).",
  },
  {
    id: "choonpu",
    name: "Trường Âm Katakana (ー)",
    category: "Special",
    rules: [
      <p className="inline">
        Là ký tự riêng (Chōonpu), chỉ có{" "}
        <span className="font-semibold text-teal-400">
          một nét ngang <span className="text-xl">ー</span>
        </span>
        .
      </p>,
      <p className="inline">
        Luôn viết <span className="font-semibold text-teal-400">SAU CÙNG</span>{" "}
        sau chữ Kana Katakana đứng trước nó.
      </p>,
    ],
    positionSizeNote:
      "Kích thước: Bằng 1 ô chữ (như một chữ Kana thông thường).\nVị trí: Chính giữa ô chữ, là một nét ngang kéo dài từ trái sang phải.",
    example: "ラーメン (rāmen).",
  },
];

// ----------------------------------------------------
// --- Modal 1: Biểu Đồ Thứ Tự Nét (Charts Modal) ---
// ----------------------------------------------------
const StrokeChartModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  // Xử lý sự kiện nhấn phím (cho ESC)
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);
  if (!isOpen) return null;
  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-neutral-800/80 flex items-center justify-center z-50 p-4 transition-opacity"
      onClick={onClose} // Click bên ngoài modal
    >
      {/* Modal Content (ngăn chặn sự kiện click lan ra backdrop) */}
      <div
        className="bg-neutral-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto transform transition-all p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-teal-600 pb-3 mb-4">
          <h3 className="text-xl font-bold text-teal-400">
            Biểu Đồ Thứ Tự Nét Chi Tiết
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <p className="text-gray-300 mb-4 font-semibold">
          Đây là bảng chữ cái chính. Các âm đục, trường âm,... thường là các ký
          tự nhỏ, hoặc ký tự được lấy ra từ bảng chính này. Thường sẽ viết nhỏ
          hơn, ở vị trí cố định và viết sau cùng, thứ tự nét y như bảng chính.
        </p>

        {/* --- Nơi đặt ảnh của bạn --- */}
        <img
          src={chart}
          alt="Japanese Stroke Order Charts (Hiragana, Katakana, Kanji Examples)"
          className="w-full h-auto rounded-lg border border-teal-700"
        />
        {/* ---------------------------------- */}
      </div>
    </div>
  );
};

// ----------------------------------------------------
// --- Modal 2: Quy Tắc Đọc Âm Đục/Bán Đục (Reading Modal) ---
// ----------------------------------------------------
const ReadingRuleModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-neutral-800/80 flex items-center justify-center z-50 p-4 transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-auto transform transition-all p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-teal-600 pb-3 mb-4">
          <h3 className="text-xl font-bold text-teal-400">
            Nguyên Tắc Đọc Âm Đục/Bán Đục
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <p className="text-gray-300 mb-4 font-semibold">
          Dấu thanh chỉ thay đổi âm thanh (phụ âm vô thanh $\to$ hữu thanh), tạo
          ra **từ vựng có nghĩa mới**.
        </p>

        {/* Bảng Quy Tắc Đọc */}
        <div className="space-y-6">
          <section>
            <h4 className="text-lg font-bold text-teal-300 mb-2">
              1. Âm Đục (Dakuten - 濁点 ゛)
            </h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-teal-700 bg-gray-700 rounded-lg">
                <thead className="bg-teal-900/50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-teal-200">
                      Hàng Gốc
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-teal-200">
                      Chuyển thành
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-teal-200">
                      Phụ Âm
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-800 text-gray-200 text-sm">
                  <tr>
                    <td className="px-4 py-2">K (か, き...)</td>
                    <td className="px-4 py-2">G (が, ぎ...)</td>
                    <td className="px-4 py-2 font-semibold">G (Hữu thanh)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">S (さ, し...)</td>
                    <td className="px-4 py-2">Z (ざ, じ...)</td>
                    <td className="px-4 py-2 font-semibold">Z/J</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">T (た, ち...)</td>
                    <td className="px-4 py-2">D (だ, ぢ...)</td>
                    <td className="px-4 py-2 font-semibold">D</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">H (は, ひ...)</td>
                    <td className="px-4 py-2">B (ば, び...)</td>
                    <td className="px-4 py-2 font-semibold">B</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h4 className="text-lg font-bold text-teal-300 mb-2">
              2. Âm Bán Đục (Handakuten - 半濁点 ゜)
            </h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-teal-700 bg-gray-700 rounded-lg">
                <thead className="bg-teal-900/50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-teal-200">
                      Hàng Gốc
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-teal-200">
                      Chuyển thành
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-teal-200">
                      Phụ Âm
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-800 text-gray-200 text-sm">
                  <tr>
                    <td className="px-4 py-2">H (は, ひ...)</td>
                    <td className="px-4 py-2">P (ぱ, ぴ...)</td>
                    <td className="px-4 py-2 font-semibold">P</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// --- Component Chính ---
const StrokeOrderGuide: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(strokeRulesData[0].id);
  // Đã đổi tên state ban đầu thành isChartModalOpen để rõ ràng hơn
  const [isChartModalOpen, setIsChartModalOpen] = useState<boolean>(false);
  const [isReadingModalOpen, setIsReadingModalOpen] = useState<boolean>(false); // State mới cho Reading Modal

  const selectedRule = strokeRulesData.find((rule) => rule.id === selectedId);

  return (
    // Áp dụng Dark Mode container
    <div className="dark bg-neutral-900 rounded-md min-h-screen text-gray-100 p-4 md:p-8 my-5">
      <h1 className="text-3xl font-bold text-teal-400 mb-6 border-b border-teal-600 pb-2">
        Hướng Dẫn Thứ Tự Nét (Hitsujun) Tiếng Nhật ✍️
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* --- Cột 1: Danh sách các loại ký tự & Nút cố định --- */}
        <div className="md:w-1/3 w-full bg-gray-800 shadow-xl rounded-xl p-4  sticky top-4">
          <h2 className="text-xl font-semibold text-teal-400 mb-4">
            Các Loại Ký Tự
          </h2>
          <nav className="space-y-2 mb-6">
            {strokeRulesData.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors duration-200 font-semibold ${
                  selectedId === item.id
                    ? "bg-teal-600 text-white shadow-md"
                    : "bg-gray-700 text-gray-200 hover:bg-teal-700"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Nút 1: Xem Quy tắc Đọc (MỚI) */}
          <button
            onClick={() => setIsReadingModalOpen(true)}
            className="w-full p-4 mb-3 rounded-lg bg-teal-500 text-white font-bold hover:bg-teal-400 transition-colors shadow-lg"
          >
            📚 Quy Tắc Đọc Âm Đục
          </button>

          {/* Nút 2: Xem Charts (CỐ ĐỊNH) */}
          <button
            onClick={() => setIsChartModalOpen(true)}
            className="w-full p-4 rounded-lg bg-teal-500 text-white font-bold hover:bg-teal-400 transition-colors shadow-lg sticky bottom-4 md:bottom-auto"
          >
            👁️ Xem Stroke Order Charts
          </button>
        </div>

        {/* --- Cột 2: Chi tiết Quy tắc Viết --- */}
        <div className="md:w-2/3 w-full bg-gray-800 shadow-xl rounded-xl p-6 ">
          {selectedRule ? (
            <>
              <h2 className="text-2xl font-bold text-teal-400 mb-4 border-b border-gray-700 pb-2">
                Quy Tắc Viết: {selectedRule.name}
              </h2>
              <div className="space-y-4">
                {/* Nguyên tắc */}
                <section>
                  <h3 className="text-lg font-semibold text-teal-500 mb-2 flex items-center">
                    <span className="text-teal-400 mr-2">📌</span> Nguyên Tắc
                    Chung
                  </h3>
                  <ul className="list-decimal list-inside space-y-2 text-gray-300 ml-4">
                    {selectedRule.rules.map((rule, index) => (
                      <li key={index} className="text-base font-semibold">
                        {rule}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Vị trí và Kích thước */}
                {selectedRule.positionSizeNote && (
                  <section className="bg-teal-900/50 p-4 rounded-lg border border-teal-700">
                    <h3 className="text-lg font-semibold text-teal-400 mb-2 flex items-center">
                      <span className="text-teal-400 mr-2">📐</span> Kích Thước
                      & Vị Trí
                    </h3>
                    <p className="text-base text-gray-200 font-semibold">
                      {selectedRule.positionSizeNote}
                    </p>
                  </section>
                )}

                {/* Ví dụ */}
                {selectedRule.example && (
                  <section>
                    <h3 className="text-lg font-semibold text-teal-500 mb-2 flex items-center">
                      <span className="text-teal-400 mr-2">💡</span> Ví Dụ Minh
                      Họa
                    </h3>
                    <div className="bg-gray-700 p-4 rounded-lg text-gray-100 font-mono text-base">
                      {selectedRule.example}
                    </div>
                  </section>
                )}
              </div>
            </>
          ) : (
            <p className="text-lg text-gray-500">
              Chọn một loại ký tự ở cột bên trái để xem chi tiết quy tắc viết.
            </p>
          )}
        </div>
      </div>

      {/* --- Modals --- */}
      <StrokeChartModal
        isOpen={isChartModalOpen}
        onClose={() => setIsChartModalOpen(false)}
      />
      <ReadingRuleModal
        isOpen={isReadingModalOpen}
        onClose={() => setIsReadingModalOpen(false)}
      />
    </div>
  );
};

export default StrokeOrderGuide;
