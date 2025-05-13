# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import torch
from sentence_transformers import SentenceTransformer, util


app = Flask(__name__)

CORS(app)

# Load recommendation results
hybrid_df = pd.read_csv('data/final_hybrid_with_semantic.csv')
domain_df = pd.read_csv("data/clustered_users_with_domains.csv")[["Username", "Cluster", "Domain_Tag"]]
hybrid_df = hybrid_df.merge(domain_df, on="Username", how="left")

model = SentenceTransformer("all-MiniLM-L6-v2")
bio_embeddings = np.load("data/bio_embeddings.npy")
df_bio = pd.read_csv("data/with_bio_embeddings.csv")


@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    username = data.get('username')
    location = data.get('location')
    domain = data.get('domain')  # ← NEW

    # Exclude the requesting user
    results = hybrid_df[hybrid_df['Username'] != username].copy()

    # Drop duplicates by keeping highest scoring recommendation
    results = results.sort_values('hybrid_score', ascending=False).drop_duplicates('Username')

    # Filter by location if provided
    if location:
        results = results[results['Location'].str.contains(location, case=False, na=False)]

    # Filter by domain tag if provided
    if domain:
        results = results[results['Domain_Tag'] == domain]

    results = results.sort_values('hybrid_score', ascending=False).head(5)

    return jsonify(results[["Username", "Location", "Profile_URL", "Domain_Tag", "hybrid_score"]].to_dict(orient='records'))


@app.route('/semantic-bio-recommend', methods=['POST'])
def semantic_bio_recommend():
    try:
        data = request.get_json()
        input_bio = data.get("bio")

        # Embed query
        query_emb = model.encode([input_bio], convert_to_tensor=True)

        # Compare with saved embeddings
        scores = util.pytorch_cos_sim(query_emb.cpu(), torch.tensor(bio_embeddings).cpu())[0]

        # Get top results
        # Get top results
        top_results = scores.argsort(descending=True)[1:6]
        results = df_bio.iloc[top_results.cpu()].copy()
        results["similarity"] = scores[top_results].cpu().numpy().round(4)
 

        return jsonify(results[["Username", "Bio", "Location", "Profile_URL", "similarity"]].to_dict(orient="records"))

    except Exception as e:
        print("❌ SERVER ERROR:", str(e))  # print full error in console
        return jsonify({"error": "Server crashed", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
