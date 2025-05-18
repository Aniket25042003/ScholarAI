from .market_data_agent import fetch_market_data
from .competitor_agent import analyze_competitors
from .sentiment_agent import analyze_sentiment
from .opportunity_agent import identify_opportunities
from statistics import median, mean
import re

def _safe_float(s):
    try:
        m = re.search(r"\d+[\d,.]*", str(s))
        return float(m.group(0).replace(',', '')) if m else None
    except:
        return None

def run_agents(product_idea: str):
    data = fetch_market_data(product_idea)
    if not data:
        raise Exception("No market data found.")
    # competitor
    comp = analyze_competitors(data, product_idea)
    # pricing
    vals = [_safe_float(x.get('pricePoint','')) for x in data]
    vals = [v for v in vals if v and v>0]
    if vals:
        med, avg = round(median(vals),2), round(mean(vals),2)
        prange = f"${min(vals):.2f} - ${max(vals):.2f}"
    else:
        med=avg=None; prange='N/A'
    pricing = {
        'median': f"${med:.2f}" if med else 'N/A',
        'average': f"${avg:.2f}" if avg else 'N/A',
        'range': prange,
        'notes': 'Pricing stats calculated from market data.'
    }
    sent = analyze_sentiment(data)
    gaps, rec = identify_opportunities(data, sent)
    return {
        'productName': product_idea,
        'competitorOverview': comp,
        'pricingAnalysis': pricing,
        'consumerSentiment': sent,
        'gapAnalysis': gaps,
        'recommendationSummary': rec
    }