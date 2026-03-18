# Anomaly Detection Report — Luxe & Thread Boutique

**Total alerts triggered:** 9  | 🔴 HIGH: 6  | 🟡 MEDIUM: 2  | 🔵 LOW: 1

---

## 🔴 HIGH Priority Alerts

### High Return Rate: Ann Taylor
**Rule:** `RULE_1` | **Affected items:** 51

Ann Taylor return rate is 19.8%, which is 1.35× the store average of 14.7%. Top return reasons: Changed Mind, Wrong Item, Size Issue.

> **Recommendation:** Review Ann Taylor product quality, sizing consistency, and supplier descriptions. Consider a quality audit of the top return-reason SKUs.

---

### Dead Inventory: 118 Items Identified
**Rule:** `RULE_4` | **Affected items:** 118

118 items identified as potential dead inventory (markdown > 30% + rating < 2.5). Top categories: Accessories (26), Bottoms (25), Shoes (23). Estimated revenue tied up: $5,762.58.

> **Recommendation:** Consider liquidating or discontinuing these items. Run a flash sale at 50–70% off to clear stock, or remove from catalogue to protect brand perception. Review supplier contracts for quality issues.

---

### Revenue Drop: 2024-10 vs 2024-09
**Rule:** `RULE_7` | **Affected items:** 46

Revenue in 2024-10 dropped 26.2% vs 2024-09 ($3,779.94 vs $5,123.10). Based on 46 transactions in 2024-10.

> **Recommendation:** Investigate external factors (seasonality, supply issues, competitor activity) driving the revenue drop in 2024-10. Cross-reference with return rates and stock levels for that period.

---

### Revenue Drop: 2025-05 vs 2025-04
**Rule:** `RULE_7` | **Affected items:** 48

Revenue in 2025-05 dropped 32.6% vs 2025-04 ($3,785.73 vs $5,616.70). Based on 48 transactions in 2025-05.

> **Recommendation:** Investigate external factors (seasonality, supply issues, competitor activity) driving the revenue drop in 2025-05. Cross-reference with return rates and stock levels for that period.

---

### Revenue Drop: 2025-06 vs 2025-05
**Rule:** `RULE_7` | **Affected items:** 32

Revenue in 2025-06 dropped 24.5% vs 2025-05 ($2,859.20 vs $3,785.73). Based on 32 transactions in 2025-06.

> **Recommendation:** Investigate external factors (seasonality, supply issues, competitor activity) driving the revenue drop in 2025-06. Cross-reference with return rates and stock levels for that period.

---

### Luxury Items with Critical Ratings: 70 Products
**Rule:** `RULE_10` | **Affected items:** 70

70 luxury-priced items (>$150) have ratings below 2.0. These represent a brand perception risk for the boutique.

> **Recommendation:** Urgently review luxury items with sub-2.0 ratings. Consider removing them from the catalogue or addressing quality issues with the supplier. Poor luxury ratings disproportionately damage brand trust.

---

## 🟡 MEDIUM Priority Alerts

### Low Customer Rating: Mango
**Rule:** `RULE_3` | **Affected items:** 240

Mango average rating is 2.78/5.0, below the 2.8 threshold. Lowest-rated categories: Outerwear (2.41), Accessories (2.51), Bottoms (2.81). Based on 240 rated products.

> **Recommendation:** Conduct a customer feedback review for Mango. Consider requesting product quality improvements from the supplier or reducing {brand} SKU count in underperforming categories.

---

### Overstock with Heavy Discounting: 159 Items
**Rule:** `RULE_5` | **Affected items:** 159

159 items have high stock (>35 units) despite heavy discounting (>25.0%). These products are not moving even at a discount. Top categories: Accessories (36), Dresses (27), Bottoms (26).

> **Recommendation:** Consider aggressive clearance pricing, bundling with higher-performing items, or returning stock to supplier if contract allows. Review initial purchasing decisions for these SKUs.

---

## 🔵 LOW Priority Alerts (Informational)

### Out of Stock: 43 Items
**Rule:** `RULE_6` | **Affected items:** 43

43 items are currently out of stock. By category: Bottoms: 10, Shoes: 10, Accessories: 8, Dresses: 8, Tops: 4, Outerwear: 3.

> **Recommendation:** Review reorder priority, especially for top-revenue categories (Outerwear, Shoes). Cross-reference with sales velocity before reordering low-rated SKUs.

---
