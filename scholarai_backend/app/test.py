"""
Smoke tests for Academic Research API:
1) POST /api/research
2) GET /api/graph
3) POST /api/chat
"""
import requests
import sys

BASE_URL = "http://localhost:8000"


def test_research():
    print("\n1) Testing POST /api/research (timeout 120s)")
    payload = {
        "topic": "machine learning in agriculture",
        "num_papers": 1,
        "citation_style": "APA"
    }
    try:
        resp = requests.post(
            f"{BASE_URL}/api/research", json=payload, timeout=120
        )
        print(f"Status code: {resp.status_code}")
        print("Response JSON:", resp.json())
    except Exception as e:
        print("Error calling /api/research:", e)
        sys.exit(1)


def test_read_graph():
    print("\n2) Testing GET /api/graph")
    try:
        resp = requests.get(
            f"{BASE_URL}/api/graph", timeout=10
        )
        print(f"Status code: {resp.status_code}")
        print("Response JSON:", resp.json())
    except Exception as e:
        print("Error calling /api/graph:", e)
        sys.exit(1)


def test_chat():
    print("\n3) Testing POST /api/chat (timeout 30s)")
    payload = {"question": "Can you summarize the literature findings?"}
    try:
        resp = requests.post(
            f"{BASE_URL}/api/chat", json=payload, timeout=30
        )
        print(f"Status code: {resp.status_code}")
        print("Response JSON:", resp.json())
    except Exception as e:
        print("Error calling /api/chat:", e)
        sys.exit(1)


if __name__ == "__main__":
    print("Starting API smoke tests...")
    test_research()
    test_read_graph()
    test_chat()
    print("\nAll tests completed.")