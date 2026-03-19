# Dashboard Styling Specification

## Overview
Both the Streamlit dashboard (Project 1) and the NL assistant (Project 2) must share a consistent visual identity aligned with the DataLife brand.

---

## Color Palette

### Primary Colors (use for charts, KPI cards, accents)
| Name | Hex | Usage |
|------|-----|-------|
| Accent Blue | `#2563EB` | Primary chart color, active states, KPI highlights |
| Accent Sky | `#38BDF8` | Secondary chart color, hover states |
| Accent Teal | `#14B8A6` | Tertiary chart color, positive indicators |
| Success Green | `#22C55E` | Positive metrics (revenue up, low return rate) |
| Warning Amber | `#F59E0B` | Caution metrics (medium risk) |
| Danger Red | `#EF4444` | Negative metrics (high return rate, dead inventory) |

### Background & Surface
| Name | Hex | Usage |
|------|-----|-------|
| White | `#FFFFFF` | Page background |
| Whisper Blue | `#F0F7FF` | Card backgrounds, alternating table rows |
| Light Blue | `#DBEAFE` | Selected states, active filters |
| Border | `#E2E8F0` | Card borders, dividers |

### Text
| Name | Hex | Usage |
|------|-----|-------|
| Primary Text | `#0F172A` | Headings, body text |
| Secondary Text | `#64748B` | Labels, descriptions, captions |

---

## Chart Color Sequence

When plotting multiple categories/brands, use this color sequence in order:

1. `#2563EB` (Accent Blue)
2. `#38BDF8` (Accent Sky)
3. `#14B8A6` (Accent Teal)
4. `#8B5CF6` (Purple)
5. `#F59E0B` (Amber)
6. `#EF4444` (Red)
7. `#EC4899` (Pink)
8. `#6B7280` (Gray)

This sequence provides enough contrast for 8 brands or 6 categories.

---

## Streamlit Theme Configuration

Add to `.streamlit/config.toml`:

```toml
[theme]
primaryColor = "#2563EB"
backgroundColor = "#FFFFFF"
secondaryBackgroundColor = "#F0F7FF"
textColor = "#0F172A"
font = "sans serif"
```

---

## Layout Rules

### Page Structure
- **Sidebar:** Filters only (dropdowns, sliders, date pickers). No charts in the sidebar.
- **Main area:** KPI cards at top → charts below → tables at bottom.
- **Max width:** Use `st.set_page_config(layout="wide")` for dashboards.

### KPI Cards
- Display 4 KPI cards per row using `st.columns(4)`.
- Each card shows: metric label (secondary text, small), metric value (primary text, large bold), delta indicator (green arrow up / red arrow down with % change where applicable).
- Card styling: Whisper Blue background, 1px border, 8px border-radius, 16px padding.

### Charts
- Use 2-column layout for most chart pairs: `col1, col2 = st.columns(2)`.
- Full-width for trend lines and heatmaps.
- Chart height: 400px default, 300px for secondary charts.
- Always include chart titles (bold, 16px).
- Always include axis labels.
- Use hover tooltips showing exact values.

### Tables
- Alternating row colors (white / Whisper Blue).
- Header row: Accent Blue background, white text.
- Sort indicators visible.
- Max 15 rows visible, scrollable if more.

---

## Plotly Template

Use this Plotly template for consistent chart styling:

```python
import plotly.graph_objects as go
import plotly.io as pio

datalife_template = go.layout.Template(
    layout=go.Layout(
        font=dict(family="Inter, Arial, sans-serif", color="#0F172A"),
        title=dict(font=dict(size=18, color="#0F172A")),
        plot_bgcolor="#FFFFFF",
        paper_bgcolor="#FFFFFF",
        colorway=["#2563EB", "#38BDF8", "#14B8A6", "#8B5CF6", "#F59E0B", "#EF4444", "#EC4899", "#6B7280"],
        xaxis=dict(gridcolor="#E2E8F0", linecolor="#E2E8F0"),
        yaxis=dict(gridcolor="#E2E8F0", linecolor="#E2E8F0"),
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1),
        margin=dict(l=60, r=20, t=60, b=40),
    )
)

pio.templates["datalife"] = datalife_template
pio.templates.default = "datalife"
```

---

## Typography (Streamlit CSS Override)

Inject this CSS via `st.markdown()` at the top of each page:

```css
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    html, body, [class*="css"] {
        font-family: 'Inter', sans-serif;
    }
    
    h1 { font-weight: 700; color: #0F172A; font-size: 28px; }
    h2 { font-weight: 600; color: #0F172A; font-size: 22px; }
    h3 { font-weight: 600; color: #2563EB; font-size: 18px; }
    
    .stMetric label { color: #64748B; font-size: 14px; }
    .stMetric [data-testid="stMetricValue"] { color: #0F172A; font-weight: 700; }
    
    .stDataFrame { border: 1px solid #E2E8F0; border-radius: 8px; }
</style>
```

---

## Project 2 (NL Assistant) Additional Styling

### Chat Interface
- User messages: Right-aligned, Accent Blue background, white text, rounded corners.
- Assistant messages: Left-aligned, Whisper Blue background, dark text, rounded corners.
- Input field: Full-width at bottom, placeholder text "Ask about your sales data..."
- Suggested queries: Show 4 clickable example queries above the input field on first load.

### Anomaly Alerts
- HIGH severity: Red left border (4px), light red background (`#FEF2F2`).
- MEDIUM severity: Amber left border, light amber background (`#FFFBEB`).
- LOW severity: Blue left border, Whisper Blue background.
- Each alert: icon + title (bold) + description + recommendation (collapsible).

### KPI Summary Reports
- Render as styled Markdown in an expander.
- Section headers in Accent Blue.
- Key numbers in bold.
- Trends indicated with ↑ ↓ → arrows and green/red/gray coloring.
