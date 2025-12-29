from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)
from flask_cors import CORS
CORS(app)

text_classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

image_classifier = pipeline(
    "image-classification",
    model="google/vit-base-patch16-224"
)

LABELS = ["Tech", "Festive", "Nature", "Food", "Lifestyle", "Sports", "Travel", "Fashion", "Education", "Entertainment"]

@app.route("/classify", methods=["POST"])
def classify():
    data = request.get_json(force=True)

    caption = data.get("text", "").strip()
    image_url = data.get("image_url")

    predictions = []

    # TEXT
    if caption:
        text_result = text_classifier(caption, LABELS)
        if text_result and "labels" in text_result:
            predictions.append(text_result["labels"][0])

    # IMAGE
    if image_url:
        try:
            image_result = image_classifier(image_url)
            if image_result:
                predictions.append(image_result[0]["label"])
        except Exception as e:
            print("Image classification failed:", e)

    if not predictions:
        return jsonify({"category": "Uncategorized"})

    from collections import Counter
    final_category = Counter(predictions).most_common(1)[0][0]

    return jsonify({"category": final_category})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
