## 🤝 GitHub Project Partner Recommendation System

## 🚀 Elevator Pitch (Big Idea)
This project aims to build a **hybrid recommendation system** that suggests ideal project collaborators on GitHub. By analyzing users’ public metadata—like repositories, languages, and social connections—we help developers connect with others who share similar interests and technical backgrounds. The model combines collaborative filtering, content-based matching, and NLP (for users with bios).

---

## ⚙️ Installation Instructions

To get started with this project locally:

```bash
# Clone the repository
git clone https://github.com/EKTAMULKALWAR/cs5661-dsproject-Project-Partner-Recommendation-System.git
cd cs5661-dsproject-Project-Partner-Recommendation-System

# Create a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Launch Jupyter
jupyter notebook
```

 
## 📂 Repository Description

This repository includes:

data/: Raw and cleaned GitHub user datasets

notebooks/: Jupyter notebooks for EDA, preprocessing, and modeling

data_card.md: Data documentation aligned with Google’s Data Cards standard

README.md: Project overview and contribution guide

requirements.txt: Python dependencies





## 👥 Team Members & Roles

Ekta Mulkalwar – Lead Data Engineer & Content-Based Modeling SpecialistDesigned and implemented the GitHub data scraping pipeline using REST API and geocoding for enriched metadata. Led preprocessing, handling missing values, and encoding strategies. Developed the content-based filtering logic using similarity measures across repositories, languages, and user metadata. Contributed to the architecture of the hybrid recommendation engine.

Apoorva Durge – NLP & Feature Extraction EngineerHandled text processing and similarity measures for the Bio field using natural language techniques. Extracted semantic features from limited bios and explored ways to include them in the recommendation system.

Anand Gutte – Collaborative Filtering DeveloperFocused on implementing user-based and item-based collaborative filtering algorithms. Designed user similarity metrics and helped build a matching engine using interaction data (followers/following).

Mansi Aher – Data Cleaning & Imputation SpecialistAddressed missing values across multiple fields and ensured data quality through consistency checks. Led efforts on handling sparse profiles while maintaining representative records.

Anvaya Chandrika Gudibanda Sreesha – Data Visualization & Geo-Insights AnalystCreated meaningful charts for representativeness and feature distributions. Mapped geographic data using latitude and longitude to understand regional activity patterns.

Shalini Nistala – Evaluation Metrics & Validation LeadDefined success metrics for the recommendation system and conducted validation tests using precision, recall, and MAP. Assisted in assessing bias and fairness across user types.

Shah Drashti Kirtibai – Encoding & Feature Engineering ExpertApplied LabelEncoder and other encoding schemes for categorical data like languages and locations. Refined features for downstream machine learning models.

Neel Jaysukhbhai Khunt – Repository Manager & Documentation LeadOversaw repository structure, file organization, and GitHub collaboration. Maintained clean commit history and contributed to the writing of the README and data card documentation.

Movva Jeevan Sidhardha – Location Processing & Mapping SupportAssisted in translating user-input location strings into lat/lon coordinates using Geopy. Contributed to spatial data evaluation and enriched records with location data.

Sai Kiran Bandapally – Feature Aggregation & Repo Insights DeveloperParsed repositories to extract language usage and repo diversity per user. Developed methods to weigh the importance of programming skills in partner matching.


