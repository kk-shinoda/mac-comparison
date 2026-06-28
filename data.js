/*
 * Mac ラインナップ & 価格データ（日本 / 税込）
 *
 * - ベース価格は 2026年6月25日の価格改定を反映した Apple 公式の開始価格に基づく参考値です。
 * - メモリ / ストレージ等のアップグレード加算額は、Apple の一般的な価格体系に基づく
 *   「参考概算値」です（実際の購入時は Apple Store の表示価格をご確認ください）。
 *
 * 価格計算: 最終価格 = chip.basePrice + memory.delta + storage.delta + (gpu.delta)
 */
window.MAC_DATA = {
  updated: "2026年6月時点（Apple公式サイトの表示価格を実測して反映）",
  source: "各機種の開始価格はApple公式サイトの表示価格（2026年6月実測）。メモリ/ストレージのアップグレード加算額は概算。Mac Proは2023年モデルで販売終了。",

  /*
   * 学割（学生・教職員向けストア）の割引設定 — 参考概算値
   * Apple の学生・教職員向けストアは機種ごとに割引額が異なります。ここでは
   * 構成合計に対するおおよその割引率（ファミリー別）で概算します。実際の
   * 割引額は Apple 公式の学生・教職員向けストアでご確認ください。
   */
  eduDiscount: {
    note: "学生・教職員向けストアの概算割引（実際の金額と異なる場合があります）",
    default: 0.06,
    byFamily: {
      "MacBook Air": 0.05,
      "MacBook Pro": 0.08,
      "iMac": 0.05,
      "Mac mini": 0.04,
      "Mac Studio": 0.07,
      "Mac Pro": 0.08,
    },
  },

  // 共通アップグレード単価（参考概算・円）
  // 各機種ではこれを基にメモリ/ストレージの選択肢を定義しています。
  models: [
    /* ============================ MacBook Air ============================ */
    {
      id: "mba13",
      family: "MacBook Air",
      name: "MacBook Air 13インチ",
      tagline: "驚くほど軽い。1日中使えるバッテリー。",
      type: "ノートブック",
      accent: "#b7c9e2",
      colors: ["スカイブルー", "シルバー", "スターライト", "ミッドナイト"],
      chips: [
        {
          id: "m5-8c",
          name: "M5",
          cpu: "10コアCPU",
          gpu: "8コアGPU",
          basePrice: 224800,
          memory: [
            { label: "16GB", delta: 0 },
            { label: "24GB", delta: 30000 },
            { label: "32GB", delta: 60000 },
          ],
          storage: [
            { label: "512GB", delta: 0 },
            { label: "1TB", delta: 30000 },
            { label: "2TB", delta: 90000 },
          ],
        },
        {
          id: "m5-10c",
          name: "M5",
          cpu: "10コアCPU",
          gpu: "10コアGPU",
          basePrice: 242800,
          memory: [
            { label: "16GB", delta: 0 },
            { label: "24GB", delta: 30000 },
            { label: "32GB", delta: 60000 },
          ],
          storage: [
            { label: "512GB", delta: 0 },
            { label: "1TB", delta: 30000 },
            { label: "2TB", delta: 90000 },
            { label: "4TB", delta: 210000 },
          ],
        },
      ],
    },
    {
      id: "mba15",
      family: "MacBook Air",
      name: "MacBook Air 15インチ",
      tagline: "大きく広がる15.3インチ。薄くて軽い。",
      type: "ノートブック",
      accent: "#9fb6d6",
      colors: ["スカイブルー", "シルバー", "スターライト", "ミッドナイト"],
      chips: [
        {
          id: "m5-10c",
          name: "M5",
          cpu: "10コアCPU",
          gpu: "10コアGPU",
          basePrice: 264800,
          memory: [
            { label: "16GB", delta: 0 },
            { label: "24GB", delta: 30000 },
            { label: "32GB", delta: 60000 },
          ],
          storage: [
            { label: "512GB", delta: 0 },
            { label: "1TB", delta: 30000 },
            { label: "2TB", delta: 90000 },
            { label: "4TB", delta: 210000 },
          ],
        },
      ],
    },

    /* ============================ MacBook Pro ============================ */
    {
      id: "mbp14",
      family: "MacBook Pro",
      name: "MacBook Pro 14インチ",
      tagline: "プロのための圧倒的パフォーマンス。",
      type: "ノートブック",
      accent: "#3a3a3c",
      colors: ["スペースブラック", "シルバー"],
      chips: [
        {
          id: "m5",
          name: "M5",
          cpu: "10コアCPU",
          gpu: "10コアGPU",
          basePrice: 339800,
          memory: [
            { label: "16GB", delta: 0 },
            { label: "24GB", delta: 30000 },
            { label: "32GB", delta: 60000 },
          ],
          storage: [
            { label: "512GB", delta: 0 },
            { label: "1TB", delta: 30000 },
            { label: "2TB", delta: 90000 },
            { label: "4TB", delta: 210000 },
          ],
        },
        {
          id: "m5pro",
          name: "M5 Pro",
          cpu: "15コアCPU",
          gpu: "16コアGPU",
          basePrice: 429800,
          memory: [
            { label: "24GB", delta: 0 },
            { label: "36GB", delta: 30000 },
            { label: "48GB", delta: 90000 },
          ],
          storage: [
            { label: "512GB", delta: 0 },
            { label: "1TB", delta: 30000 },
            { label: "2TB", delta: 90000 },
            { label: "4TB", delta: 210000 },
            { label: "8TB", delta: 450000 },
          ],
        },
        {
          id: "m5max",
          name: "M5 Max",
          cpu: "18コアCPU",
          gpu: "32コアGPU",
          basePrice: 699800,
          memory: [
            { label: "36GB", delta: 0 },
            { label: "48GB", delta: 60000 },
            { label: "64GB", delta: 120000 },
            { label: "128GB", delta: 270000 },
          ],
          storage: [
            { label: "1TB", delta: 0 },
            { label: "2TB", delta: 60000 },
            { label: "4TB", delta: 180000 },
            { label: "8TB", delta: 420000 },
          ],
        },
      ],
    },
    {
      id: "mbp16",
      family: "MacBook Pro",
      name: "MacBook Pro 16インチ",
      tagline: "最大級の画面と、最長級のバッテリー。",
      type: "ノートブック",
      accent: "#2c2c2e",
      colors: ["スペースブラック", "シルバー"],
      chips: [
        {
          id: "m5pro",
          name: "M5 Pro",
          cpu: "18コアCPU",
          gpu: "20コアGPU",
          basePrice: 519800,
          memory: [
            { label: "24GB", delta: 0 },
            { label: "36GB", delta: 30000 },
            { label: "48GB", delta: 90000 },
          ],
          storage: [
            { label: "512GB", delta: 0 },
            { label: "1TB", delta: 30000 },
            { label: "2TB", delta: 90000 },
            { label: "4TB", delta: 210000 },
            { label: "8TB", delta: 450000 },
          ],
        },
        {
          id: "m5max",
          name: "M5 Max",
          cpu: "18コアCPU",
          gpu: "32コアGPU",
          basePrice: 749800,
          memory: [
            { label: "36GB", delta: 0 },
            { label: "48GB", delta: 60000 },
            { label: "64GB", delta: 120000 },
            { label: "128GB", delta: 270000 },
          ],
          storage: [
            { label: "1TB", delta: 0 },
            { label: "2TB", delta: 60000 },
            { label: "4TB", delta: 180000 },
            { label: "8TB", delta: 420000 },
          ],
        },
      ],
    },

    /* ============================ iMac ============================ */
    {
      id: "imac24",
      family: "iMac",
      name: "iMac 24インチ",
      tagline: "鮮やかな4.5K Retina。薄くてカラフル。",
      type: "デスクトップ",
      accent: "#7fc4d6",
      colors: ["ブルー", "パープル", "ピンク", "オレンジ", "イエロー", "グリーン", "シルバー"],
      chips: [
        {
          id: "m4-8c",
          name: "M4",
          cpu: "8コアCPU",
          gpu: "8コアGPU",
          basePrice: 249800,
          memory: [
            { label: "16GB", delta: 0 },
            { label: "24GB", delta: 30000 },
            { label: "32GB", delta: 60000 },
          ],
          storage: [
            { label: "256GB", delta: 0 },
            { label: "512GB", delta: 30000 },
            { label: "1TB", delta: 60000 },
            { label: "2TB", delta: 120000 },
          ],
        },
        {
          id: "m4-10c",
          name: "M4",
          cpu: "10コアCPU",
          gpu: "10コアGPU",
          basePrice: 289800,
          memory: [
            { label: "16GB", delta: 0 },
            { label: "24GB", delta: 30000 },
            { label: "32GB", delta: 60000 },
          ],
          storage: [
            { label: "512GB", delta: 0 },
            { label: "1TB", delta: 30000 },
            { label: "2TB", delta: 90000 },
          ],
        },
      ],
    },

    /* ============================ Mac mini ============================ */
    {
      id: "macmini",
      family: "Mac mini",
      name: "Mac mini",
      tagline: "手のひらサイズに、パワーを凝縮。",
      type: "デスクトップ",
      accent: "#9aa0a6",
      colors: ["シルバー"],
      chips: [
        {
          id: "m4",
          name: "M4",
          cpu: "10コアCPU",
          gpu: "10コアGPU",
          basePrice: 134800,
          memory: [
            { label: "16GB", delta: 0 },
            { label: "24GB", delta: 30000 },
            { label: "32GB", delta: 60000 },
          ],
          storage: [
            { label: "256GB", delta: 0 },
            { label: "512GB", delta: 30000 },
            { label: "1TB", delta: 60000 },
            { label: "2TB", delta: 120000 },
          ],
        },
        {
          id: "m4pro",
          name: "M4 Pro",
          cpu: "12コアCPU",
          gpu: "16コアGPU",
          basePrice: 279800,
          memory: [
            { label: "24GB", delta: 0 },
            { label: "48GB", delta: 90000 },
            { label: "64GB", delta: 150000 },
          ],
          storage: [
            { label: "512GB", delta: 0 },
            { label: "1TB", delta: 30000 },
            { label: "2TB", delta: 90000 },
            { label: "4TB", delta: 210000 },
          ],
        },
      ],
    },

    /* ============================ Mac Studio ============================ */
    {
      id: "macstudio",
      family: "Mac Studio",
      name: "Mac Studio",
      tagline: "クリエイティブの限界を超えるデスクトップ。",
      type: "デスクトップ",
      accent: "#8e8e93",
      colors: ["シルバー"],
      chips: [
        {
          id: "m4max",
          name: "M4 Max",
          cpu: "14コアCPU",
          gpu: "32コアGPU",
          basePrice: 419800,
          memory: [
            { label: "36GB", delta: 0 },
            { label: "48GB", delta: 60000 },
            { label: "64GB", delta: 120000 },
            { label: "128GB", delta: 270000 },
          ],
          storage: [
            { label: "512GB", delta: 0 },
            { label: "1TB", delta: 30000 },
            { label: "2TB", delta: 90000 },
            { label: "4TB", delta: 210000 },
            { label: "8TB", delta: 450000 },
          ],
        },
        {
          id: "m3ultra",
          name: "M3 Ultra",
          cpu: "28コアCPU",
          gpu: "60コアGPU",
          basePrice: 899800,
          memory: [
            { label: "96GB", delta: 0 },
            { label: "256GB", delta: 300000 },
            { label: "512GB", delta: 690000 },
          ],
          storage: [
            { label: "1TB", delta: 0 },
            { label: "2TB", delta: 60000 },
            { label: "4TB", delta: 180000 },
            { label: "8TB", delta: 420000 },
          ],
        },
      ],
    },

    /* ============================ Mac Pro ============================ */
    {
      id: "macpro",
      family: "Mac Pro",
      name: "Mac Pro（2023・販売終了）",
      tagline: "拡張性とパワーの頂点。2026年3月に販売終了。",
      type: "デスクトップ",
      accent: "#48484a",
      colors: ["シルバー"],
      chips: [
        {
          id: "m2ultra",
          name: "M2 Ultra",
          cpu: "24コアCPU",
          gpu: "60コアGPU",
          basePrice: 1098800,
          memory: [
            { label: "64GB", delta: 0 },
            { label: "128GB", delta: 120000 },
            { label: "192GB", delta: 270000 },
          ],
          storage: [
            { label: "1TB", delta: 0 },
            { label: "2TB", delta: 60000 },
            { label: "4TB", delta: 180000 },
            { label: "8TB", delta: 420000 },
          ],
        },
      ],
    },

    /* ===================================================================
     * 前世代モデル（同一機種の世代間比較用）
     * 価格は各モデルの「発売時の定価」を基準にした参考値です。
     * =================================================================== */
    {
      id: "mba13-m4",
      family: "MacBook Air",
      name: "MacBook Air 13インチ（M4・前モデル）",
      tagline: "1つ前の世代。M4チップ搭載の軽量モデル。",
      type: "ノートブック",
      accent: "#bcd0e8",
      legacy: true,
      year: "2025年モデル",
      colors: ["スカイブルー", "シルバー", "スターライト", "ミッドナイト"],
      chips: [
        {
          id: "m4",
          name: "M4",
          cpu: "10コアCPU",
          gpu: "8コアGPU",
          basePrice: 164800,
          memory: [
            { label: "16GB", delta: 0 },
            { label: "24GB", delta: 30000 },
            { label: "32GB", delta: 60000 },
          ],
          storage: [
            { label: "256GB", delta: 0 },
            { label: "512GB", delta: 30000 },
            { label: "1TB", delta: 60000 },
            { label: "2TB", delta: 120000 },
          ],
        },
      ],
    },
    {
      id: "mba15-m4",
      family: "MacBook Air",
      name: "MacBook Air 15インチ（M4・前モデル）",
      tagline: "1つ前の世代。15.3インチの大画面M4モデル。",
      type: "ノートブック",
      accent: "#a9c0de",
      legacy: true,
      year: "2025年モデル",
      colors: ["スカイブルー", "シルバー", "スターライト", "ミッドナイト"],
      chips: [
        {
          id: "m4",
          name: "M4",
          cpu: "10コアCPU",
          gpu: "10コアGPU",
          basePrice: 198800,
          memory: [
            { label: "16GB", delta: 0 },
            { label: "24GB", delta: 30000 },
            { label: "32GB", delta: 60000 },
          ],
          storage: [
            { label: "256GB", delta: 0 },
            { label: "512GB", delta: 30000 },
            { label: "1TB", delta: 60000 },
            { label: "2TB", delta: 120000 },
          ],
        },
      ],
    },
    {
      id: "mbp14-m4",
      family: "MacBook Pro",
      name: "MacBook Pro 14インチ（M4・前モデル）",
      tagline: "1つ前の世代。M4 / M4 Pro / M4 Max を選択可能。",
      type: "ノートブック",
      accent: "#48484a",
      legacy: true,
      year: "2024年モデル",
      colors: ["スペースブラック", "シルバー"],
      chips: [
        {
          id: "m4",
          name: "M4",
          cpu: "10コアCPU",
          gpu: "10コアGPU",
          basePrice: 248800,
          memory: [
            { label: "16GB", delta: 0 },
            { label: "24GB", delta: 30000 },
            { label: "32GB", delta: 60000 },
          ],
          storage: [
            { label: "512GB", delta: 0 },
            { label: "1TB", delta: 30000 },
            { label: "2TB", delta: 90000 },
          ],
        },
        {
          id: "m4pro",
          name: "M4 Pro",
          cpu: "14コアCPU",
          gpu: "20コアGPU",
          basePrice: 348800,
          memory: [
            { label: "24GB", delta: 0 },
            { label: "48GB", delta: 90000 },
          ],
          storage: [
            { label: "512GB", delta: 0 },
            { label: "1TB", delta: 30000 },
            { label: "2TB", delta: 90000 },
            { label: "4TB", delta: 210000 },
          ],
        },
        {
          id: "m4max",
          name: "M4 Max",
          cpu: "16コアCPU",
          gpu: "40コアGPU",
          basePrice: 548800,
          memory: [
            { label: "36GB", delta: 0 },
            { label: "48GB", delta: 60000 },
            { label: "64GB", delta: 120000 },
            { label: "128GB", delta: 270000 },
          ],
          storage: [
            { label: "1TB", delta: 0 },
            { label: "2TB", delta: 60000 },
            { label: "4TB", delta: 180000 },
            { label: "8TB", delta: 420000 },
          ],
        },
      ],
    },
    {
      id: "imac24-m3",
      family: "iMac",
      name: "iMac 24インチ（M3・前モデル）",
      tagline: "1つ前の世代。M3チップ搭載のカラフルな一体型。",
      type: "デスクトップ",
      accent: "#8fcede",
      legacy: true,
      year: "2023年モデル",
      colors: ["ブルー", "パープル", "ピンク", "オレンジ", "イエロー", "グリーン", "シルバー"],
      chips: [
        {
          id: "m3-8c",
          name: "M3",
          cpu: "8コアCPU",
          gpu: "8コアGPU",
          basePrice: 198800,
          memory: [
            { label: "8GB", delta: 0 },
            { label: "16GB", delta: 30000 },
            { label: "24GB", delta: 60000 },
          ],
          storage: [
            { label: "256GB", delta: 0 },
            { label: "512GB", delta: 30000 },
            { label: "1TB", delta: 60000 },
          ],
        },
        {
          id: "m3-10c",
          name: "M3",
          cpu: "8コアCPU",
          gpu: "10コアGPU",
          basePrice: 218800,
          memory: [
            { label: "8GB", delta: 0 },
            { label: "16GB", delta: 30000 },
            { label: "24GB", delta: 60000 },
          ],
          storage: [
            { label: "256GB", delta: 0 },
            { label: "512GB", delta: 30000 },
            { label: "1TB", delta: 60000 },
            { label: "2TB", delta: 120000 },
          ],
        },
      ],
    },
    {
      id: "macmini-m2",
      family: "Mac mini",
      name: "Mac mini（M2・前モデル）",
      tagline: "1つ前の世代。M2 / M2 Pro のコンパクトデスクトップ。",
      type: "デスクトップ",
      accent: "#a7adb3",
      legacy: true,
      year: "2023年モデル",
      colors: ["シルバー"],
      chips: [
        {
          id: "m2",
          name: "M2",
          cpu: "8コアCPU",
          gpu: "10コアGPU",
          basePrice: 84800,
          memory: [
            { label: "8GB", delta: 0 },
            { label: "16GB", delta: 30000 },
            { label: "24GB", delta: 60000 },
          ],
          storage: [
            { label: "256GB", delta: 0 },
            { label: "512GB", delta: 30000 },
            { label: "1TB", delta: 60000 },
            { label: "2TB", delta: 120000 },
          ],
        },
        {
          id: "m2pro",
          name: "M2 Pro",
          cpu: "10コアCPU",
          gpu: "16コアGPU",
          basePrice: 134800,
          memory: [
            { label: "16GB", delta: 0 },
            { label: "32GB", delta: 60000 },
          ],
          storage: [
            { label: "512GB", delta: 0 },
            { label: "1TB", delta: 30000 },
            { label: "2TB", delta: 90000 },
          ],
        },
      ],
    },
    {
      id: "macstudio-m2",
      family: "Mac Studio",
      name: "Mac Studio（M2・前モデル）",
      tagline: "1つ前の世代。M2 Max / M2 Ultra のハイエンド。",
      type: "デスクトップ",
      accent: "#9b9ba0",
      legacy: true,
      year: "2023年モデル",
      colors: ["シルバー"],
      chips: [
        {
          id: "m2max",
          name: "M2 Max",
          cpu: "12コアCPU",
          gpu: "30コアGPU",
          basePrice: 298000,
          memory: [
            { label: "32GB", delta: 0 },
            { label: "64GB", delta: 60000 },
            { label: "96GB", delta: 120000 },
          ],
          storage: [
            { label: "512GB", delta: 0 },
            { label: "1TB", delta: 30000 },
            { label: "2TB", delta: 90000 },
            { label: "4TB", delta: 210000 },
            { label: "8TB", delta: 450000 },
          ],
        },
        {
          id: "m2ultra",
          name: "M2 Ultra",
          cpu: "24コアCPU",
          gpu: "60コアGPU",
          basePrice: 598000,
          memory: [
            { label: "64GB", delta: 0 },
            { label: "128GB", delta: 120000 },
            { label: "192GB", delta: 270000 },
          ],
          storage: [
            { label: "1TB", delta: 0 },
            { label: "2TB", delta: 60000 },
            { label: "4TB", delta: 180000 },
            { label: "8TB", delta: 420000 },
          ],
        },
      ],
    },
  ],
};
