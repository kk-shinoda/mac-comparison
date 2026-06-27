/* =========================================================================
 * Mac 構成 & 価格カタログ — アプリロジック
 * ========================================================================= */
(function () {
  "use strict";

  var DATA = window.MAC_DATA;
  var MODELS = DATA.models;

  /* ---------- 状態 ---------- */
  var state = {
    modelId: MODELS[0].id,
    chipId: MODELS[0].chips[0].id,
    memIdx: 0,
    storIdx: 0,
    compare: [], // { uid, modelName, family, gen, chip, cpu, gpu, memory, storage, price, 数値群 }
  };
  var uidSeq = 1;

  /* ---------- ユーティリティ ---------- */
  function yen(n) {
    return "¥" + n.toLocaleString("ja-JP");
  }
  // "512GB" -> 512, "1TB" -> 1024 （GB換算）
  function parseGB(label) {
    var n = parseFloat(label);
    return /TB/i.test(label) ? n * 1024 : n;
  }
  function gbLabel(gb) {
    return gb >= 1024 ? gb / 1024 + "TB" : gb + "GB";
  }
  // 数値差分バッジ（基準より多い=オレンジ、少ない=グレー）
  function diffNum(d, unit) {
    if (!d) return "";
    var cls = d > 0 ? "up" : "down";
    var sign = d > 0 ? "+" : "-";
    return ' <span class="diff ' + cls + '">' + sign + Math.abs(d) + unit + "</span>";
  }
  // 価格差分バッジ（基準より高い=赤、安い=緑）
  function diffYen(d) {
    if (!d) return "";
    var cls = d > 0 ? "higher" : "lower";
    var sign = d > 0 ? "+" : "-";
    return ' <span class="diff ' + cls + '">' + sign + yen(Math.abs(d)) + "</span>";
  }
  function diffStorage(d) {
    if (!d) return "";
    var cls = d > 0 ? "up" : "down";
    var sign = d > 0 ? "+" : "-";
    var abs = Math.abs(d);
    return ' <span class="diff ' + cls + '">' + sign + gbLabel(abs) + "</span>";
  }
  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }
  function getModel(id) {
    return MODELS.filter(function (m) { return m.id === id; })[0];
  }
  function getChip(model, id) {
    var c = model.chips.filter(function (x) { return x.id === id; })[0];
    return c || model.chips[0];
  }
  function fromPrice(model) {
    return Math.min.apply(
      null,
      model.chips.map(function (c) { return c.basePrice; })
    );
  }
  function currentPrice() {
    var m = getModel(state.modelId);
    var c = getChip(m, state.chipId);
    var mem = c.memory[state.memIdx] || c.memory[0];
    var sto = c.storage[state.storIdx] || c.storage[0];
    return c.basePrice + mem.delta + sto.delta;
  }

  /* ---------- SVG アイコン（機種シルエット） ---------- */
  function icon(model) {
    var a = model.accent;
    var f = model.family;
    if (model.type === "ノートブック") {
      return (
        '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
        '<rect x="20" y="22" width="60" height="40" rx="4" fill="' + a + '"/>' +
        '<rect x="24" y="26" width="52" height="32" rx="2" fill="#fff" opacity="0.55"/>' +
        '<path d="M12 66 h76 l4 8 a2 2 0 0 1 -2 3 H10 a2 2 0 0 1 -2 -3 Z" fill="' + a + '"/>' +
        '<rect x="42" y="67" width="16" height="3" rx="1.5" fill="#fff" opacity="0.5"/>' +
        "</svg>"
      );
    }
    if (f === "iMac") {
      return (
        '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
        '<rect x="14" y="16" width="72" height="48" rx="5" fill="' + a + '"/>' +
        '<rect x="18" y="20" width="64" height="36" rx="2" fill="#fff" opacity="0.55"/>' +
        '<rect x="44" y="64" width="12" height="12" fill="' + a + '"/>' +
        '<rect x="34" y="76" width="32" height="6" rx="3" fill="' + a + '"/>' +
        "</svg>"
      );
    }
    if (f === "Mac Pro") {
      return (
        '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
        '<rect x="32" y="14" width="36" height="62" rx="6" fill="' + a + '"/>' +
        '<circle cx="42" cy="26" r="3" fill="#fff" opacity="0.55"/>' +
        '<circle cx="42" cy="36" r="3" fill="#fff" opacity="0.55"/>' +
        '<circle cx="42" cy="46" r="3" fill="#fff" opacity="0.55"/>' +
        '<circle cx="42" cy="56" r="3" fill="#fff" opacity="0.55"/>' +
        '<rect x="38" y="76" width="24" height="8" rx="2" fill="' + a + '"/>' +
        "</svg>"
      );
    }
    // Mac mini / Mac Studio（平たい箱）
    var h = f === "Mac Studio" ? 30 : 20;
    var y = 64 - h;
    return (
      '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="18" y="' + y + '" width="64" height="' + h + '" rx="6" fill="' + a + '"/>' +
      '<circle cx="50" cy="' + (y + h - 7) + '" r="4" fill="#fff" opacity="0.5"/>' +
      "</svg>"
    );
  }

  function hexToSoft(hex) {
    var h = hex.replace("#", "");
    var r = parseInt(h.substring(0, 2), 16);
    var g = parseInt(h.substring(2, 4), 16);
    var b = parseInt(h.substring(4, 6), 16);
    return "rgba(" + r + "," + g + "," + b + ",0.16)";
  }

  /* ---------- 1. 機種カード ---------- */
  function renderModelGrid() {
    var grid = document.getElementById("model-grid");
    grid.innerHTML = "";
    MODELS.forEach(function (m) {
      var card = el(
        '<button class="model-card' + (m.id === state.modelId ? " active" : "") + '">' +
          '<div class="model-thumb" style="background:' +
          hexToSoft(m.accent) + '">' + icon(m) + "</div>" +
          '<div class="m-family">' + m.family + " · " +
            (m.legacy ? m.year : m.type) +
            (m.legacy ? ' <span class="legacy-badge">前モデル</span>' : "") +
          "</div>" +
          '<div class="m-name">' + m.name + "</div>" +
          '<div class="m-from"><b>' + yen(fromPrice(m)) + "</b>から</div>" +
        "</button>"
      );
      card.addEventListener("click", function () {
        selectModel(m.id);
      });
      grid.appendChild(card);
    });
  }

  function selectModel(id) {
    state.modelId = id;
    state.chipId = getModel(id).chips[0].id;
    state.memIdx = 0;
    state.storIdx = 0;
    renderAll();
    document.getElementById("builder-wrap").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  /* ---------- 2. 構成ビルダー ---------- */
  function renderBuilder() {
    var wrap = document.getElementById("builder-wrap");
    var m = getModel(state.modelId);
    var c = getChip(m, state.chipId);

    if (state.memIdx >= c.memory.length) state.memIdx = 0;
    if (state.storIdx >= c.storage.length) state.storIdx = 0;

    var html =
      '<h2 class="section-title"><span class="step">2</span>スペックを選ぶ</h2>' +
      '<div class="builder">' +
        '<div class="builder-head">' +
          '<div class="thumb">' + icon(m) + "</div>" +
          "<div>" +
            "<h2>" + m.name + "</h2>" +
            "<p>" + m.tagline + "</p>" +
          "</div>" +
        "</div>" +
        '<div class="builder-body">' +
          chipGroup(m) +
          memGroup(c) +
          storGroup(c) +
          colorGroup(m) +
        "</div>" +
        '<div class="summary">' +
          "<div>" +
            '<div class="price-label">合計（税込・参考価格）</div>' +
            '<div class="price">' + yen(currentPrice()) +
              "<small>" + c.name + " / " + c.memory[state.memIdx].label +
              " / " + c.storage[state.storIdx].label + "</small>" +
            "</div>" +
          "</div>" +
          '<button class="btn" id="add-compare">比較に追加</button>' +
        "</div>" +
      "</div>";

    wrap.innerHTML = html;

    Array.prototype.forEach.call(
      wrap.querySelectorAll("[data-chip]"),
      function (node) {
        node.addEventListener("click", function () {
          state.chipId = node.getAttribute("data-chip");
          state.memIdx = 0;
          state.storIdx = 0;
          renderBuilder();
        });
      }
    );
    Array.prototype.forEach.call(
      wrap.querySelectorAll("[data-mem]"),
      function (node) {
        node.addEventListener("click", function () {
          state.memIdx = parseInt(node.getAttribute("data-mem"), 10);
          renderBuilder();
        });
      }
    );
    Array.prototype.forEach.call(
      wrap.querySelectorAll("[data-stor]"),
      function (node) {
        node.addEventListener("click", function () {
          state.storIdx = parseInt(node.getAttribute("data-stor"), 10);
          renderBuilder();
        });
      }
    );
    wrap.querySelector("#add-compare").addEventListener("click", addToCompare);
  }

  function chipGroup(m) {
    if (m.chips.length === 1) {
      var only = m.chips[0];
      return (
        '<div class="option-group">' +
          "<h3>チップ</h3>" +
          '<p class="hint">この機種は ' + only.name + " を搭載しています。</p>" +
          '<div class="option-row">' +
            '<div class="option active" style="cursor:default">' +
              '<div class="o-title">Apple ' + only.name + "</div>" +
              '<div class="o-sub">' + only.cpu + " / " + only.gpu + "</div>" +
            "</div>" +
          "</div>" +
        "</div>"
      );
    }
    var opts = m.chips
      .map(function (c) {
        var active = c.id === state.chipId;
        return (
          '<div class="option' + (active ? " active" : "") + '" data-chip="' + c.id + '">' +
            '<div class="o-title">Apple ' + c.name + "</div>" +
            '<div class="o-sub">' + c.cpu + " / " + c.gpu + "</div>" +
            '<div class="o-price">' + yen(c.basePrice) + "から</div>" +
          "</div>"
        );
      })
      .join("");
    return (
      '<div class="option-group"><h3>チップ</h3>' +
      '<p class="hint">パフォーマンスの中核。用途に合わせて選びましょう。</p>' +
      '<div class="option-row">' + opts + "</div></div>"
    );
  }

  function memGroup(c) {
    var opts = c.memory
      .map(function (mem, i) {
        var active = i === state.memIdx;
        return (
          '<div class="option' + (active ? " active" : "") + '" data-mem="' + i + '">' +
            '<div class="o-title">' + mem.label + " ユニファイドメモリ</div>" +
            '<div class="o-price' + (mem.delta ? " add" : "") + '">' +
              (mem.delta ? "+ " + yen(mem.delta) : "標準") + "</div>" +
          "</div>"
        );
      })
      .join("");
    return (
      '<div class="option-group"><h3>メモリ</h3>' +
      '<p class="hint">アプリの同時実行や重い作業の快適さに影響します。</p>' +
      '<div class="option-row">' + opts + "</div></div>"
    );
  }

  function storGroup(c) {
    var opts = c.storage
      .map(function (sto, i) {
        var active = i === state.storIdx;
        return (
          '<div class="option' + (active ? " active" : "") + '" data-stor="' + i + '">' +
            '<div class="o-title">' + sto.label + " SSD</div>" +
            '<div class="o-price' + (sto.delta ? " add" : "") + '">' +
              (sto.delta ? "+ " + yen(sto.delta) : "標準") + "</div>" +
          "</div>"
        );
      })
      .join("");
    return (
      '<div class="option-group"><h3>ストレージ</h3>' +
      '<p class="hint">写真・動画・アプリの保存容量。</p>' +
      '<div class="option-row">' + opts + "</div></div>"
    );
  }

  function colorGroup(m) {
    var chips = m.colors
      .map(function (col) {
        return '<span class="color-chip">' + col + "</span>";
      })
      .join("");
    return (
      '<div class="option-group"><h3>カラー</h3>' +
      '<p class="hint">価格は変わりません。お好みでどうぞ。</p>' +
      '<div class="color-row">' + chips + "</div></div>"
    );
  }

  /* ---------- 比較に追加 ---------- */
  function addToCompare() {
    var m = getModel(state.modelId);
    var c = getChip(m, state.chipId);
    var mem = c.memory[state.memIdx];
    var sto = c.storage[state.storIdx];
    state.compare.push({
      uid: uidSeq++,
      modelName: m.name,
      family: m.family,
      gen: m.legacy ? m.year : "現行（最新）",
      chip: "Apple " + c.name,
      cpu: c.cpu,
      gpu: c.gpu,
      memory: mem.label,
      storage: sto.label,
      price: currentPrice(),
      cpuCores: parseInt(c.cpu, 10) || 0,
      gpuCores: parseInt(c.gpu, 10) || 0,
      memGB: parseGB(mem.label),
      stoGB: parseGB(sto.label),
    });
    renderCompare();
    showToast("比較リストに追加しました（" + state.compare.length + "件）");
    if (state.compare.length === 1) {
      document.getElementById("compare-wrap").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  /* ---------- 3. 比較テーブル ---------- */
  function renderCompare() {
    var wrap = document.getElementById("compare-wrap");
    if (state.compare.length === 0) {
      wrap.innerHTML =
        '<div class="compare-empty">まだ構成が追加されていません。<br>' +
        "上で構成を選んで「比較に追加」を押すと、ここで並べて比較できます。</div>";
      return;
    }

    var items = state.compare;
    var minPrice = Math.min.apply(null, items.map(function (x) { return x.price; }));

    var rows = [
      { label: "機種", get: function (x) {
          return '<div class="col-name">' + x.modelName + "</div>" +
                 '<div class="col-family">' + x.family + "</div>";
        } },
      { label: "世代 / 発売", get: function (x) { return x.gen; } },
      { label: "チップ", get: function (x) { return x.chip; } },
      { label: "CPU", get: function (x, b, isBase) {
          return x.cpu + (isBase ? "" : diffNum(x.cpuCores - b.cpuCores, "コア"));
        } },
      { label: "GPU", get: function (x, b, isBase) {
          return x.gpu + (isBase ? "" : diffNum(x.gpuCores - b.gpuCores, "コア"));
        } },
      { label: "メモリ", get: function (x, b, isBase) {
          return x.memory + (isBase ? "" : diffNum(x.memGB - b.memGB, "GB"));
        } },
      { label: "ストレージ", get: function (x, b, isBase) {
          return x.storage + (isBase ? "" : diffStorage(x.stoGB - b.stoGB));
        } },
      { label: "価格（税込・参考）", get: function (x, b, isBase) {
          var best = x.price === minPrice && items.length > 1;
          return '<span class="price-cell' + (best ? " best" : "") + '">' +
                 yen(x.price) + (best ? " 最安" : "") + "</span>" +
                 (isBase ? ' <span class="diff base-tag">基準</span>' : diffYen(x.price - b.price));
        } },
    ];

    var base = items[0];
    var headCols = items
      .map(function (x, i) {
        return '<th><button class="remove-x" data-rm="' + x.uid + '">×</button>構成 ' +
          (i + 1) + (i === 0 ? '<div class="base-note">基準</div>' : "") + "</th>";
      })
      .join("");

    var bodyRows = rows
      .map(function (r) {
        var tds = items
          .map(function (x) { return "<td>" + r.get(x, base, x === base) + "</td>"; })
          .join("");
        return "<tr><th>" + r.label + "</th>" + tds + "</tr>";
      })
      .join("");

    wrap.innerHTML =
      '<div class="compare-head">' +
        "<div>" + items.length + " 件の構成を比較中" +
          (items.length > 1
            ? '<span class="compare-hint">左端（構成1）を基準に差分を表示</span>'
            : "") +
        "</div>" +
        '<button class="btn ghost small" id="clear-compare">すべてクリア</button>' +
      "</div>" +
      '<div class="compare-scroll"><table class="compare">' +
        "<thead><tr><th></th>" + headCols + "</tr></thead>" +
        "<tbody>" + bodyRows + "</tbody>" +
      "</table></div>";

    Array.prototype.forEach.call(
      wrap.querySelectorAll("[data-rm]"),
      function (node) {
        node.addEventListener("click", function () {
          var id = parseInt(node.getAttribute("data-rm"), 10);
          state.compare = state.compare.filter(function (x) { return x.uid !== id; });
          renderCompare();
        });
      }
    );
    wrap.querySelector("#clear-compare").addEventListener("click", function () {
      state.compare = [];
      renderCompare();
    });
  }

  /* ---------- トースト ---------- */
  var toastTimer = null;
  function showToast(msg) {
    var t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      t.classList.remove("show");
    }, 2000);
  }

  /* ---------- 描画まとめ ---------- */
  function renderAll() {
    renderModelGrid();
    renderBuilder();
  }

  function init() {
    document.getElementById("updated").textContent = "更新: " + DATA.updated;
    document.getElementById("note").innerHTML =
      "※ 価格はすべて税込の参考価格です。ベース価格は " + DATA.updated +
      " の Apple 公式の開始価格に基づきます。メモリ・ストレージ等のアップグレード加算額は一般的な価格体系に基づく概算値で、実際の金額と異なる場合があります。" +
      "「前モデル」は各機種の発売時の定価を基準にした参考値で、現行モデル（最新価格）との金額差はあくまで目安です。" +
      "正確な価格・在庫・最新モデルは Apple 公式サイト（apple.com/jp）でご確認ください。";
    renderAll();
    renderCompare();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
